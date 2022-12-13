"use strict";
const MainMongo = require("./main-mongo.js");
const { ObjectId } = require("mongodb");
class InventoryItemMongo extends MainMongo {
  async createSchema() {
    await super.createIndex({ awid: 1, name: 1 });
    await super.createIndex({ awid: 1, inventoryNumber: 1 }, { unique: true });
    await super.createIndex({ awid: 1, locationId: 1 });
    await super.createIndex({ awid: 1, workplaceId: 1 });
    await super.createIndex({ awid: 1, userUuIdentity: 1 });
    await super.createIndex({ awid: 1, invoiceNumber: 1 });
    await super.createIndex({ awid: 1, state: 1 });
  }

  async listByCriteria(filterMap, pageInfo) {
    const { pageIndex, pageSize } = pageInfo;
    filterMap.locationId && (filterMap.locationId = ObjectId(filterMap.locationId));
    filterMap.workplaceId && (filterMap.workplaceId = ObjectId(filterMap.workplaceId));
    if (filterMap.name) {
      filterMap.name = {
        $regex: filterMap.name,
        $options: "i",
      };
    }

    const inventoryItems = await super.aggregate([
      { $match: filterMap },
      {
        $lookup: {
          from: "location",
          localField: "locationId",
          foreignField: "_id",
          as: "location",
        },
      },
      { $unwind: "$location" },
      { $addFields: { id: "$_id", "location.id": "$location._id" } },
      { $project: { _id: 0, "location.sys": 0, "location._id": 0 } },
      {
        $lookup: {
          from: "workplace",
          localField: "workplaceId",
          foreignField: "_id",
          as: "workplace",
        },
      },
      { $unwind: "$workplace" },
      { $addFields: { id: "$_id", "workplace.id": "workplace._id" } },
      { $project: { _id: 0, "workplace.sys": 0, "workplace._id": 0 } },
      {
        $facet: {
          itemList: [{ $skip: pageIndex * pageSize }, { $limit: pageSize }],
          info: [{ $group: { _id: null, count: { $sum: 1 } } }],
        },
      },
    ]);

    let total = 0;
    if (inventoryItems[0]?.info[0]) {
      total = inventoryItems[0].info[0].count;
    }

    return {
      itemList: inventoryItems[0].itemList,
      pageInfo: { pageIndex, pageSize, total },
    };
  }
}

module.exports = InventoryItemMongo;