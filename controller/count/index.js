const counterRepo = require("../../dal/count.repo");
const moment = require("moment-jalaali");
const counterController = {
  fetch: (req, res) => {
    counterRepo.fetchAll((err, data) => {
      if (err) res.status(500).send(err);
      else res.send({ webVisit: data.length });
    });
  },
  create: (req, res) => {
    const count = {
      url: req.baseUrl,
      // headers: req.headers,
      // body: req.body,
      date: moment().format("YYYY/MM/DD HH:mm:ss"),
    };
    counterRepo.create(count, (err, result) => {
      if (err) res.status(500).send(err);
      else {
        res.end();
      }
    });
  },
};

module.exports = counterController;
