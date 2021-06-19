const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
    products: { type:mongoose.Schema.ObjectId, ref:"product"},
    total: Number,
    date: {type: Date, default: Date.now},
})

const Sale = mongoose.model("sale", saleSchema);
module.exports = Sale;