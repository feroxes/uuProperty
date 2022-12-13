"use strict";
const PropertyMainUseCaseError = require("./property-main-use-case-error.js");

const Init = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  UuPropertyAlreadyInitialized: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}uuPropertyAlreadyInitialized`;
      this.message = "uuProperty already initialized.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  UuPropertyDaoCreateFailed: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}uuPropertyDaoCreateFailed`;
      this.message = "uuProperty DAO create failed.";
    }
  },
};

module.exports = {
  Init,
};
