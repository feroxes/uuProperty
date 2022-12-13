"use strict";
const PropertyMainUseCaseError = require("./property-main-use-case-error.js");

const Create = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}/location/create/`,

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

const Update = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}/location/update/`,

  InvalidDtoIn: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LocationDoesNotExist: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}locationDoesNotExist`;
      this.message = "Location does not exist.";
    }
  },

  LocationAlreadyExists: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}locationAlreadyExists`;
      this.message = "Location already exists.";
    }
  },

  LocationDaoUpdateFailed: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}locationDaoUpdateFailed`;
      this.message = "Location DAO update failed.";
    }
  },
};

module.exports = { Create, Update };
