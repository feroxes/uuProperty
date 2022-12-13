"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/workplace-error.js").List;
const Warnings = require("../../api/warnings/workplace-warnings.js").List;
const { Schemas, DefaultPageInfo } = require("../../helpers/constants.js");

class ListAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.WORKPLACE);
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    const validationResult = this.validator.validate("listDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.unsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    dtoIn.pageInfo ??= DefaultPageInfo;
    dtoIn.pageInfo.pageIndex ??= DefaultPageInfo.pageIndex;
    dtoIn.pageInfo.pageSize ??= DefaultPageInfo.pageSize;
    if (!dtoIn.filterMap) {
      dtoIn.filterMap = { awid };
    } else {
      dtoIn.filterMap = { ...dtoIn.filterMap, awid };
    }

    const locationList = await this.dao.listByCriteria(dtoIn.filterMap, dtoIn.pageInfo);

    return { ...locationList, uuAppErrorMap };
  }
}

module.exports = new ListAbl();
