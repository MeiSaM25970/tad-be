const orderRepo = require("../../dal/order.repo");
const sendSms = require("../sendSMS");
const sendSmsNormal = require("../sendSMS/normal");
const controller = {
  create: (req, res) => {
    const order = req.body;
    if (!order) {
      res.status(400).send({ massage: "درخواست مجاز نمی باشد." });
    }
    orderRepo.create(order, (err, result) => {
      if (err) res.status(500).send(err);
      else
        sendSmsNormal({
          fullName: order.fullName,
          phoneNumber: order.phoneNumber,
        });
      res.send({ orderOk: true });
    });
  },
};

module.exports = controller;
