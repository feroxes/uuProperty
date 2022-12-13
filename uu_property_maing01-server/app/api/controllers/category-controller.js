"use strict";
const CreateAbl = require("../../abl/category/create-abl.js");
const UpdateAbl = require("../../abl/category/update-abl.js");
const ListAbl = require("../../abl/category/list-abl.js");

class CategoryController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  update(ucEnv) {
    return UpdateAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  list(ucEnv) {
    return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new CategoryController();
