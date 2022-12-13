"use strict";
const PropertyMainUseCaseError = require("./property-main-use-case-error.js");

const Create = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}/inventoryItem/create/`,

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

  WorkplaceDaoDoesNotExist: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}workplaceDaoDoesNotExist`;
      this.message = "Workplace does not exist.";
    }
  },

  LocationDoesNotBelongToWorkplace: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}locationDoesNotBelongToWorkplace`;
      this.message = "Location does not belong to workplace.";
    }
  },

  InventoryItemAlreadyExists: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}inventoryItemAlreadyExists`;
      this.message = "Inventory item already exists.";
    }
  },

  InventoryItemDaoCreateFailed: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}inventoryItem`;
      this.message = "Inventory item DAO create failed.";
    }
  },
};

const Update = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}/inventoryItem/update/`,

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

  LocationDoesNotBelongToWorkplace: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}locationDoesNotIncludesWorkplace`;
      this.message = "Location does not belong to workplace.";
    }
  },

  InventoryItemDoesNotExist: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}inventoryItemDoesNotExist`;
      this.message = "Inventory item does not exist.";
    }
  },

  WorkplaceDoesNotExist: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}workplaceDoesNotExist`;
      this.message = "Workplace does not exist.";
    }
  },

  InventoryItemIsOnFinalState: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}inventoryItemIsOnFinalState`;
      this.message = "Inventory item is on final state and can not be updated.";
    }
  },

  InventoryItemAlreadyExists: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}inventoryItemAlreadyExists`;
      this.message = "Inventory item already exists.";
    }
  },

  InventoryItemDaoUpdateFailed: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}inventoryItemDaoUpdateFailed`;
      this.message = "Inventory item DAO update failed.";
    }
  },
};

const List = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}/inventoryItem/list/`,

  InvalidDtoIn: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Delete = {
  UC_CODE: `${PropertyMainUseCaseError.ERROR_PREFIX}/inventoryItem/delete/`,

  InvalidDtoIn: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  InventoryItemDoesNotExist: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}inventoryItemDoesNotExist`;
      this.message = "Inventory item does not exist.";
    }
  },

  FailedToDeleteInventoryItem: class extends PropertyMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}failedToDeleteInventoryItem`;
      this.message = "Failed to delete inventory item.";
    }
  },
};

module.exports = { Create, Update, List, Delete };
