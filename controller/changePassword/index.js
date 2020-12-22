const _ = require("lodash");
const bcrypt = require("bcryptjs");
const usersRepo = require("../../dal/users.repo");

const controller = {
  changePassword: (req, res) => {
    const credentials = _.pick(req.body, [
      "username",
      "oldPassword",
      "newPassword",
    ]);
    credentials.username = credentials.username.toLowerCase();
    usersRepo.findByUsername(credentials.username, (err, user) => {
      if (err) res.status(500).send(err);
      else if (!user)
        res.status(404).send({ msg: "این نام کاربری ثبت نشده است." });
      else {
        bcrypt
          .compare(credentials.oldPassword, user.password)
          .then((isMatch) => {
            if (isMatch) {
              const salt = bcrypt.genSaltSync(10);
              bcrypt
                .hash(credentials.newPassword, salt)
                .then(async (hashedPassword) => {
                  user.password = hashedPassword;
                  await usersRepo.update(user, (err, result) => {
                    if (err) res.status(500).send(err);
                    else res.send(result);
                  });
                })
                .catch((err) => console.log(err));
            } else {
              res.status(400).send({ msg: "کلمه عبور اشتباه است." });
            }
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    });
  },
};
module.exports = controller;
