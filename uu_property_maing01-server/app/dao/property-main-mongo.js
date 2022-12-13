"use strict";
const MainMongo = require("./main-mongo.js");

class PropertyMainMongo extends MainMongo {
  async createSchema() {
    await super.createIndex({ awid: 1 }, { unique: true });
  }
}

module.exports = PropertyMainMongo;
