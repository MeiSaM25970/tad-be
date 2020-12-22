const _ = require("lodash");
const bcrypt = require("bcryptjs");
const usersRepo = require("../../dal/users.repo");
const controller = {
  login: (req, res) => {
    const credentials = _.pick(req.body, ["username", "password"]);
    credentials.username = credentials.username.toLowerCase();
    usersRepo.findByUsername(credentials.username, (err, user) => {
      if (err) res.status(500).send(err);
      else if (!user)
        res.status(404).send({ msg: "این نام کاربری ثبت نشده است." });
      else {
        bcrypt
          .compare(credentials.password, user.password)
          .then((isMatch) => {
            if (isMatch) {
              usersRepo.generateToken(user.username, (err, token) => {
                if (err) res.status(500).send(err);
                else {
                  user.token = token;
                  delete user.tokens;
                  delete user.password;
                  res.send(user);
                }
              });
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
  register: (req, res) => {
    const credentials = _.pick(req.body, ["username", "email", "password"]);
    credentials.username = credentials.username.toLowerCase();
    usersRepo.findByUsername(credentials.username, (err, user) => {
      if (err) res.status(500).send(err);
      else if (user)
        res.status(400).send({ msg: "این نام کاربری قبلا ثبت شده است." });
      else {
        const salt = bcrypt.genSaltSync(10);
        bcrypt
          .hash(credentials.password, salt)
          .then((hashedPassword) => {
            usersRepo.create(
              {
                username: credentials.username,
                email: credentials.email,
                password: hashedPassword,
                adminId: req.user._id,
                type: "admin",
              },
              (err, result) => {
                if (err) res.status(500).send(err);
                else
                  usersRepo.findByUsername(
                    credentials.username,
                    (err, user) => {
                      if (err) res.status(500).send(err);
                      else {
                        usersRepo.generateToken(user.username, (err, token) => {
                          if (err) res.status(500).send(err);
                          else {
                            user.token = token;
                            delete user.password;
                            res.send(user);
                          }
                        });
                      }
                    }
                  );
              }
            );
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    });
  },
  fetchAll: (req, res) => {
    const fetchUsers = [];
    const username = req.query.username;
    usersRepo.findByUsername(username, (err, user) => {
      if (err) res.status(500).send(err);
      else {
        usersRepo.fetchAll(async (err, data) => {
          if (err) res.status(500).send(err);
          else if (!data) res.status(404).send({ msg: "کاربری یافت نشد." });
          else {
            const dataLength = data.length;
            const lastUsername = data[dataLength - 1].username;
            await data.forEach(async (user) => {
              if (user.type === "admin") {
                await delete user.password;
                await delete user.tokens;
                await fetchUsers.push(user);
                if (user.username === lastUsername) {
                  if (fetchUsers.length > 0) {
                    await res.send(fetchUsers);
                  } else res.status(404).send({ msg: "کاربری یافت نشد." });
                }
              } else {
                if (user.username === lastUsername) {
                  if (fetchUsers.length > 0) {
                    await res.send(fetchUsers);
                  } else res.status(404).send({ msg: "کاربری یافت نشد." });
                }
              }
            });
          }
        });
      }
    });
  },
  deleteUser: (req, res) => {
    const adminUsername = req.params.username;
    const userId = req.query.id;
    usersRepo.findByUsername(adminUsername, (err) => {
      if (err) res.status(500).send(err);
      else {
        usersRepo.delete(userId, (err, result) => {
          if (err) res.status(500).send(err);
          else res.send(result);
        });
      }
    });
  },
  findUserByUsername: (req, res) => {
    const username = req.params.username;
    usersRepo.findByUsername(username, (err, user) => {
      if (err) res.status(500).send(err);
      else {
        if (!user) res.status(404).send({ msg: "کاربر مورد نظر یافت نشد." });
        else {
          delete user.password;
          delete user.tokens;
          res.send(user);
        }
      }
    });
  },
};

module.exports = controller;
