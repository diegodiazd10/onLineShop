const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  active: Boolean,
  date: { type: Date, default: Date.now },
});

const Category = mongoose.model("category", categorySchema);
module.exports = Category;