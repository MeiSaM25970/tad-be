const request = require("request");

const sendSmsNormal = (obj) => {
  request.post(
    {
      url: "http://ippanel.com/api/select",
      body: {
        op: "send",
        uname: "Meitix",
        pass: "2080094165",
        message:
          "مشتری با مشخصات زیر سفارش ثبت کرده است." +
          " نام:" +
          obj.fullName +
          " شماره: " +
          obj.phoneNumber,
        from: "+98100020400",
        to: ["09116805530", "09358469833", "09382620126"],
      },
      json: true,
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
        console.log(response.body, body);
      } else {
        console.log(error, "Meisam");
      }
    }
  );
};
module.exports = sendSmsNormal;
