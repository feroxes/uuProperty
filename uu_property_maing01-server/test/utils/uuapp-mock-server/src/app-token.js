const { UriBuilder } = require("uu_appg01_server").Uri;
const { AppClient } = require("uu_appg01_server");
const NodeRsa = require("node-rsa");
const { randomBytes } = require("crypto");
const PemJwk = require("pem-jwk");
const JsonWebToken = require("jsonwebtoken");
const util = require("util");
const promisifiedVerify = util.promisify(JsonWebToken.verify);
const AppKey = require("uu_appg01_workspace/src/app-key");
const AppClientToken = require("uu_appg01_workspace/src/app-client-token");
const Errors = require("uu_appg01_workspace/src/api/errors/sys-app-client-token-errors").AppClientService;
const FS = require("fs");
const PATH = require("path");
const { mockUc } = require("./use-case");
const { getRoot, normalizeDirName, ensureDir } = require("./file-system");

let keyCache = {};

const CACHE_ROOT = PATH.resolve(getRoot(), "target", "mock-server-key-cache");
const LEEWAY = 60;
const PUBLIC_KEY_UC = "sys/appClientToken/listKeys";

function ensureCacheRoot() {
  ensureDir(PATH.resolve(getRoot(), "target"));
  ensureDir(CACHE_ROOT);
}

// DUMMY implementation of private-public key token signing and validation

function generateKeyPair(awid, name) {
  ensureCacheRoot();
  // this takes seconds, for tests it may be "cached"
  let dirName = normalizeDirName(name);
  let dirPath = PATH.join(CACHE_ROOT, dirName);
  ensureDir(dirPath);

  let privKeyPath = PATH.resolve(dirPath, "priv");
  let pubKeyPath = PATH.resolve(dirPath, "pub");

  // try to get files
  let privateKey, publicKey;

  try {
    privateKey = FS.readFileSync(privKeyPath, "utf-8");
    publicKey = FS.readFileSync(pubKeyPath, "utf-8");

    return { privateKey, publicKey };
  } catch (e) {
    // failed to load ... just generate it
  }

  let nodeRsa = new NodeRsa({ b: 2048 });
  nodeRsa.generateKeyPair();

  let result = {
    privateKey: nodeRsa.exportKey("private"),
    publicKey: nodeRsa.exportKey("public"),
  };
  // save to cache
  try {
    FS.writeFileSync(privKeyPath, result.privateKey, "utf-8");
    FS.writeFileSync(pubKeyPath, result.publicKey, "utf-8");
  } catch (e) {
    // cache failed
    console.error(e);
  }

  return result;
}

function hasKeys(awid) {
  return !!((keyCache[awid] || {}).public && (keyCache[awid] || {}).private);
}

function generateKeys(awid, name) {
  if (hasKeys(awid)) return keyCache[awid];
  let { privateKey, publicKey } = generateKeyPair(awid, name);
  let kid = randomBytes(Math.ceil(32 / 2))
    .toString("hex")
    .slice(0, 32);

  keyCache[awid] = {
    public: `${kid}:${publicKey}`,
    private: `${kid}:${privateKey}`,
  };

  let jwk = PemJwk.pem2jwk(publicKey);
  jwk.use = "sig";
  jwk.kid = kid;
  jwk.uuAppErrorMap = {};
  return jwk;
}

function addListKeysUc(awid, name) {
  generateKeys(awid, name); // ensure keys
  let publicKey = keyCache[awid].public;
  let [kid, pem] = publicKey.split(/:/);
  let jwk = PemJwk.pem2jwk(pem);
  jwk.use = "sig";
  jwk.kid = kid;

  return mockUc(PUBLIC_KEY_UC, { keys: [jwk], uuAppErrorMap: {} }).asGet();
}

function prepareSignature(baseUri, name) {
  let awid = baseUri.getAwid();
  generateKeys(awid, name);
  let uuAppKey = AppKey.valueOf(baseUri.getVendor(), baseUri.getApp(), baseUri.getSubApp(), awid, awid);

  let [kid, privateKey] = keyCache[awid].private.split(/:/);
  let subject = uuAppKey.toString();
  let issuer = baseUri.toString();

  let opts = {
    algorithm: "RS256",
    expiresIn: 60 * 60 * 24,
    keyid: kid,
    issuer,
    subject,
  };

  return function (callUri, options = {}) {
    opts.audience = UriBuilder.parse(callUri).setParameters({}).toUri().toString();
    opts.jwtid = randomBytes(Math.ceil(32 / 2))
      .toString("hex")
      .slice(0, 32);

    let appClientToken = JsonWebToken.sign({}, privateKey, opts);

    let headers = options.headers;
    if (!headers) {
      headers = {};
      options.headers = headers;
    }
    headers["X-uuApp-Client-Token"] = appClientToken;

    return options;
  };
}

function getTokenFromRequest(request) {
  let token = request.getHeaders()["x-uuapp-client-token"];
  if (!token) {
    return null;
  }
  let parsed = new AppClientToken(token);
  if (!parsed._getJwt()) throw new Errors.InvalidFormat();
  return parsed;
}

function validateAppKey(appClientToken, expectedAppKey) {
  expectedAppKey = AppKey.parse(expectedAppKey);
  try {
    let tokenAppKey = AppKey.parse(appClientToken.getSubject());
    return expectedAppKey.compareNonNullParts(tokenAppKey);
  } catch (e) {
    console.error("Unable to parse appKey from the subject claim: " + appClientToken.getSubject(), e);
    return false;
  }
}

async function isTokenValid(uri, appClientToken, clientAppBaseUri, appKey) {
  if (!appClientToken) {
    return false;
  }

  if (appKey) {
    let valid = validateAppKey(appClientToken, appKey);
    if (!valid) {
      console.warn("AppToken's appKey is different from the expected appKey.");
      return false;
    }
  }

  clientAppBaseUri = clientAppBaseUri.getBaseUri(); // just to be sure
  let publicKeyUri = UriBuilder.parse(clientAppBaseUri).setUseCase(PUBLIC_KEY_UC).toUri();
  console.log(`Validating uuAppClientToken, uri: ${uri}, clientAppBaseUri: ${clientAppBaseUri}`);

  // endpoint check
  let keys, publicKey;
  try {
    keys = await AppClient.get(publicKeyUri);
  } catch (e) {
    let message = `The public keys for token validation are not available for provided issuer: ${publicKeyUri}`;
    throw new Errors.UnexpectedError(message, e);
  }

  // update key store and chache
  for (const key of keys.data.keys) {
    let pem = PemJwk.jwk2pem(key);
    if (key.kid === appClientToken._getJwt().header.kid) publicKey = pem;
  }

  // there is no public key with token's kid
  if (!publicKey) {
    console.warn("There is no public key with appToken's kid");
    return false;
  }

  //
  try {
    await promisifiedVerify(appClientToken._getTokenOrigin(), publicKey, { clockTolerance: LEEWAY });
    return true;
  } catch (e) {
    console.error("Verifying by public key failed", e);
    return false;
  }
}

module.exports = {
  addAppTokenUc: addListKeysUc,
  buildAppClientPassThrough: prepareSignature,
  getTokenFromRequest,
  isTokenValid,
};
