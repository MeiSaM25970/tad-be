const categoriesRepo = require("../../dal/categories.repo");

const categoriesController = {
  fetchAll: (req, res) => {
    categoriesRepo.fetchAll((err, data) => {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  },
  create: (req, res) => {
    const category = req.body;
    categoriesRepo.create(category, (err, data) => {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  },
  findById: (req, res) => {
    const categoryId = req.params.id;
    categoriesRepo.findById(categoryId, (err, category) => {
      if (err) res.status(500).send(err);
      else {
        res.send(category);
      }
    });
  },
  update: (req, res) => {
    const newCategory = req.body;
    const categoryId = req.params.id;
    categoriesRepo.update(categoryId, newCategory, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
  delete: (req, res) => {
    const categoryId = req.params.id;
    categoriesRepo.delete(categoryId, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
};

module.exports = categoriesController;
