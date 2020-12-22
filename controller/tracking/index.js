const paymentLogRepo = require("../../dal/payment.repo");
const trackingController = {
  search: (req, res) => {
    const trackingCode = req.query.trackingCode;
    paymentLogRepo.findByTrackingCode(trackingCode, (err, payment) => {
      if (err) res.status(500).send(err);
      else {
        if (!payment) {
          res.status(404).send({ msg: "نتیجه ای یافت نشد" });
        } else res.send(payment);
      }
    });
  },
};

module.exports = trackingController;
