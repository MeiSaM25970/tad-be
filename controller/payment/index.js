// const userInfoSchema = require("./models/userInfo.model");
const orderRepo = require("../../dal/order.repo");
const paymentRepo = require("../../dal/payment.repo");
const address = require("../../src/address");
const zarinPalCode = require("./config");
const mongodb = require("mongodb");
const zPal = require("zarinpal-checkout");
const _ = require("lodash");
const uid = require("uid");
const moment = require("moment-jalaali");

const checkoutController = {
  create: (req, res) => {
    const userInfo = req.body;
    if (userInfo) {
      if (
        !userInfo.fullName ||
        !userInfo.area ||
        !userInfo.city ||
        !userInfo.address ||
        !userInfo.postCode ||
        !userInfo.productId ||
        !userInfo.productName ||
        !userInfo.productPrice
      ) {
        res.status(400).send({ massage: "درخواست معتبر نمی باشد." });
      } else {
        orderRepo.create(userInfo, (err, result) => {
          if (err) {
            res.status(500).send(err);
          } else {
            try {
              // if users pay from Payment gateway
              const price = userInfo.productPrice;
              // make description.
              const description =
                " بابت محصول " +
                userInfo.productName +
                " به نام : " +
                userInfo.fullName;
              // zarinpal payment
              const myZPal = zPal.create(zarinPalCode, true);
              myZPal
                .PaymentRequest({
                  Amount: price, // In Tomans
                  CallbackURL: `${address.api}payment/verify`,
                  Description: description,
                  mobile: userInfo.tel,
                })
                .then((response) => {
                  if (response.status === 100) {
                    const date = moment().format("YYYY/MM/DD HH:mm:ss");

                    const paymentLog = {
                      productId: new mongodb.ObjectId(userInfo.productId),
                      price: price,
                      authority: response.authority,
                      description,
                      date: date,
                      mobile: userInfo.tel,
                      productName: userInfo.productName,
                      fullName: userInfo.fullName,
                      area: userInfo.area,
                      city: userInfo.city,
                      address: userInfo.address,
                      postCode: userInfo.postCode,
                    };
                    paymentRepo.create(paymentLog, (err) => {
                      if (err) res.status(500).send(err);
                      else {
                        res.send(response.url);
                      }
                    });
                  } else {
                    return Promise.reject(response);
                  }
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).send(err);
                });
            } catch (err) {
              console.log(err);
            }
          }
        });
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
              const trackingCode = uid.uid(20);
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
