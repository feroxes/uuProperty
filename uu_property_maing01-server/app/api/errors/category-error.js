"use strict";
const PropertyMainUseCaseError = require("./property-main-use-case-error.js");

const Create = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}/category/create/`,

  InvalidDtoIn: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  CategoryAlreadyExists: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}categoryAlreadyExists`;
      this.message = "Category already exists.";
    }
  },

  CategoryDaoCreateFailed: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}categoryDaoCreateFailed`;
      this.message = "Category DAO create failed.";
    }
  },
};

const Update = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}/category/update/`,

  InvalidDtoIn: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  CategoryDoesNotExist: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}CategoryDoesNotExist`;
      this.message = "Category does not exist.";
    }
  },

  CategoryAlreadyExists: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}locationAlreadyExists`;
      this.message = "Category already exists.";
    }
  },

  CategoryDaoUpdateFailed: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}categoryDaoUpdateFailed`;
      this.message = "Category DAO update failed.";
    }
  },
};

const List = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}/category/list/`,

  InvalidDtoIn: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = { Create, Update, List };
