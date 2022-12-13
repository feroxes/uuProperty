const Constants = {
  Schemas: {
    PROPERTY_MAIN: "propertyMain",
    LOCATION: "location",
    WORKPLACE: "workplace",
    CATEGORY: "category",
    INVENTORY_ITEM: "inventoryItem",
  },

  ErrorCodes: {
    duplicateKey: "uu-app-objectstore/duplicateKey",
  },

  States: {
    ON_STORAGE: "ON_STORAGE",
    FINAL_STATES: ["SOLD"],
  },

  Profiles: {
    AUTHORITIES: "Authorities",
    USERS: "Users",
  },

  DefaultPageInfo: {
    pageIndex: 0,
    pageSize: 1000,
  },

  DEFAULT_PAGE_INDEX: 0,
  DEFAULT_PAGE_SIZE: 1000,
};

module.exports = Constants;
