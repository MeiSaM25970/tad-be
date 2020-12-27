const baseRepo = require("./base.repo");
const mongoDb = require("mongodb");

const repo = {
  create: (paymentLog, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("orders").insertOne(paymentLog, next);
      }
    });
  },
  fetchAll: (next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("orders").find({}).sort({ date: -1 }).toArray(next);
      }
    });
  },
  findByAuthority: (authority, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("orders").findOne({ authority: authority }, next);
      }
    });
  },
  findByTrackingCode: (trackingCode, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("orders").findOne({ trackingCode }, next);
      }
    });
  },
  findById: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("orders").findOne({ _id: objId }, next);
      }
    });
  },
  update: (_id, payment, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("orders").updateOne(
          { _id: objId },
          { $set: payment },
          next
        );
      }
    });
  },
  delete: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("orders").deleteOne({ _id: objId }, next);
      }
    });
  },
};

module.exports = repo;
