"use strict";
const InitAbl = require("../../abl/propretry/init-abl.js");
const WorkspaceLoadAbl = require("../../abl/propretry/workspace-load-abl.js");

class PropertyMainController {
  init(ucEnv) {
    return InitAbl.init(ucEnv.getUri(), ucEnv.getDtoIn());
  }
  workspaceLoad(ucEnv) {
    return WorkspaceLoadAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new PropertyMainController();
