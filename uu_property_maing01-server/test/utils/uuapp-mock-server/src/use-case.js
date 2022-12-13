const FS = require("fs");
const AppKey = require("uu_appg01_workspace/src/app-key");
const RETURN_TYPE = require("./return-types.js");
const generateAwid = require("./generate-awid");

class UC {
  static fromUcData(ucData) {
    let clone = new UC(ucData.path);

    clone._validationSchema = ucData.validationSchema;
    clone._method = ucData.method;
    clone._errorStatus = ucData.status;
    clone._appToken = ucData.appToken;
    clone._returns = { ...ucData.returns };
    return clone;
  }

  constructor(path) {
    this._path = path;
    this._validationSchema = null;
    this._method = "POST";
    this._returns = null;
    this._appToken = null;
    this._errorStatus = 200;
    this._mock = jest.fn();
  }

  withValidationSchema(schema) {
    this._validationSchema = schema;
    return this;
  }

  asGet() {
    this._method = "GET";
    return this;
  }

  asPost() {
    this._method = "POST";
    return this;
  }

  returns(value) {
    this._returns = {
      type: RETURN_TYPE.OK,
      value,
    };
    return this;
  }

  returnsCallback(callback) {
    this._returns = {
      type: RETURN_TYPE.OK_CALLBACK,
      value: callback,
    };
    return this;
  }

  returnsBinary(data) {
    let buff = new Buffer(data);
    let base64data = buff.toString("base64");

    this._returns = {
      type: RETURN_TYPE.OK_BINARY,
      value: base64data,
    };
    return this;
  }

  returnsStream(path) {
    this._returns = {
      type: RETURN_TYPE.OK_STREAM,
      value: FS.createReadStream(path),
    };
    return this;
  }

  throws(code = "mockErrorCode", message = "Mock Error Message", params = {}, cause = undefined, statusCode = 400) {
    this._errorStatus = statusCode;
    this.returns({
      uuAppErrorMap: {
        [code]: {
          id: generateAwid(),
          timestamp: new Date().toISOString(),
          type: "error",
          message: message,
          paramsMap: params,
          cause,
        },
      },
    });
    this._returns.type = RETURN_TYPE.KO;
    return this;
  }

  checkAppToken(...appKeyParams) {
    if (appKeyParams.length) {
      this._appToken = AppKey.valueOf(...appKeyParams);
    } else {
      this._appToken = true;
    }
    return this;
  }

  getJestMock() {
    return this._mock;
  }

  getUcData() {
    return {
      path: this._path,
      validationSchema: this._validationSchema,
      method: this._method,
      returns: this._returns,
      status: this._errorStatus,
      appToken: this._appToken,
      getJestMock: () => this._mock,
    };
  }
}

function mockUc(path, returns, validationSchema) {
  let uc = new UC(path);
  if (returns) uc.returns(returns);
  if (validationSchema) uc.withValidationSchema(validationSchema);

  return uc;
}

module.exports = {
  mockUc,
  cloneUc: UC.fromUcData,
};
