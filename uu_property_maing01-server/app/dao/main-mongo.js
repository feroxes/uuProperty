const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("mongodb");
const { DbConnection } = require("uu_appg01_datastore");

class MainDao extends UuObjectDao {
  /**
   * The function updates multiple objects in collection
   * @async
   * @param uuBulkArray
   * @param filter
   * @returns {Promise<void>}
   */
  async updateMany(uuBulkArray, filter = {}) {
    const now = new Date();
    const uuBulkModifyArray = uuBulkArray.map((element) => {
      let id;
      if (typeof element.id === "object") {
        id = element.id;
      } else {
        id = new ObjectId(element.id);
      }
      let result;
      const filter = {
        _id: id,
        awid: element.awid,
      };

      result = {
        updateOne: {
          filter,
          update: {
            $set: {
              ...element,
              "sys.mts": now,
            },
            $inc: {
              "sys.rev": 1,
            },
          },
        },
      };
      return result;
    });

    let db = await DbConnection.get(this.customUri);
    return await db.collection(this.collectionName).bulkWrite(uuBulkModifyArray, filter);
  }
  /**
   * The function create new object in collection
   * @async
   * @param uuObject
   * @returns {Promise<*>}
   */
  async create(uuObject) {
    return await super.insertOne(uuObject);
  }

  /**
   * The function create multiple objects in collection
   * @async
   * @param uuObjects
   * @returns {Promise<void>}
   */
  async createMany(uuObjects) {
    const bulkResults = await super.insertMany(uuObjects);

    return bulkResults.reduce((acc, el) => {
      if (el.id) {
        acc.push(el);
      }
      return acc;
    }, []);
  }

  /**
   * The function find and update object by id.
   * @async
   * @param awid
   * @param id
   * @param uuObject
   * @returns {Promise<*>}
   */
  async update(awid, id, uuObject) {
    const filter = { awid, id };
    const revision = uuObject.sys ? undefined : "NONE";
    return await super.findOneAndUpdate(filter, uuObject, revision);
  }

  /**
   * The function find and return object by id.
   * @async
   * @param awid
   * @param id
   * @returns {Promise<*>}
   */
  async get(awid, id) {
    return await super.findOne({ awid, id });
  }

  /**
   * The function find and return object by awid.
   * @async
   * @param awid
   * @returns {Promise<*>}
   */
  async getByAwid(awid) {
    return await super.findOne({ awid });
  }

  /**
   * The function find and return object by code.
   * @async
   * @param awid
   * @param code
   * @returns {Promise<*>}
   */
  async getByCode(awid, code) {
    return await super.findOne({ awid, code });
  }

  /**
   * The function find and return object by uuIdentity.
   * @async
   * @param awid
   * @param uuIdentity
   * @returns {Promise<*>}
   */
  async getByUuIdentity(awid, uuIdentity) {
    return await super.findOne({ awid, uuIdentity });
  }

  /**
   * The function find and return objects on page by pageInfo
   * @async
   * @param awid
   * @param pageInfo
   * @returns {Promise<*>}
   */
  async list(awid, pageInfo = {}) {
    return await super.find({ awid }, pageInfo);
  }

  /**
   * The function find and delete object by id
   * @async
   * @param awid
   * @param id
   * @returns {Promise<*>}
   */
  async delete(awid, id) {
    return await super.deleteOne({ awid, id });
  }

  /**
   * The function find and delete object by id
   * @async
   * @param awid
   * @param id
   * @returns {Promise<*>}
   */
  async removeAll(awid) {
    return await super.deleteMany({ awid });
  }
}

module.exports = MainDao;
