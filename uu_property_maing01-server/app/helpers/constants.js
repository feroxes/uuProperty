const Constants = {
  Schemas: {
    PROPERTY_MAIN: "propertyMain",
    LOCATION: "location",
    WORKPLACE: "workplace",
    CATEGORY: "category",
  },

  ErrorCodes: {
    duplicateKey: "uu-app-objectstore/duplicateKey",
  },

  States: {
    ACTIVE: "active",
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
