const axios = require("axios");
const sendSms = async (obj) => {
  const url = "http://rest.ippanel.com/v1/messages/patterns/send";
  const sender = "+9810000385";
  const patternCode = "zxzkhfqx2f";
  const headers = {
    Authorization: "AccessKey nzW71jRWIuuWIpsgodC2q368rEGx_OSlWQcmJU9fyoQ=",
  };
  try {
    await axios.post(
      url,
      {
        pattern_code: patternCode,
        originator: sender,
        recipient: "+989358469833",
        values: {
          name: obj.fullName,
          phnamber: obj.tel,
        },
      },
      { headers: headers }
    );
  } catch (err) {
    console.log(err);
  }
};
module.exports = sendSms;
