const baseRepo = require("./base.repo");

const counter = {
  create: (count, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      db.collection("counter").insertOne(count, next);
    });
  },
  fetchAll: (next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("counter").find({}).toArray(next);
      }
    });
  },
};

module.exports = counter;
