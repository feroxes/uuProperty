const { Service, UseCase } = require("uuapp-mock-server");

// this may come handy later on, when we will need override behaviour of the cmd
// the basic behaviour - post method, validations should stay the same
// it is a function that returns new instance
// if we export just result of UseCase.post we would alter existing UC
function prepareInit() {
  return UseCase.post("integration/init");
}

// we can provide dtoIn validation schema to perform validation.
// So we can be sure that we are sending in all the input values for our uuCmd
function prepareUpdate() {
  return UseCase.post("integration/update").withValidationSchema(
    `shape({
  type: oneOf("positive","negative", "neutral").isRequired(),
  fileName: string(1,255).isRequired(),
  valueList: map(string(),string()).isRequired()
})`
  );
}

// setup HDS behaviour for our uuCmds
let initUc = prepareInit().returns({ complete: true });
let updateUc = prepareUpdate().returnsCallback((uri, dtoIn) => {
  return { fileName: dtoIn.fileName };
});

// finally setup the service with all the UseCases
// encapsulate the creation into function to create the service after the Server started
function getService() {
  return Service.create("uu-my-service", initUc, updateUc);
}

// export service and also the prepare functions to be able to easily specify desired behaviour later on
module.exports = {
  getService,
  ucPrepare: {
    init: prepareInit,
    update: prepareUpdate,
  },
};
