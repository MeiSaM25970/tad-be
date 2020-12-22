const baseRepo = require("./base.repo");
const mongoDb = require("mongodb");

const comments = {
  create: (comment, next) => {
    const weblogObjId = new mongoDb.ObjectId(comment.weblogId);
    comment.weblogId = weblogObjId;
    baseRepo.connect((err, db) => {
      if (err) next(err);
      db.collection("comments").insertOne(comment, next);
    });
  },
  fetchAll: (next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("comments").find({}).sort({ date: -1 }).toArray(next);
      }
    });
  },
  filterByWeblogId: (id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(id);
        db.collection("comments")
          .find({
            weblogId: objId,
          })
          .sort({ date: -1 })
          .toArray(next);
      }
    });
  },
  findById: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("comments").findOne({ _id: objId }, next);
      }
    });
  },
  delete: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("comments").deleteOne({ _id: objId }, next);
      }
    });
  },
  update: (_id, comment, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new mongoDb.ObjectID(_id);
        db.collection("comments").updateOne(
          { _id: objId },
          { $set: comment },
          next
        );
      }
    });
  },
};
module.exports = comments;
