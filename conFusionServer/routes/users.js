import express from "express";
const bodyParser = require("body-parser");
import UserSchema from "../models/user";
import passport, { authenticate } from "passport";
import authenticate from "../authenticate";
const cors = require("./cors");

var router = express.Router();
router.use(bodyParser.json);

//Forbids Ordinary users from performing operations
router.route("/users").get(verifyAdmin, usersController.index);

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
        if (req.body.firstname) user.firstname = req.body.firstname;
        if (req.body.lastname) user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
          }
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ success: true, status: "Registration Successful" });
          });
        });
      }
    }
  );
});

//Login Endpoint
router.post("/login", passport.authenticate("local"), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "You're successfully logged in",
  });
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
