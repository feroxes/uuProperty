"use strict";
const InitAbl = require("../../abl/propretry/init-abl.js");

class PropertyMainController {
  init(ucEnv) {
    return InitAbl.init(ucEnv.getUri(), ucEnv.getDtoIn());
  }
}

module.exports = new PropertyMainController();
