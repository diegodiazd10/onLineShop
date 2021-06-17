const express = require("express");
const Category = require("../models/category");
const router = express.Router();
const Product = require("../models/product");

router.post("/registerProduct", async (req, res) => {
  if (!req.body.name || !req.body.price)
    return res.status(401).send("Process Failed: Incomplete Data");
  const prodExists = await Product.findOne({ name: req.body.name });
  if (prodExists) return res.status(401).send("The Product Already exists");

  const category = await Category.findOne({ name: "Groceries" });
  if (!category) return res.status(401).send("Process Failed: No Category");

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    active: true,
    categoryId: category._id,
  });

  const result = await product.save();
  if (!result)
    return res.status(401).send("Process Failed: can't save Product");
  res.status(200).send({ result });
});

router.get("/listProduct/:name?", async (req, res) => {
  const products = await Product.find({
    name: new RegExp(req.params["name"], "i"),
  })
    .populate("categoryId")
    .exec();
  if (!products)
    return res.status(401).send("Process failed: Products not found");
  res.status(200).send({ products });
});

router.put("/updateProduct", async (req,res) => {
    if(
        !req.body._id ||
        !req.body.name ||
        !req.body.price ||
        !req.body.active ||
        !req.body.categoryId
    ) return res.status(401).send("Failed process: Incomplet data")
    const product = await Product.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        price: req.body.price,
        active: req.body.active,
        categoryId: req.body.categoryId,
    });
    if(!product) return res.status(401).send("Process Failed: Error editing Product");
    res.status(401).send({ product })
})

module.exports = router;
