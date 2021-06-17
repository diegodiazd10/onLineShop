const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.post("/registerCategory", async (req, res) => {
  if (!req.body.name)
    return res.status(401).send("Process failed: Incomplete Data");
  const catExists = await Category.findOne({ name: req.body.name });
  if (catExists)
    return res.status(401).send("Process Failed: Category Already Exists");

  const category = new Category({
    name: req.body.name,
    active: true,
  });

  const result = await category.save();
  if (!result)
    return res.status(401).send("Process Failed: category cant save");
  return res.status(200).send({ result });
});

router.get("/listCategory", async (req, res) => {
    const category = await Category.find();
    if(!category) return res.status(401).send("Categories not Found");
    res.status(200).send({category})
})

module.exports = router;
