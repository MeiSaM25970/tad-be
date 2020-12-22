const mongoDb = require("mongodb");

let theDB = undefined;

const connect = (next) => {
  if (theDB) {
    next(null, theDB);
    return;
  }
  mongoDb.connect(
    "mongodb://localhost:27017/tad-group",
    { useUnifiedTopology: true },
    (err, client) => {
      if (err) next(err);
      else {
        theDB = client.db();
        next(null, theDB);
      }
    }
  );
};

module.exports.connect = connect;
