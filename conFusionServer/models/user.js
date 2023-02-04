import mongoose from "mongoose";
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
  firstname: {
    type:String,
    default: ''
  },
  lastname: {
    type:String,
    default: ''
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

//Will automatically add username and password, will salt and hash the password
User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
