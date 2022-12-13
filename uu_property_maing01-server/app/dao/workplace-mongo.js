"use strict";
const MainMongo = require("./main-mongo.js");
const { ObjectId } = require("mongodb");
class WorkplaceMongo extends MainMongo {
  async createSchema() {
    await super.createIndex({ awid: 1, name: 1, locationId: 1 }, { unique: true });
  }

  async listByCriteria(filterMap, pageInfo) {
    const { pageIndex, pageSize } = pageInfo;
    filterMap.locationId && (filterMap.locationId = ObjectId(filterMap.locationId));

    const workplaces = await super.aggregate([
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
        $facet: {
          itemList: [{ $skip: pageIndex * pageSize }, { $limit: pageSize }],
          info: [{ $group: { _id: null, count: { $sum: 1 } } }],
        },
      },
    ]);

    let total = 0;
    if (workplaces[0]?.info[0]) {
      total = workplaces[0].info[0].count;
    }

    return {
      itemList: workplaces[0].itemList,
      pageInfo: { pageIndex, pageSize, total },
    };
  }
}

module.exports = WorkplaceMongo;
