const baseRepo = require("./base.repo");
const mongoDb = require("mongodb");

const products = {
  create: (product, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      db.collection("products").insertOne(product, next);
    });
  },
  fetchAll: (next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("products").find({}).toArray(next);
      }
    });
  },
  findById: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("products").findOne({ _id: objId }, next);
      }
    });
  },
  delete: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("products").deleteOne({ _id: objId }, next);
      }
    });
  },
  update: (_id, product, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("products").updateOne(
          { _id: objId },
          { $set: product },
          next
        );
      }
    });
  },
};
module.exports = products;
