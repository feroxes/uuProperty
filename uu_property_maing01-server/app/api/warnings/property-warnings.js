const Errors = require("../errors/property-main-error.js");

const Warnings = {
  Init: {
    unsupportedKeys: {
      code: `${Errors.Init.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;
