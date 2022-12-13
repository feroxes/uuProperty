"use strict";
const CreateAbl = require("../../abl/location/create-abl.js");
const UpdateAbl = require("../../abl/location/update-abl.js");
const ListAbl = require("../../abl/location/list-abl.js");

class LocationController {
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

module.exports = new LocationController();
