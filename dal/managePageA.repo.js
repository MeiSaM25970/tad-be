const baseRepo = require("./base.repo");
const mongoDb = require("mongodb");

const pageA = {
  create: (feature, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      db.collection("page-a-feature").insertOne(feature, next);
    });
  },
  fetchAll: (next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("page-a-feature").find({}).toArray(next);
      }
    });
  },
  findById: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("page-a-feature").findOne({ _id: objId }, next);
      }
    });
  },
  delete: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("page-a-feature").deleteOne({ _id: objId }, next);
      }
    });
  },
  update: (_id, feature, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("page-a-feature").updateOne(
          { _id: objId },
          { $set: feature },
          next
        );
      }
    });
  },
};
module.exports = pageA;
