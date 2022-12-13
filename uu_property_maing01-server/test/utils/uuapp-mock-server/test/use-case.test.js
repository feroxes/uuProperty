const { Server, Service, UseCase } = require("../index");

beforeAll(async () => {
  await Server.start();
});

afterAll(async () => {
  await Server.stop();
});

describe("use-case definition", () => {
  test("basic post uuCmd", async () => {
    let useCase = UseCase.post("try/me", { hello: "world" });
    let service = Service.create("my-service-name", useCase);

    let result = await service.post("try/me");

    expect(result.data.hello).toBe("world");
  });

  test("basic get uuCmd", async () => {
    let useCase = UseCase.get("try/me", { hello: "world" });
    let service = Service.create("my-service-name", useCase);

    let result = await service.get("try/me");

    expect(result.data.hello).toBe("world");
  });

  test("incorrect method call - post/get", async () => {
    let useCase = UseCase.post("try/me", { hello: "world" });
    let service = Service.create("my-service-name", useCase);

    let result;
    try {
      result = await service.get("try/me");
    } catch (e) {
      result = e.response;
    }

    expect(result.status).toBe(405);
    expect(result.data).toBe("Incorrect HTTP method for try/me, it is mapped as POST!");
  });

  test("incorrect method call - get/post", async () => {
    let useCase = UseCase.get("try/me", { hello: "world" });
    let service = Service.create("my-service-name", useCase);

    let result;
    try {
      result = await service.post("try/me");
    } catch (e) {
      result = e.response;
    }

    expect(result.status).toBe(405);
    expect(result.data).toBe("Incorrect HTTP method for try/me, it is mapped as GET!");
  });

  test("missing UC", async () => {
    let service = Service.create("my-service-name");

    let result;
    try {
      result = await service.post("try/me");
    } catch (e) {
      result = e.response;
    }

    expect(result.status).toBe(404);
    expect(result.data).toBe("No mock for try/me found for my-service-name!");
  });

  test("invalid DtoIn", async () => {
    let useCase = UseCase.post("try/me", { hello: "world" }).withValidationSchema(`shape({
  type: oneOf("decision-positive","decision-negative").isRequired(),
  fileName: string(1,255).isRequired()
})`);
    let service = Service.create("my-service-name", useCase);

    let result;
    try {
      result = await service.post("try/me", {});
    } catch (e) {
      result = e.response;
      result.data = JSON.parse(result.data);
    }

    expect(result.status).toBe(400);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.uuAppErrorMap["my-service-name/try/me/invalidDtoIn"]).toBeDefined();
    expect(result.data.uuAppErrorMap["my-service-name/try/me/invalidDtoIn"].message).toBe("DtoIn is not valid.");
  });

  test("returns callback", async () => {
    let useCase = UseCase.post("try/me").returnsCallback((uri, dtoIn) => {
      return { code: dtoIn.code };
    });
    let service = Service.create("my-service-name", useCase);

    let result = await service.post("try/me", { code: "works" });

    expect(result.status).toBe(200);
    expect(result.data.code).toBe("works");
  });

  test("throws custom error", async () => {
    let useCase = UseCase.post("try/me").throws("myErrorCode", "Error Message", { code: "invalidCode" });
    let service = Service.create("my-service-name", useCase);

    let result;
    try {
      result = await service.post("try/me", {});
    } catch (e) {
      result = e.response;
    }

    expect(result.status).toBe(400);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.uuAppErrorMap["myErrorCode"]).toBeDefined();
    expect(result.data.uuAppErrorMap["myErrorCode"].message).toBe("Error Message");
    expect(result.data.uuAppErrorMap["myErrorCode"].paramsMap).toMatchObject({ code: "invalidCode" });
  });

  test("check jest mock calls", async () => {
    let useCase = UseCase.post("try/me").returnsCallback((uri, dtoIn) => {
      return { code: dtoIn.code };
    });
    let service = Service.create("my-service-name", useCase);

    let result = await service.post("try/me", { code: "works" });

    expect(result.status).toBe(200);
    expect(result.data.code).toBe("works");

    expect(useCase.getJestMock().mock.calls.length).toBe(1);
  });

  test("check jest mock calls - getUc", async () => {
    let useCase = UseCase.post("try/me").returnsCallback((uri, dtoIn) => {
      return { code: dtoIn.code };
    });
    let service = Service.create("my-service-name", useCase);

    let result = await service.post("try/me", { code: "works" });
    let jestMock = service.getUc("try/me");

    expect(result.status).toBe(200);
    expect(result.data.code).toBe("works");

    expect(jestMock.getJestMock().mock.calls.length).toBe(1);
  });
});
