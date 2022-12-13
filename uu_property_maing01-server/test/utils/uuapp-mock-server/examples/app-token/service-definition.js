const { Service, UseCase } = require("uuapp-mock-server");

// we can validate the UseCase to be called with appToken
function prepareSimple() {
  return UseCase.post("withToken/simple").checkAppToken();
}

// we can check source of the token ... same as in app
function prepareFull() {
  return UseCase.post("withToken/full").checkAppToken("vendor", "app", "subapp", "asid", "awid");
}

// setup HDS behaviour for our uuCmds
let simpleUc = prepareSimple().returns({ complete: true });
let fullUc = prepareFull().returns({ complete: true });

// finally setup the service with all the UseCases
// also by "withAppToken" we can sign our requests from the app
function getService() {
  return Service.create("uu-my-service", simpleUc, fullUc).withAppToken();
}

// export service and also the prepare functions to be able to easily specify desired behaviour later on
module.exports = {
  getService,
  ucPrepare: {
    simple: prepareSimple,
    full: prepareFull,
  },
};
