"use strict";
const { ObjectId } = require("mongodb");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/inventory-item-error.js").Create;
const Warnings = require("../../api/warnings/inventory-item-warnings.js").Create;
const { Schemas, ErrorCodes, States } = require("../../helpers/constants.js");

class CreateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.INVENTORY_ITEM);
    this.workplaceDao = DaoFactory.getDao(Schemas.WORKPLACE);
    this.locationDao = DaoFactory.getDao(Schemas.LOCATION);
    this.categoryDao = DaoFactory.getDao(Schemas.CATEGORY);
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    const validationResult = this.validator.validate("inventoryItemCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.unsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    dtoIn.state ??= States.ON_STORAGE;

    const location = await this.locationDao.get(awid, dtoIn.locationId);
    if (!location) {
      throw new Errors.LocationDoesNotExist({ uuAppErrorMap }, { locationId: dtoIn.locationId });
    }
    dtoIn.locationId = ObjectId(dtoIn.locationId);

    const workplace = await this.workplaceDao.get(awid, dtoIn.workplaceId);
    if (!workplace) {
      throw new Errors.WorkplaceDaoDoesNotExist({ uuAppErrorMap }, { workplaceId: dtoIn.workplaceId });
    }
    dtoIn.workplaceId = ObjectId(dtoIn.workplaceId);

    if (workplace.locationId.toString() !== location.id.toString()) {
      throw new Errors.LocationDoesNotBelongToWorkplace({ uuAppErrorMap });
    }

    const category = await this.categoryDao.get(awid, dtoIn.categoryId);
    if (!category) {
      throw new Errors.CategoryDaoDoesNotExist({ uuAppErrorMap }, { categoryId: dtoIn.categoryId });
    }

    dtoIn.categoryId = ObjectId(dtoIn.categoryId);

    dtoIn.lifecycle = [
      {
        eventDate: new Date(),
        eventDescription: `<uu5string/>${dtoIn.name} has been <b>CREATED</b>.`,
      },
    ];

    let inventoryItem;
    try {
      inventoryItem = await this.dao.create({ ...dtoIn, awid });
    } catch (e) {
      if (e.code === ErrorCodes.duplicateKey) {
        throw new Errors.InventoryItemAlreadyExists({ uuAppErrorMap }, e);
      } else throw new Errors.InventoryItemDaoCreateFailed({ uuAppErrorMap }, e);
    }

    delete location.sys;
    delete workplace.sys;
    delete category.sys;
    return { ...inventoryItem, location, workplace, category, uuAppErrorMap };
  }
}

module.exports = new CreateAbl();
