const { TestHelper } = require("uu_appg01_server-test");
const { Server, Service } = require("uuapp-mock-server");
const IntegrationService = require("./service-definition");

let service;

beforeAll(async () => {
  // start up everything before all the tests
  await Server.start();
  // turn off authentication to speed up tests
  await TestHelper.setup(null, { authEnabled: false });
});

beforeEach(async () => {
  // prepare your application before each test
  await TestHelper.dropDatabase();
  await TestHelper.initApp();
  await TestHelper.initAppWorkspace();

  await TestHelper.login("AwidOwner");
  // initialize the application with service uri as input parameter
  service = IntegrationService.getService();

  await TestHelper.executePostCommand("application/init", {
    serviceUri: service.getGateway(),
  });
});

afterEach(() => {
  // restore jest mocks for UseCases
  jest.restoreAllMocks();
});

afterAll(async () => {
  // tear it down ...
  await TestHelper.teardown();
  await Server.stop();
});

describe("basic app integration", () => {
  test("happy day scenario", async () => {
    // everything is set, application/integrate internally calls svc/integration/init and svc/integration/update
    let result = await TestHelper.executePostCommand("application/integrate", {});

    // as we provided mock data to pass the test, we get OK result
    expect(result.status).toBe(200);
  });

  test("test failing call", async () => {
    // prepare failing UC ... it is enough to throw an exception
    let failingInit = IntegrationService.ucPrepare.init().throws();
    // create new service (new awid) with failing UC. All other UCs are kept (= working)
    let failingSvc = Service.copy(service, failingInit);
    // update app configuration to setup new serviceUri
    await TestHelper.executePostCommand("applicationConfig/update", {
      serviceUri: failingSvc.getGateway(),
    });

    let result;
    // application UC will fail due to failing svc/integration/update
    try {
      result = await TestHelper.executePostCommand("application/integrate", {});
    } catch (e) {
      result = e.response;
    }

    // so we expect this call to end with status of 400
    expect(result.status).toBe(400);
  });
});
