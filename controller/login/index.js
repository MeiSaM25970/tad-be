const path = require("path");

const loginController = {
  get: (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../public/login.html"));
  },
  post: (req, res) => {
    const product = req.body;
  },
};
module.exports = loginController;
