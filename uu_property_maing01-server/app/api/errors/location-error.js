"use strict";
const PropertyMainUseCaseError = require("./property-main-use-case-error.js");

const Create = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LocationAlreadyExists: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}locationAlreadyExists`;
      this.message = "Location already exists.";
    }
  },

  LocationDaoCreateFailed: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}locationDaoCreateFailed`;
      this.message = "Location DAO create failed.";
    }
  },
};

module.exports = { Create };
