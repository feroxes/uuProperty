"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../../api/errors/property-main-error.js").Init;
const Warnings = require("../../api/warnings/property-warnings.js").Init;
const { Schemas, States } = require("../../helpers/constants.js");

class InitAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao(Schemas.PROPERTY_MAIN);
  }

  async init(uri, dtoIn, uuAppErrorMap = {}) {
    const awid = uri.getAwid();
    // HDS 1
    let uuProperty = await this.dao.getByAwid(awid);
    if (uuProperty && uuProperty.state === States.ACTIVE) {
      // 1.2
      throw new Errors.UuPropertyAlreadyInitialized({ uuAppErrorMap });
    }

    // HDS 2, 2.2, 2.2.1, 2.3, 2.3.1
    const validationResult = this.validator.validate("initDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      Warnings.unsupportedKeys.code,
      Errors.InvalidDtoIn
    );

    // HDS 2
    const schemaCreateResults = Object.values(Schemas).map(async (schema) => {
      try {
        return await DaoFactory.getDao(schema).createSchema();
      } catch (e) {
        // 2.1
        throw new Errors.SchemaDaoCreateSchemaFailed({ uuAppErrorMap }, { schema }, e);
      }
    });
    await Promise.all(schemaCreateResults);

    // HDS 3
    const uuPropertyCreateDtoIn = {
      awid,
      state: States.ACTIVE,
      ...dtoIn,
    };

    // 3.1
    try {
      uuProperty = await this.dao.create(uuPropertyCreateDtoIn);
    } catch (e) {
      // 3.1.1
      throw new Errors.UuPropertyDaoCreateFailed({ uuAppErrorMap }, e);
    }

    // HDS 4
    return {
      ...uuProperty,
      uuAppErrorMap,
    };
  }
}

module.exports = new InitAbl();
