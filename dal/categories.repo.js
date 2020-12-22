const baseRepo = require("./base.repo");
const mongoDb = require("mongodb");

const categories = {
  create: (category, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      db.collection("categories").insertOne(category, next);
    });
  },
  fetchAll: (next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("categories").find({}).toArray(next);
      }
    });
  },
  findById: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("categories").findOne({ _id: objId }, next);
      }
    });
  },
  delete: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("categories").deleteOne({ _id: objId }, next);
      }
    });
  },
  update: (_id, category, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("categories").updateOne(
          { _id: objId },
          { $set: category },
          next
        );
      }
    });
  },
};
module.exports = categories;
