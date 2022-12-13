"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/location-error.js").Update;
const Warnings = require("../../api/warnings/location-warnings.js").Update;
const { Schemas, ErrorCodes } = require("../../helpers/constants.js");

class UpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.LOCATION);
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    const validationResult = this.validator.validate("updateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.unsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    let location = await this.dao.get(awid, dtoIn.id);

    if (!location) {
      throw new Errors.LocationDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    const updateDtoIn = {
      ...location,
      ...dtoIn,
    };

    try {
      location = await this.dao.update(awid, dtoIn.id, updateDtoIn);
    } catch (e) {
      if (e.code === ErrorCodes.duplicateKey) {
        throw new Errors.LocationAlreadyExists({ uuAppErrorMap }, e);
      } else throw new Errors.LocationDaoUpdateFailed({ uuAppErrorMap }, e);
    }

    return { ...location, uuAppErrorMap };
  }
}

module.exports = new UpdateAbl();
