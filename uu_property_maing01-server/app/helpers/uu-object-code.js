"use strict";

const crypto = require("crypto");

const UuObjectCode = {
  /**
   * Generate unique code.
   * byteLength
   * @returns {string} unique code
   */
  generate(byteLength = 8, format = "hex") {
    return crypto.randomBytes(byteLength).toString(format);
  },
};

module.exports = UuObjectCode;
