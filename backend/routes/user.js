const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");
const Role = require("../models/role");
const Auth = require("../middleware/auth")

router.post("/registerUser", async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(401).send("Process Failed: Incomplete Data");

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(401).send("Process Failed: User Already exist");

  const hash = await bcrypt.hash(req.body.password, 10);

  const role = await Role.findOne({ name: "user" });
  if (!role) return res.status(401).send("Process failed: No role was asigned");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: role.id,
    active: true,
  });

  try {
    const result = await user.save();
    if (!result) return res.status(401).send("Failed to register User");
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } catch (err) {
    return res.status(401).send("Failed to register User");
  }
});

router.get("/listUsers/:name?", Auth, async (req, res) => {
  const users = await User.find({ name: new RegExp(req.params["name"], "i") })
    .populate("roleId")
    .exec();
  if (!users) return res.status(401).send("No Users Found");
  return res.status(200).send({ users });
});

router.put("/updateUser", Auth, async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.roleId ||
    !req.body.active
  )
    return res.status(401).send("Process Failed: Imcomplete Data");
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
    password: hash,
    roleId: req.body.roleId, 
    active: req.body.active,       
    })

    if(!user) return res.status(401).send("Process Failed: Error editing User");
    return res.status(200).send({ user })
});

router.delete("/deleteUser/:_id", Auth, async (req, res) => {
    const validId = mongoose.Types.ObjectId.isValid(req.params._id);
    if(!validId) return res.status(401).send("Process failed: Invalid Id");

    const users = await User.findByIdAndDelete(req.params._id);
    if(!users) return res.status(401).send("Process Failed: Can't delete User");
    return res.status(200).send("User deleted");
})

router.put("/deleteUser", Auth, async (req, res) => {
    if(
        !req.body._id ||
        !req.body.name ||
        !req.body.email ||
        !req.body.password ||
        !req.body.roleId
    ) return res.status(401).send("Process Failed: Incomplete Data");

    const hash = await bcrypt.hash(req.body.password, 10)

    const user = await User.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        roleId: req.body.roleId,
        active: false,
    })

    if(!user) return res.status(401).send("Process failed: can't delete user");
    return res.status(401).send("User Deleted")
})

module.exports = router;
