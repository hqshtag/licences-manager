const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const nocache = require("nocache");
/* const session = require('express-session');
const MongoStore = require('connect-mongo')(session); */
const { verifyToken } = require("./middleware/verifyToken");

const fs = require("fs-extra");
const rfs = require("rotating-file-stream");

require("./configs/database");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const app = express();
app.use(nocache());

// Set "Access-Control-Allow-Origin" header
app.use(
  cors({
    origin: (origin, cb) => {
      cb(null, origin && origin.startsWith("http://localhost:"));
    },
    optionsSuccessStatus: 200,
    credentials: true
  })
);

let logDirectory = path.join(__dirname, "log");

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
let accessLogStream = rfs("access.log", {
  interval: "1d", // rotate daily
  path: logDirectory
});

app.use(logger("short", { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", require("./routes/index"));
app.use("/api", require("./routes/auth"));
app.use("/api/licences", verifyToken);
app.use("/api/licences", require("./routes/licences"));

// For any routes that starts with "/api", catch 404 and forward to error handler
app.use("/api/*", (req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  console.error("----- An error happened -----");
  console.error(err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(err.status || 500);
    // A limited amount of information sent in production
    if (process.env.NODE_ENV === "production") res.json(err);
    else
      res.json(
        JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)))
      );
  }
});

module.exports = app;
