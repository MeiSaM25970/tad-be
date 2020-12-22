const baseRepo = require("./base.repo");

const repo = {
  create: (order, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("orders").insertOne(order, next);
      }
    });
  },
};

module.exports = repo;
