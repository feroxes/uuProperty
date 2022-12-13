const { TestHelper } = require("uu_appg01_server-test");
// we can require Client that can help us with signed requests
// because TestHelper does not support it
const { Server, Client } = require("uuapp-mock-server");
const IntegrationService = require("./service-definition");

// "global" variable to access service in tests
let service;

beforeAll(async () => {
  // start up everything before all the tests
  await Server.start();
  // turn off authentication to speed up tests
  await TestHelper.setup(null, { authEnabled: false });

  // Server must be started first
  service = IntegrationService.getService();
});

beforeEach(async () => {
  // prepare your application before each test
  await TestHelper.dropDatabase();
  await TestHelper.initApp();
  await TestHelper.initAppWorkspace();

  await TestHelper.login("AwidOwner");
  // initialize the application with service uri as input parameter
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
    // everything is set, application/integrate internally calls svc/withToken/simple
    // we expect our application to initialize keys to do so
    let result = await TestHelper.executePostCommand("application/integrate", {});

    // as we provided mock data to pass the test, we get OK result
    expect(result.status).toBe(200);
  });

  test("call our application with appToken", async () => {
    // some of our UseCases must be signed by another app
    let appTokenClient = Client.signWith(service);

    // following call will be signed by our Mock service
    let result = await appTokenClient.post("application/integrate", {});

    // and as the request is signed, it should pass just right
    expect(result.status).toBe(200);
  });
});
