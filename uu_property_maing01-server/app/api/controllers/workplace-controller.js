"use strict";
const CreateAbl = require("../../abl/workplace/create-abl.js");
const UpdateAbl = require("../../abl/workplace/update-abl.js");
const ListAbl = require("../../abl/workplace/list-abl.js");

class WorkplaceController {
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

module.exports = new WorkplaceController();
