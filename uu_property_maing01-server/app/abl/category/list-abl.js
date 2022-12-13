"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/category-error.js").List;
const Warnings = require("../../api/warnings/category-warnings.js").List;
const { Schemas, DefaultPageInfo } = require("../../helpers/constants.js");

class ListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.CATEGORY);
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    const validationResult = this.validator.validate("categoryListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.unsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    dtoIn.pageInfo ??= DefaultPageInfo;
    dtoIn.pageInfo.pageIndex ??= DefaultPageInfo.pageIndex;
    dtoIn.pageInfo.pageSize ??= DefaultPageInfo.pageSize;

    const categoryList = await this.dao.list(awid, dtoIn.pageInfo);

    return { ...categoryList, uuAppErrorMap };
  }
}

module.exports = new ListAbl();
