"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/inventory-item-error.js").Delete;
const Warnings = require("../../api/warnings/inventory-item-warnings.js").Delete;
const { Schemas } = require("../../helpers/constants.js");

class DeleteAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.INVENTORY_ITEM);
  }
  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    const validationResult = this.validator.validate("inventoryItemDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.unsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    let inventoryItem = await this.dao.get(awid, dtoIn.id);

    if (!inventoryItem) {
      throw new Errors.InventoryItemDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    try {
      await this.dao.delete(awid, dtoIn.id);
    } catch (e) {
      throw new Errors.FailedToDeleteInventoryItem({ uuAppErrorMap }, e);
    }

    return { uuAppErrorMap };
  }
}

module.exports = new DeleteAbl();
