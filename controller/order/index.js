const paymentRepo = require("../../dal/payment.repo");

const orderDetailController = {
  fetchAll: (req, res) => {
    paymentRepo.fetchAll((err, data) => {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  },
  findById: (req, res) => {
    const orderId = req.params.id;
    paymentRepo.findById(orderId, (err, order) => {
      if (err) res.status(500).send(err);
      else {
        res.send(order);
      }
    });
  },
  update: (req, res) => {
    const newPayment = req.body;
    const orderId = req.params.id;
    delete newPayment._id;
    paymentRepo.update(orderId, newPayment, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
  delete: (req, res) => {
    const orderId = req.params.id;
    console.log(orderId);
    paymentRepo.delete(orderId, (err, result) => {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },
};

module.exports = orderDetailController;
