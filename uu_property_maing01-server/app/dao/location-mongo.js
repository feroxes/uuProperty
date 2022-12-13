"use strict";
const MainMongo = require("./main-mongo.js");

class LocationMongo extends MainMongo {
  async createSchema() {
    await super.createIndex({ awid: 1, name: 1 }, { unique: true });
  }
}

module.exports = LocationMongo;
