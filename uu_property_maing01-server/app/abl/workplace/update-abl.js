"use strict";
const { ObjectId } = require("mongodb");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/workplace-error.js").Update;
const Warnings = require("../../api/warnings/workplace-warnings.js").Update;
const { Schemas, ErrorCodes } = require("../../helpers/constants.js");

class UpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.WORKPLACE);
    this.locationDao = DaoFactory.getDao(Schemas.LOCATION);
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    const validationResult = this.validator.validate("workplaceUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.unsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    let workplace = await this.dao.get(awid, dtoIn.id);

    if (!workplace) {
      throw new Errors.WorkplaceDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    const locationId = dtoIn.locationId || workplace.locationId;
    let location = await this.locationDao.get(awid, locationId);

    if (!location) {
      throw new Errors.LocationDoesNotExist({ uuAppErrorMap }, { id: locationId });
    }

    const updateDtoIn = {
      ...workplace,
      ...dtoIn,
    };
    updateDtoIn.locationId = ObjectId(updateDtoIn.locationId);
    try {
      workplace = await this.dao.update(awid, dtoIn.id, updateDtoIn);
    } catch (e) {
      if (e.code === ErrorCodes.duplicateKey) {
        throw new Errors.WorkplaceAlreadyExists({ uuAppErrorMap }, e);
      } else throw new Errors.WorkplaceDaoUpdateFailed({ uuAppErrorMap }, e);
    }

    delete location.sys;
    return { ...workplace, location, uuAppErrorMap };
  }
}

module.exports = new UpdateAbl();
