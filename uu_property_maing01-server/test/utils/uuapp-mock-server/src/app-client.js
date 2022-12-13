const { TestHelper } = require("uu_appg01_server-test");
const { UriBuilder } = require("uu_appg01_server").Uri;
const { AppClient } = require("uu_appg01_server");

function getUri(uc) {
  return new UriBuilder()
    .setGateway(TestHelper.getGatewayUrl())
    .setProduct("vendor-app-subApp")
    .setAwid(TestHelper.getAwid())
    .setUseCase(uc)
    .toUri();
}

function getSession() {
  return TestHelper._activeSession;
}

function ensureSession(options) {
  if (options && options.session) return options;
  options = options || {};
  options.session = getSession();
  return options;
}

const Client = {
  get: (uc, dtoIn, options) => {
    let targetUrl = getUri(uc);
    return AppClient.get(targetUrl, dtoIn, ensureSession(options));
  },
  post: (uc, dtoIn, options) => {
    let targetUrl = getUri(uc);
    return AppClient.post(targetUrl, dtoIn, ensureSession(options));
  },
  signWith: (service) => {
    return {
      get: (uc, dtoIn, options) => {
        let targetUrl = getUri(uc);
        options = service.signWithAppToken(targetUrl, ensureSession(options));
        return AppClient.get(targetUrl, dtoIn, options);
      },
      post: (uc, dtoIn, options) => {
        let targetUrl = getUri(uc);
        options = service.signWithAppToken(targetUrl, ensureSession(options));
        return AppClient.post(targetUrl, dtoIn, options);
      },
    };
  },
};

module.exports = Client;
