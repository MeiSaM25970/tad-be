const countRepo = require("../../dal/count.repo");
const moment = require("moment-jalaali");

module.exports = (req, res, next) => {
  const count = {
    url: req.baseUrl,
    // headers: req.headers,
    // body: req.body,
    date: moment().format("YYYY/MM/DD HH:mm:ss"),
  };
  countRepo.create(count, (err, result) => {
    if (err) console.log(err);
    else {
      next();
    }
  });
};
