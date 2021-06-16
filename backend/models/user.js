const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roleId: { type: mongoose.Schema.ObjectId, ref: "role" },
  active: Boolean,
  date: { type: Date, default: Date.now },
});

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this.id,
      name: this.name,
      email: this.email,
      roleId: this.roleId,
      iat: moment().unix(),
    },
    process.env.SECRET_KEY_JWT
  );
};

const User = mongoose.model("user", userSchema);
module.exports = User;
