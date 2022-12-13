const { MockServer } = require("uu_appg01_server-test");
let mockServerInstance;

function startMockServer(mockServerHandler) {
  if (!mockServerInstance) {
    mockServerInstance = new MockServer();
    mockServerInstance.start(mockServerHandler);
  }
}

function stopMockServer() {
  if (mockServerInstance) {
    mockServerInstance.stop();
    mockServerInstance = null;
  }
}

function getGateway() {
  return mockServerInstance.getGatewayUrl();
}

module.exports = {
  startMockServer,
  stopMockServer,
  getGateway,
};
