const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  active: Boolean,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  date: { type: Date, default: Date.now },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
