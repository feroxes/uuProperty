const { Server } = require("../index");

describe("server can be started and stopped", () => {
  // well, thats basically it :)
  test("start and stop server without error", async () => {
    await Server.start();
    // some work here
    await Server.stop();
  });
});
