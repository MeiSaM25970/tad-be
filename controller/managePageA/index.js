const managePageARepo = require("../../dal/managePageA.repo");

const managePageAController = {
  create: (req, res) => {
    const feature = req.body;
    console.log(feature);
    if (!feature) {
      res.status(400).send({ massage: "ویژگی را وارد کنید" });
    }
    managePageARepo.create(feature, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
  fetchAll: (req, res) => {
    managePageARepo.fetchAll((err, data) => {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  },
  findById: (req, res) => {
    const featureId = req.params.id;
    managePageARepo.findById(featureId, (err, data) => {
      if (err) res.status(500).json(err.message);
      else res.json(data);
    });
  },
  delete: (req, res) => {
    const feature = req.body;
    managePageARepo.delete(feature._id, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
  update: (req, res) => {
    const feature = req.body;
    managePageARepo.update(
      todo._id,
      { title: feature.text, description: feature.description },
      (err, result) => {
        if (err) res.status(500).send(err);
        else res.send(result);
      }
    );
  },
};

module.exports = managePageAController;
