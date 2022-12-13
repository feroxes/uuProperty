const { startMockServer, stopMockServer } = require("./src/server.js");
const { requestHandler, reset } = require("./src/request");
const { mockService, copyService } = require("./src/service");
const { mockUc } = require("./src/use-case");
const Client = require("./src/app-client.js");

const Server = {
  start() {
    startMockServer(requestHandler);
  },
  stop() {
    stopMockServer();
    reset();
  },
};

const Service = {
  create(name, ...ucs) {
    return mockService(name, ...ucs);
  },

  copy(service, ...ucs) {
    return copyService(service, ...ucs);
  },
};

const UseCase = {
  get(path, returns, validationSchema) {
    return mockUc(path, returns, validationSchema).asGet();
  },

  post(path, returns, validationSchema) {
    return mockUc(path, returns, validationSchema).asPost();
  },
};

module.exports = {
  Server,
  UseCase,
  Service,
  Client,
};
