"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/category-error.js").Create;
const Warnings = require("../../api/warnings/category-warnings.js").Create;
const { Schemas, ErrorCodes } = require("../../helpers/constants.js");

class CreateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.CATEGORY);
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    const validationResult = this.validator.validate("categoryCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.unsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    let category;
    try {
      category = await this.dao.create({ ...dtoIn, awid });
    } catch (e) {
      if (e.code === ErrorCodes.duplicateKey) {
        throw new Errors.CategoryAlreadyExists({ uuAppErrorMap }, e);
      } else throw new Errors.CategoryDaoCreateFailed({ uuAppErrorMap }, e);
    }

    return { ...category, uuAppErrorMap };
  }
}

module.exports = new CreateAbl();
