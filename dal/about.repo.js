const baseRepo = require("./base.repo");
const mongoDb = require("mongodb");

const about = {
  create: (about, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      db.collection("about").insertOne(about, next);
    });
  },
  fetchAll: (next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("about").find({}).toArray(next);
      }
    });
  },
  findById: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("about").findOne({ _id: objId }, next);
      }
    });
  },
  delete: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("about").deleteOne({ _id: objId }, next);
      }
    });
  },
  update: (_id, about, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("about").updateOne({ _id: objId }, { $set: about }, next);
      }
    });
  },
};
module.exports = about;
