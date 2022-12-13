"use strict";
const PropertyMainAbl = require("../../abl/property-main-abl.js");

class PropertyMainController {
  init(ucEnv) {
    return PropertyMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new PropertyMainController();
