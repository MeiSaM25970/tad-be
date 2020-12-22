const userRepo = require("../../dal/users.repo");
const userInfoController = {
  fetchUserInfoById: (req, res) => {
    const username = req.params.username;
    userRepo.findByUsername(username, (err, userInfo) => {
      if (err) res.status(500).send(err);
      else {
        if (!userInfo) {
          res.status(404).send({ msg: "کاربر مورد نظر یافت نشد." });
        } else {
          delete userInfo.password;
          delete userInfo.tokens;
          res.send(userInfo);
        }
      }
    });
  },
  updateUserInfo: (req, res) => {
    const username = req.body.username;
    userRepo.findByUsername(username, (err, data) => {
      if (err) res.status(500).send(err);
      else if (!data) {
        res.status(404).send({ msg: "کاربر مورد نظر یافت نشد." });
      } else {
        const newUserInfo = req.body;
        newUserInfo.password = data.password;
        userRepo.update(newUserInfo, (err, result) => {
          if (err) res.status(500).send(err);
          else res.send({ username: newUserInfo.username });
        });
      }
    });
  },
};

module.exports = userInfoController;
