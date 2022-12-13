"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/location-error.js").Create;
const Warnings = require("../../api/warnings/location-warnings.js").Create;
const { Schemas, ErrorCodes } = require("../../helpers/constants.js");

class CreateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.LOCATION);
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    const validationResult = this.validator.validate("createDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.unsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    let location;
    try {
      location = await this.dao.create({ ...dtoIn, awid });
    } catch (e) {
      if (e.code === ErrorCodes.duplicateKey) {
        throw new Errors.LocationAlreadyExists({ uuAppErrorMap }, e);
      } else throw new Errors.LocationDaoCreateFailed({ uuAppErrorMap }, e);
    }

    return { ...location, uuAppErrorMap };
  }
}

module.exports = new CreateAbl();
