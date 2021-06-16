const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
  name: String,
  description: String,
  active: Boolean,
  date: { type: Date, default: Date.now },
});

const Role = mongoose.model("role", roleSchema);
module.exports = Role;
