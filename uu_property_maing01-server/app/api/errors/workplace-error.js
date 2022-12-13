"use strict";
const PropertyMainUseCaseError = require("./property-main-use-case-error.js");

const Create = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}/workplace/create/`,

  InvalidDtoIn: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  LocationDoesNotExist: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}locationDoesNotExist`;
      this.message = "Location does not exist.";
    }
  },

  WorkplaceAlreadyExists: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}workplaceAlreadyExists`;
      this.message = "Workplace already exists.";
    }
  },

  WorkplaceDaoCreateFailed: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}workplaceDaoCreateFailed`;
      this.message = "Workplace DAO create failed.";
    }
  },
};

const Update = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}/workplace/update/`,

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

  WorkplaceDoesNotExist: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}workplaceDoesNotExist`;
      this.message = "Workplace does not exist.";
    }
  },

  WorkplaceAlreadyExists: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}workplaceAlreadyExists`;
      this.message = "Workplace already exists.";
    }
  },

  WorkplaceDaoUpdateFailed: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}workplaceDaoUpdateFailed`;
      this.message = "Workplace DAO update failed.";
    }
  },
};

const List = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}/workplace/list/`,

  InvalidDtoIn: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = { Create, Update, List };
