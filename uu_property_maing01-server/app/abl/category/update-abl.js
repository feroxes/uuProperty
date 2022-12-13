"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/category-error.js").Update;
const Warnings = require("../../api/warnings/category-warnings.js").Update;
const { Schemas, ErrorCodes } = require("../../helpers/constants.js");

class UpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.CATEGORY);
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    const validationResult = this.validator.validate("categoryUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.unsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    let category = await this.dao.get(awid, dtoIn.id);

    if (!category) {
      throw new Errors.CategoryDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    const updateDtoIn = {
      ...category,
      ...dtoIn,
    };

    try {
      category = await this.dao.update(awid, dtoIn.id, updateDtoIn);
    } catch (e) {
      if (e.code === ErrorCodes.duplicateKey) {
        throw new Errors.CategoryAlreadyExists({ uuAppErrorMap }, e);
      } else throw new Errors.CategoryDaoUpdateFailed({ uuAppErrorMap }, e);
    }

    return { ...category, uuAppErrorMap };
  }
}

module.exports = new UpdateAbl();
