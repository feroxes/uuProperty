"use strict";
const { UuAppWorkspace, UuSubAppInstance, WorkspaceAuthorizationService } = require("uu_appg01_server").Workspace;
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { UriBuilder } = require("uu_appg01_server").Uri;
const { Schemas, Profiles } = require("../../helpers/constants.js");

class WorkspaceLoadAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.PROPERTY_MAIN);
  }

  async load(uri, session, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    const dtoOut = {};

    // HDS 1
    const asidData = await UuSubAppInstance.get();

    // HDS 2
    const awidData = await UuAppWorkspace.get(awid);

    // HDS 3
    const cmdUri = UriBuilder.parse(uri).setUseCase("uuProperty/load").clearParameters();
    const authorizationResult = await WorkspaceAuthorizationService.authorize(session, cmdUri.toUri());
    const profileData = {
      uuIdentityProfileList: authorizationResult.getIdentityProfiles(),
      profileList: authorizationResult.getAuthorizedProfiles(),
    };

    // HDS 5
    dtoOut.sysData = { asidData, awidData, profileData };

    // HDS 6, 6.A
    if (awidData.sysState !== "created") {
      // HDS 6.A.1
      const uuProperty = await this.dao.getByAwid(awid);

      // HDS 6.A.2
      dtoOut.data = { ...uuProperty };
      dtoOut.data.isAuthorizedForAdmin =
        profileData.profileList.includes(Profiles.AUTHORITIES) ||
        profileData.uuIdentityProfileList.includes(Profiles.AUTHORITIES);
      // HDS 6.A.2
    }

    // hds 7
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }
}

module.exports = new WorkspaceLoadAbl();
