const Errors = require("../errors/location-error.js");

const Warnings = {
  Create: {
    unsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;
