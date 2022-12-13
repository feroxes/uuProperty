const { Uri, UriBuilder } = require("uu_appg01_server").Uri;
const { getTokenFromRequest, isTokenValid } = require("./app-token");
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { processMultipart } = require("./simple-multipart.js");
const {
  DtoInError,
  AppTokenIsNotValid,
  AppTokenIsRequired,
  missingMappings,
  incorrectHttpMethod,
  prefixCode,
  formatOutput,
} = require("./errors");
const RETURN_TYPE = require("./return-types.js");

let awidResponseStorage = {};

function addUc(awid, handler) {
  awidResponseStorage[awid] = awidResponseStorage[awid] || {};
  let ucData;
  if (handler.getUcData) {
    ucData = handler.getUcData();
  } else {
    throw new Error("Usupported UC type");
  }
  // add uc
  awidResponseStorage[awid][ucData.path] = ucData;
}

function resetAwid(awid) {
  awidResponseStorage[awid] = {};
}

function reset() {
  awidResponseStorage = {};
}

function getAwidUcs(awid) {
  return awidResponseStorage[awid];
}

function getUc(awid, uc) {
  return (awidResponseStorage[awid] || {})[uc];
}

function guessErrorPrefix(uri) {
  return `${uri.getProduct()}/${uri.getUseCase()}/`;
}

async function requestHandler(request, response) {
  let uri = Uri.parse(request.getUrl());
  let requestData = (awidResponseStorage[uri.getAwid()] || {})[uri.getUseCase()];
  if (!requestData) {
    // no UC handle found, cancel the show
    return missingMappings(uri, response);
  }

  const ERROR_PREFIX = guessErrorPrefix(uri);

  let dtoIn;
  if (requestData.method !== request.getMethod()) {
    return incorrectHttpMethod(uri, requestData.method, response);
  }
  if (request.getMethod() === "POST") {
    dtoIn = request.getBody();
    // check for multipart
    dtoIn = processMultipart(request.getHeaders(), dtoIn);
  } else {
    dtoIn = uri.getParameters();
  }

  let uuAppErrorMap = {};

  // find correct uc
  if (requestData.validationSchema) {
    // perform data validation
    let dtoInValidator = new Validator(`const dtoInType = ${requestData.validationSchema}`, true);
    let validationResult = dtoInValidator.validate("dtoInType", dtoIn);
    try {
      uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        uuAppErrorMap,
        `${ERROR_PREFIX}unsupportedKeys`,
        DtoInError
      );
    } catch (e) {
      prefixCode(ERROR_PREFIX, e);
      return formatOutput(e, response);
    }
  }

  // validate appToken
  if (requestData.appToken) {
    let tokenAppKey = requestData.appToken;
    if (typeof tokenAppKey === "boolean") tokenAppKey = null;
    let valid = false;
    try {
      let appToken = getTokenFromRequest(request);
      if (!appToken) {
        let e = new AppTokenIsRequired({ uuAppErrorMap });
        return formatOutput(e, response);
      }

      let clientUri = UriBuilder.parse(appToken.getIssuer()).toUri();

      valid = await isTokenValid(uri, appToken, clientUri, tokenAppKey);
    } catch (e) {
      return formatOutput(e, response);
    }

    if (!valid) {
      let e = new AppTokenIsNotValid({ uuAppErrorMap });
      return formatOutput(e, response);
    }
  }

  // hit jest mock function to check if the uc was called
  requestData.getJestMock()(uri, dtoIn, uuAppErrorMap);

  switch (requestData.returns.type) {
    case RETURN_TYPE.OK:
      response.setBody({ ...requestData.returns.value, uuAppErrorMap });
      break;
    case RETURN_TYPE.OK_CALLBACK:
      response.setBody(requestData.returns.value(uri, dtoIn, uuAppErrorMap));
      break;
    case RETURN_TYPE.OK_BINARY:
      response.setBody(requestData.returns.value);
      break;
    case RETURN_TYPE.OK_STREAM:
      response._body = requestData.returns.value;
      break;
    case RETURN_TYPE.KO:
      // eslint-disable-next-line no-case-declarations
      let mergerErrors = { ...uuAppErrorMap, ...requestData.returns.value.uuAppErrorMap };
      response.setBody({ ...requestData.returns.value, uuAppErrorMap: mergerErrors });
      break;
  }

  response.setStatus(requestData.status);
}

module.exports = {
  addUc,
  getUc,
  getAwidUcs,
  reset,
  resetAwid,
  requestHandler,
};
