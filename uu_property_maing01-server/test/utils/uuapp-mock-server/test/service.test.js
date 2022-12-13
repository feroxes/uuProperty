const { Server, Service, UseCase } = require("../index");
const { Uri } = require("uu_appg01_server").Uri;

beforeAll(async () => {
  await Server.start();
});

afterAll(async () => {
  await Server.stop();
});

describe("service definition", () => {
  test("define empty service", async () => {
    let service = Service.create("my-service-name");
    let serviceUri = Uri.parse(service.getGateway());
    expect(serviceUri.getProduct()).toBe("my-service-name");
  });

  test("define multiple services", async () => {
    let service = Service.create("my-service-name");
    let serviceUri = Uri.parse(service.getGateway());
    let service2 = Service.create("uu-another-service");
    let service2Uri = Uri.parse(service2.getGateway());

    expect(serviceUri.getProduct()).toBe("my-service-name");
    expect(service2Uri.getProduct()).toBe("uu-another-service");
  });

  test("copy service", async () => {
    let basicUc = UseCase.post("try/me", { hello: "world" });
    let anotherUc = UseCase.post("try/meMore", { ahoj: "svete" });
    let service = Service.create("my-service-name", basicUc, anotherUc);

    let result;
    result = await service.post("try/me");
    expect(result.data.hello).toBe("world");
    result = await service.post("try/meMore");
    expect(result.data.ahoj).toBe("svete");

    anotherUc = UseCase.post("try/meMore", { something: "else" });
    let copy = Service.copy(service, anotherUc);

    result = await copy.post("try/me");
    expect(result.data.hello).toBe("world");
    result = await copy.post("try/meMore");
    expect(result.data.something).toBe("else");
  });
});
