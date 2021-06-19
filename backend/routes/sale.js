const express = require("express");
const router = express.Router();
const Sale = require("../models/sale");
const Auth = require("../middleware/auth");
const Product = require("../models/product");

router.post("/registerSale", Auth, async (req, res) => {
  if (!req.body.products || !req.body.total)
    return res.status(401).send("Process Failed: Incomplete data");

  const product = await Product.findOne({ _id: req.body.products });
  if (!product)
    return res.status(401).send("Failed Process: product Don't exists");

  const sale = new Sale({
    products: req.body.products,
    total: req.body.total,
  });

    const result = await sale.save();
    if (!result) return res.status(401).send("Cant Register the Sale");
    res.status(200).send({ result });
});

module.exports = router;
