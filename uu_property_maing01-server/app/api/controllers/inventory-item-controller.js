"use strict";
const CreateAbl = require("../../abl/inventory-item/create-abl.js");
const UpdateAbl = require("../../abl/inventory-item/update-abl.js");
const ListAbl = require("../../abl/inventory-item/list-abl.js");
const DeleteAbl = require("../../abl/inventory-item/delete-abl.js");
class InventoryItemController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  update(ucEnv) {
    return UpdateAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  list(ucEnv) {
    return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  delete(ucEnv) {
    return DeleteAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new InventoryItemController();
