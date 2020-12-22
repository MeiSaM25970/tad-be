const baseRepo = require("./base.repo");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongodb").ObjectID;
const repo = {
  create: (credentials, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("users").insertOne(credentials, next);
      }
    });
  },
  findByUsername: (username, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else db.collection("users").findOne({ username }, next);
    });
  },
  generateToken: function (username, next) {
    this.findByUsername(username, (err, user) => {
      if (err) next(err);
      else if (!user) next(new Error("کاربر مورد نظر یافت نشد"));
      else {
        const token = jwt.sign(
          { _id: user._id, username: user.username },
          "JUWEURfdryd65&^@$$&&*r-==-rs"
        );
        user.tokens = user.tokens || [];
        user.tokens.push(token);
        this.update(user, (err, result) => {
          if (err) next(err);
          else next(null, token);
        });
      }
    });
  },
  update: (user, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        if (user._id) {
          const objId = new ObjectId(user._id);
          delete user._id;
          db.collection("users").updateOne(
            { _id: objId },
            { $set: user },
            next
          );
        } else next({ msg: "آیدی را وارد کنید." });
      }
    });
  },
  fetchAll: (next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        db.collection("users").find({}).toArray(next);
      }
    });
  },
  delete: (_id, next) => {
    baseRepo.connect((err, db) => {
      if (err) next(err);
      else {
        const objId = new ObjectId(_id);
        db.collection("users").deleteOne({ _id: objId }, next);
      }
    });
  },
};
module.exports = repo;
