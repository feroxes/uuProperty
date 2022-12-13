const { UseCaseError, ErrorConverter } = require("uu_appg01_server").AppServer;

class DtoInError extends UseCaseError {
  constructor(dtoOut, paramMap) {
    super({ dtoOut, paramMap, status: 400 });
    this.code = `invalidDtoIn`;
    this.message = "DtoIn is not valid.";
  }
}

class AppTokenIsNotValid extends UseCaseError {
  constructor(dtoOut, paramMap) {
    super({ dtoOut, paramMap, status: 401 });
    this.code = `appTokenIsNotValid`;
    this.message = "uuAppToken is not valid.";
  }
}

class AppTokenIsRequired extends UseCaseError {
  constructor(dtoOut, paramMap) {
    super({ dtoOut, paramMap, status: 400 });
    this.code = `appTokenIsRequired`;
    this.message = "uuAppToken is required but is missing.";
  }
}

function setError(response) {
  response.setStatus(500);
  response.setHeaders(null);
}

function missingMappings(uri, response) {
  setError(response);
  response.setStatus(404);
  response.setBody(`No mock for ${uri.getUseCase()} found for ${uri.getProduct()}!`);
  return response;
}

function incorrectHttpMethod(uri, method, response) {
  response.setStatus(405);
  response.setBody(`Incorrect HTTP method for ${uri.getUseCase()}, it is mapped as ${method}!`);
  response.setHeaders(null);
}

function prefixCode(prefix, error) {
  error.code = `${prefix}${error.code}`;
}

function formatOutput(error, response) {
  let errorResponse = ErrorConverter.buildErrorDtoOut(error);

  // invalid dtoIn, construct error response
  response.setStatus(errorResponse.status);
  response.setBody(errorResponse.dtoOut);
  response.setHeaders(errorResponse.headers);
}

module.exports = {
  DtoInError,
  AppTokenIsNotValid,
  AppTokenIsRequired,
  missingMappings,
  incorrectHttpMethod,
  prefixCode,
  formatOutput,
};
