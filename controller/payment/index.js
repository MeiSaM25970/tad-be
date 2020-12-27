const paymentRepo = require("../../dal/payment.repo");
const address = require("../../src/address");
const _ = require("lodash");
const uid = require("uid");
const moment = require("moment-jalaali");
const sendSmsNormal = require("../sendSMS/normal");

const checkoutController = {
  create: (req, res) => {
    const userInfo = req.body;
    if (userInfo) {
      if (
        !userInfo.fullName ||
        !userInfo.productType ||
        !userInfo.phoneNumber
      ) {
        res.status(400).send({ massage: "درخواست معتبر نمی باشد." });
      } else {
        try {
          const data = userInfo;
          const date = moment().format("YYYY/MM/DD HH:mm:ss");
          const trackingCode = uid.uid(6);
          const newPayment = {
            description: data.description,
            date: date,
            mobile: data.phoneNumber,
            isSuccess: true,
            isAdded: true,
            trackingCode: trackingCode,
            status: "new",
            productName: data.productType,
            fullName: data.fullName,
          };
          paymentRepo.create(newPayment, (err) => {
            if (err) res.status(500).send(err);
            else {
              sendSmsNormal({
                fullName: newPayment.fullName,
                phoneNumber: newPayment.mobile,
              });
              res.send({
                url: `${
                  address.success_payment +
                  "?trackingCode=" +
                  newPayment.trackingCode
                }`,
              });
            }
          });
        } catch (err) {
          console.log(err);
        }
      }
    } else
      res.status(400).send({ massage: "اطلاعات وارد شده معتبر نمی باشد." });
  },
  verify: (req, res) => {
    const query = _.pick(req.query, ["Status", "Authority"]);
    if (!query.Authority) {
      return res.status(400).send("کلید مالی ارسال نشده است");
    } else {
      paymentRepo.findByAuthority(query.Authority, (err, data) => {
        if (err) res.status(500).send(err);
        else {
          if (data.isSuccess === undefined) {
            if (query.Status === "OK") {
              const trackingCode = uid.uid(6);
              const newPayment = {
                productId: data.productId,
                price: data.price,
                authority: data.authority,
                description: data.description,
                date: data.date,
                mobile: data.mobile,
                isSuccess: true,
                isAdded: true,
                trackingCode: trackingCode,
                status: "new",
                productName: data.productName,
                fullName: data.fullName,
                area: data.area,
                city: data.city,
                address: data.address,
                postCode: data.postCode,
              };
              paymentRepo.update(data._id, newPayment, (err) => {
                if (err) res.status(500).send(err);
                else {
                  res.redirect(
                    `${
                      address.success_payment +
                      "?trackingCode=" +
                      newPayment.trackingCode +
                      "&productId=" +
                      newPayment.productId
                    }`
                  );
                }
              });
            } else {
              const newPayment = {
                productId: data.productId,
                price: data.price,
                authority: data.authority,
                description: data.description,
                date: data.date,
                mobile: data.mobile,
                isSuccess: false,
                isAdded: false,
                productName: data.productName,
                fullName: data.fullName,
                area: data.area,
                city: data.city,
                address: data.address,
                postCode: data.postCode,
                status: "fail",
              };
              paymentRepo.update(data._id, newPayment, (err) => {
                if (err) res.status(500).send(err);
                else {
                  res
                    .status(400)
                    .redirect(
                      `${
                        address.fail_payment +
                        "?productId=" +
                        newPayment.productId
                      }`
                    );
                }
              });
            }
          } else {
            res
              .status(400)
              .send({ massage: "این صورت حساب قبلا اعمال شده است" });
          }
        }
      });
    }
  },
  fetchPaymentLog: (req, res) => {
    paymentRepo.fetchAll((err, data) => {
      if (err) res.status(500).send(err);
      else res.send(data);
    });
  },
};

module.exports = checkoutController;
