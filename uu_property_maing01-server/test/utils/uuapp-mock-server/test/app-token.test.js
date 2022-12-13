const { Server, Service, UseCase } = require("../index");

beforeAll(async () => {
  await Server.start();
});

afterAll(async () => {
  await Server.stop();
});

describe("appToken handling", () => {
  test("create service with appToken", async () => {
    let postTryMe = UseCase.post("try/me", { hello: "world" });
    let service = Service.create("my-service-name", postTryMe).withAppToken();

    let result;
    result = await service.signed.post("try/me");
    expect(result.data.hello).toBe("world");
  });

  test("create multiple services with appToken", async () => {
    let postTryMe = UseCase.post("try/me", { hello: "world" });
    let service = Service.create("my-service-name", postTryMe).withAppToken();
    postTryMe = UseCase.post("try/me", { ahoj: "svete" });
    let service1 = Service.create("my-service-name", postTryMe).withAppToken();

    let result;
    result = await service.signed.post("try/me");
    expect(result.data.hello).toBe("world");
    result = await service1.signed.post("try/me");
    expect(result.data.ahoj).toBe("svete");
  });

  test("expect UC to be called with appToken", async () => {
    let postTryMe = UseCase.post("try/me", { hello: "world" }).checkAppToken();
    let service = Service.create("my-service-name", postTryMe).withAppToken();

    let result;
    result = await service.signed.post("try/me");
    expect(result.data.hello).toBe("world");
  });

  test("expect UC to be called with appToken and validate source", async () => {
    let service = Service.create("my-service-name").withAppToken();
    let postTryMe = UseCase.post("try/me", { hello: "world" }).checkAppToken(
      "my",
      "service",
      "name",
      null,
      service.getAwid()
    );
    service.addUc(postTryMe);

    let result;
    result = await service.signed.post("try/me");
    expect(result.data.hello).toBe("world");
  });

  test("expect UC to be called with appToken from invalid source", async () => {
    let service = Service.create("my-service-name").withAppToken();
    let postTryMe = UseCase.post("try/me", { hello: "world" }).checkAppToken(
      "uu",
      "service",
      "name",
      null,
      service.getAwid()
    );
    service.addUc(postTryMe);

    let result;
    try {
      result = await service.signed.post("try/me");
    } catch (e) {
      result = e.response;
    }

    expect(result.status).toBe(401);
  });

  test("create multiple services with appToken and UCs", async () => {
    let postTryMe = UseCase.post("try/me", { hello: "world" }).checkAppToken();
    let service = Service.create("my-service-name", postTryMe).withAppToken();
    postTryMe = UseCase.post("try/me", { ahoj: "svete" }).checkAppToken();
    let service1 = Service.create("my-service-name", postTryMe).withAppToken();

    let result;
    result = await service.signed.post("try/me");
    expect(result.data.hello).toBe("world");
    result = await service1.signed.post("try/me");
    expect(result.data.ahoj).toBe("svete");
  });
});
