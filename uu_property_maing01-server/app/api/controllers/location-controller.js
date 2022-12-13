"use strict";
const CreateAbl = require("../../abl/location/create-abl.js");

class LocationController {
  create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
}

module.exports = new LocationController();
