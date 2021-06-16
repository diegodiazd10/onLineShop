const express = require("express");
const router = express.Router();
const Role = require("../models/role");
const User = require("../models/user");

router.post("/registerRole", async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(401).send("Process Failed: Incomplete Data");

  const roleExists = await Role.findOne({ name: req.body.name });
  if (roleExists) return res.status(401).send("Role Already Exists");

  const role = new Role({
    name: req.body.name,
    description: req.body.description,
    active: true,
  });

  const result = await role.save();
  if (!result) return res.status(401).send();
  return res.status(401).send({ result });
});

router.get("/listRole/", async (req, res) => {
  const role = await Role.find();
  if (!role) return res.status(401).send("Process Failed: No Roles Found");
  return res.status(200).send({ role });
});

module.exports = router;
