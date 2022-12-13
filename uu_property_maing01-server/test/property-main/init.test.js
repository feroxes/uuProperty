const { TestHelper } = require("uu_appg01_server-test");
const DefaultDtoIn = require("../default-dto-in.js");
const ValidateHelper = require("../utils/validate-helper");
const { Helper, Workspace, Server, PropertyTestHelper } = require("../utils/property-main-test-helper.js");

beforeAll(async () => {
  await Server.start();
  await Workspace.setup();
});

beforeEach(async () => {
  await Workspace.dropDatabase();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
});

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  await Workspace.teardown();
  await Server.stop();
});

function expectedHds(response) {
  ValidateHelper.validateBaseObjectData(response);
}

describe("Testing the init uuCmd...", () => {
  test("HDS", async () => {
    const response = await PropertyTestHelper.init();
    expectedHds(response);
  });
});
