"use strict";
const { ObjectId } = require("mongodb");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/inventory-item-error.js").Update;
const Warnings = require("../../api/warnings/inventory-item-warnings.js").Update;
const { Schemas, ErrorCodes, States } = require("../../helpers/constants.js");

class UpdateAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.INVENTORY_ITEM);
    this.workplaceDao = DaoFactory.getDao(Schemas.WORKPLACE);
    this.locationDao = DaoFactory.getDao(Schemas.LOCATION);
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    const validationResult = this.validator.validate("inventoryItemUpdateDtoInType", dtoIn);
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

    if (States.FINAL_STATES.includes(inventoryItem.state)) {
      throw new Errors.InventoryItemIsOnFinalState({ uuAppErrorMap }, { state: inventoryItem.state });
    }

    const workplace = await this.workplaceDao.get(awid, inventoryItem.workplaceId);

    let workplaceForUpdate;
    if (dtoIn.workplaceId) {
      workplaceForUpdate = await this.workplaceDao.get(awid, inventoryItem.workplaceId);

      if (!workplaceForUpdate) {
        throw new Errors.WorkplaceDoesNotExist({ uuAppErrorMap }, { id: dtoIn.workplaceId });
      }
    }

    const location = await this.locationDao.get(awid, inventoryItem.locationId);

    let locationForUpdate;
    if (dtoIn.locationId) {
      locationForUpdate = await this.locationDao.get(awid, dtoIn.locationId);

      if (!locationForUpdate) {
        throw new Errors.LocationDoesNotExist({ uuAppErrorMap }, { id: dtoIn.locationId });
      }
    }

    const locationIdForCheck = locationForUpdate?.id || location.id;
    const workplaceForCheck = workplaceForUpdate || workplace;

    if (workplaceForCheck.locationId.toString() !== locationIdForCheck.toString()) {
      throw new Errors.LocationDoesNotBelongToWorkplace({ uuAppErrorMap });
    }

    const updateDtoIn = {
      ...inventoryItem,
      ...dtoIn,
    };
    updateDtoIn.locationId = ObjectId(updateDtoIn.locationId);
    updateDtoIn.workplaceId = ObjectId(updateDtoIn.workplaceId);

    if (dtoIn.state && dtoIn.state !== inventoryItem.state) {
      updateDtoIn.lifecycle.unshift({
        eventDate: new Date(),
        eventDescription: `<uu5string/>State has been changed from <b>${inventoryItem.state}</b> to <b>${dtoIn.state}</b>.`,
      });
    }
    if (dtoIn.workplaceId && dtoIn.workplaceId.toString() !== inventoryItem.workplaceId.toString()) {
      updateDtoIn.lifecycle.unshift({
        eventDate: new Date(),
        eventDescription: `<uu5string/>Workplace has been changed from <b>${workplace.name}</b> to <b>${workplaceForUpdate.name}</b>.`,
      });
    }
    if (dtoIn.locationId && dtoIn.locationId.toString() !== inventoryItem.locationId.toString()) {
      updateDtoIn.lifecycle.unshift({
        eventDate: new Date(),
        eventDescription: `<uu5string/>Location has been changed from <b>${location.name}</b> to <b>${locationForUpdate.name}</b>.`,
      });
    }
    if (dtoIn.userUuIdentity) {
      if (!inventoryItem.userUuIdentity) {
        updateDtoIn.lifecycle.unshift({
          eventDate: new Date(),
          eventDescription: `<uu5string/>New user has been set {{${dtoIn.userUuIdentity}}}.`,
        });
      } else if (inventoryItem.userUuIdentity !== dtoIn.userUuIdentity) {
        updateDtoIn.lifecycle.unshift({
          eventDate: new Date(),
          eventDescription: `<uu5string/>User has been changed from {{${inventoryItem.userUuIdentity}}} to {{${dtoIn.userUuIdentity}}}.`,
        });
      }
    }

    try {
      inventoryItem = await this.dao.update(awid, dtoIn.id, updateDtoIn);
    } catch (e) {
      if (e.code === ErrorCodes.duplicateKey) {
        throw new Errors.InventoryItemAlreadyExists({ uuAppErrorMap }, e);
      } else throw new Errors.InventoryItemDaoUpdateFailed({ uuAppErrorMap }, e);
    }

    const dtoOut = {
      ...inventoryItem,
      workplace: workplaceForUpdate || workplace,
      location: locationForUpdate || location,
      uuAppErrorMap,
    };
    delete dtoOut.location.sys;
    delete dtoOut.workplace.sys;
    return dtoOut;
  }
}

module.exports = new UpdateAbl();
