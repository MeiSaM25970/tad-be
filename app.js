const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const appRouter = require("./router/index");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(appRouter);
app.listen(process.env.PORT || 4000);

console.log("server is listening on port " + (process.env.PORT || 4000));
