const weblogRepo = require("../../dal/weblog.repo");
const moment = require("moment-jalaali");

const weblogController = {
  create: (req, res) => {
    const weblog = req.body;
    if (!weblog) {
      res.status(400).send({ massage: "ورودی وبلاگ وجود ندارد" });
    } else {
      weblog.date = moment().format("YYYY/MM/DD HH:mm:ss");
      weblogRepo.create(weblog, (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result);
      });
    }
  },
  fetchAll: (req, res) => {
    const limitDataNum = req.query.limit;
    weblogRepo.fetchAll((err, data) => {
      if (err) res.status(500).send(err);
      else {
        if (limitDataNum) {
          const limitData = data;
          const newData = limitData.splice(0, limitDataNum);
          res.send(newData);
        } else res.send(data);
      }
    });
  },
  findById: (req, res) => {
    const weblogId = req.params.id;
    weblogRepo.findById(weblogId, (err, data) => {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  },
  filterByCategoriesId: (req, res) => {
    const categoryId = req.params.id;
    weblogRepo.filterByCategoryId(categoryId, (err, data) => {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  },
  delete: (req, res) => {
    const weblogId = req.params.id;
    weblogRepo.delete(weblogId, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
  update: (req, res) => {
    const newWeblog = req.body;
    const weblogId = req.params.id;
    delete newWeblog._id;
    weblogRepo.update(weblogId, newWeblog, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
};

module.exports = weblogController;
