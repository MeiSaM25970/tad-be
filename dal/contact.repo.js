const baseRepo = require("./base.repo");
const mongoDb = require("mongodb");

const repo = {
  create: (contact, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("contact").insertOne(contact, next);
      }
    });
  },
  fetchAll: (next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("contact").find({}).toArray(next);
      }
    });
  },
  findById: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("contact").findOne({ _id: objId }, next);
      }
    });
  },
  delete: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("contact").deleteOne({ _id: objId }, next);
      }
    });
  },
  update: (_id, contact, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("contact").updateOne(
          { _id: objId },
          { $set: contact },
          next
        );
      }
    });
  },
};

module.exports = repo;
