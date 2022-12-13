const { UriBuilder } = require("uu_appg01_server").Uri;
const { AppClient } = require("uu_appg01_server");
const { getGateway } = require("./server");
const { addUc, getAwidUcs, getUc } = require("./request.js");
const { cloneUc } = require("./use-case");
const { addAppTokenUc, buildAppClientPassThrough } = require("./app-token.js");

const generateAwid = require("./generate-awid");

function buildAwid(awid, ucs) {
  for (let uc of ucs) {
    addUc(awid, uc);
  }
}

function buildClient(uri, transformOptions = (callTarget, callOpts) => callOpts) {
  return {
    get: (uc, dtoIn, options) => {
      let target = uri().setUseCase(uc).toUri();
      return AppClient.get(target, dtoIn, transformOptions(target, options));
    },
    post: (uc, dtoIn, options) => {
      let target = uri().setUseCase(uc).toUri();
      return AppClient.post(target, dtoIn, transformOptions(target, options));
    },
  };
}

function buildServiceOutput(name, awid) {
  let _uri = null;

  let uri = () => {
    if (_uri) return _uri;
    _uri = new UriBuilder().setGateway(getGateway()).setProduct(name).setAwid(awid);
  };

  uri();

  let returnObj = {
    ...buildClient(uri),
    getAwid: () => awid,
    getProduct: () => name,
    getUc: (uc) => getUc(awid, uc),
    addUc: (uc) => addUc(awid, uc),
    withAppToken: () => {
      addUc(awid, addAppTokenUc(awid, name));
      let appClientPassThrough = buildAppClientPassThrough(_uri.toUri(), name);

      returnObj.withAppToken = () => {}; // do nothing
      returnObj.hasAppToken = () => true;
      returnObj.signed = buildClient(uri, appClientPassThrough);
      returnObj.signWithAppToken = (target, options) => {
        return appClientPassThrough(target, options);
      };

      return returnObj;
    },
    hasAppToken: () => false,
    getGateway: () => _uri.toUri().toString(),
  };

  return returnObj;
}

function mockService(name, ...ucs) {
  // generate awid
  const awid = generateAwid();

  // save uc handlers
  buildAwid(awid, ucs);

  return buildServiceOutput(name, awid);
}

function copyService(service, ...ucs) {
  // generate awid
  const awid = generateAwid();

  // get current ucs
  let current = getAwidUcs(service.getAwid());

  // copy current ucs
  buildAwid(
    awid,
    Object.values(current).map((uc) => cloneUc(uc))
  );

  // override with new definitions
  buildAwid(awid, ucs);

  let svcOutput = buildServiceOutput(service.getProduct(), awid);
  if (service.hasAppToken()) svcOutput.withAppToken();
  return svcOutput;
}

module.exports = {
  mockService,
  copyService,
};
