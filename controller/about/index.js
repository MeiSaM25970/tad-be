const aboutRepo = require("../../dal/about.repo");

const aboutController = {
  create: (req, res) => {
    const about = req.body;
    if (!about) {
      res.status(400).send({ massage: "ورودی درباره ما وجود ندارد" });
    }
    aboutRepo.create(about, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
  fetchAll: (req, res) => {
    aboutRepo.fetchAll((err, data) => {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  },
  findById: (req, res) => {
    const aboutId = req.params.id;
    aboutRepo.findById(aboutId, (err, data) => {
      if (err) res.status(500).json(err.message);
      else res.json(data);
    });
  },
  delete: (req, res) => {
    const aboutId = req.params.id;
    aboutRepo.delete(aboutId, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
  update: (req, res) => {
    const newAbout = req.body;
    const aboutId = req.params.id;
    delete newAbout._id;
    aboutRepo.update(aboutId, newAbout, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
};

module.exports = aboutController;
