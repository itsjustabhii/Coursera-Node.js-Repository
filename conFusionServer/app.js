var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
import mongoose from "mongoose";
var session = require("express-session");
var FileStore = require("session-file-store")(session); //stores sessio cookies
import passport from "passport";
import { authenticate } from "passport";

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dishRouter = require("./routes/dishRouter");
var promoRouter = require("./routes/promoRouter");
var leaderRouter = require("./routes/leaderRouter");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(cookieParser("123456-67890-09876-54321"));

app.use(
  session({
    name: "Session-id",
    secret: "123456-67890-09876-54321",
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);

function auth(req, res, next) {
  console.log(req.session);
  if (!req.user) {
    var err = new Error("You are not authenticated!");
    err.status = 401;
    return next(err);
  } else {
    if (req.session.user === "authenticated") {
      next();
    }
  }
}

app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

app.use(auth);

import Dishes from "./models/dishes";

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

//Establishes connection from app.js to mongoDB
connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(connect(url));
  }
);

var app = express();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
