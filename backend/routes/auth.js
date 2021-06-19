const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = require("./product");

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(401).send("Failed Process: Incorrect email or Password");

  const hash = await bcrypt.compare(req.body.password, user.password);
  if (!hash || !user.active)
    return res.status(401).send("Failed Process: Incorrect email or Password");

  try {
    const jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (err) {
    return res.status(401).send("Login Error");
  }
});

module.exports = router;