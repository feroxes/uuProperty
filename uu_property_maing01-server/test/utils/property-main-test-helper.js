const { TestHelper } = require("uu_appg01_server-test");
const { Server } = require("./uuapp-mock-server");
const DefaultDtoIn = require("../default-dto-in.js");

const DB_LIST = {
  collections: {
    propertyMain: "propertyMain",
  },
};

const PropertyTestHelper = {
  async init(dtoIn = {}) {
    let _dtoIn = { ...DefaultDtoIn.uuProperty.Init, ...dtoIn };
    return TestHelper.initUuAppWorkspace(_dtoIn);
  },
};

const PropertyMainTestHelper = {
  async initUuSubApp(dtoIn = {}) {
    const initAppWorkspaceDtoIn = {
      ...DefaultDtoIn.uuProperty.Init,
      ...dtoIn,
    };

    try {
      await TestHelper.initUuSubAppInstance(dtoIn);
      await TestHelper.createUuAppWorkspace();
      await TestHelper.initUuAppWorkspace(initAppWorkspaceDtoIn);
    } catch (e) {
      console.log(e);
    }
  },
};

PropertyMainTestHelper.dbCollection = DB_LIST.collections;
PropertyMainTestHelper.States = {
  ACTIVE: "active",
  INITIAL: "initial",
  PASSIVE: "passive",
};

module.exports = {
  PropertyTestHelper,
  Helper: PropertyMainTestHelper,
  Workspace: TestHelper,
  Server,
};
