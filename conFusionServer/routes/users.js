import express from "express";
const bodyParser = require("body-parser");
import UserSchema from "../models/user";
import passport from "passport";

var router = express.Router();
router.use(bodyParser.json);

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

//Signup Endpoint
router.post("/signup", (req, res, next) => {
  UserSchema.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful" });
        });
      }
    }
  );
});

//Login Endpoint
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ success: true, status: "You're successfully logged in" });
});

//Logout Endpoint
router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
});

module.exports = router;
