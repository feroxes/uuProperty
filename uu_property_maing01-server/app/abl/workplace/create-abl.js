"use strict";
const { ObjectId } = require("mongodb");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/workplace-error.js").Create;
const Warnings = require("../../api/warnings/workplace-warnings.js").Create;
const { Schemas, ErrorCodes } = require("../../helpers/constants.js");

class CreateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.WORKPLACE);
    this.locationDao = DaoFactory.getDao(Schemas.LOCATION);
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    const validationResult = this.validator.validate("createDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.unsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    const location = await this.locationDao.get(awid, dtoIn.locationId);
    if (!location) {
      throw new Errors.LocationDoesNotExist({ uuAppErrorMap }, { locationId: dtoIn.locationId });
    }

    let workplace;
    dtoIn.locationId = ObjectId(dtoIn.locationId);
    try {
      workplace = await this.dao.create({ ...dtoIn, awid });
    } catch (e) {
      if (e.code === ErrorCodes.duplicateKey) {
        throw new Errors.WorkplaceAlreadyExists({ uuAppErrorMap }, e);
      } else throw new Errors.WorkplaceDaoCreateFailed({ uuAppErrorMap }, e);
    }

    delete location.sys;
    return { ...workplace, location, uuAppErrorMap };
  }
}

module.exports = new CreateAbl();
