const baseRepo = require("./base.repo");
const mongoDb = require("mongodb");

const weblog = {
  create: (weblog, next) => {
    const categoryObjId = new mongoDb.ObjectID(weblog.category);
    weblog.category = categoryObjId;
    baseRepo.connect((err, db) => {
      if (err) next(err);
      db.collection("weblog").insertOne(weblog, next);
    });
  },
  fetchAll: (next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("weblog").find({}).sort({ date: -1 }).toArray(next);
      }
    });
  },
  findById: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("weblog").findOne({ _id: objId }, next);
      }
    });
  },
  filterByCategoryId: (id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(id);
        db.collection("weblog")
          .find({
            category: objId,
          })
          .sort({ date: -1 })
          .toArray(next);
      }
    });
  },
  delete: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("weblog").deleteOne({ _id: objId }, next);
      }
    });
  },
  update: (_id, weblog, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("weblog").updateOne(
          { _id: objId },
          { $set: weblog },
          next
        );
      }
    });
  },
};
module.exports = weblog;
