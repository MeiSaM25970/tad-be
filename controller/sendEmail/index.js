var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6c1b1462bf7b28",
    pass: "24a7527302a182",
  },
});

var mailOptions = {
  from: "tad.group.email@gmail.com",
  to: "meisam25970@gmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
module.exports = transporter;
