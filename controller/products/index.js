const productRepo = require("../../dal/product.repo");

const productsController = {
  create: (req, res) => {
    const product = req.body;
    if (!product) {
      res.status(400).send({ massage: "محصول را وارد کنید" });
    }
    productRepo.create(product, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
  fetchAll: (req, res) => {
    productRepo.fetchAll((err, data) => {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  },
  findById: (req, res) => {
    const productId = req.params.id;
    productRepo.findById(productId, (err, data) => {
      if (err) res.status(500).json(err.message);
      else res.json(data);
    });
  },
  delete: (req, res) => {
    const productId = req.params.id;
    productRepo.delete(productId, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
  update: (req, res) => {
    const newProduct = req.body;
    const productId = req.params.id;
    delete newProduct._id;
    productRepo.update(productId, newProduct, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
};

module.exports = productsController;
