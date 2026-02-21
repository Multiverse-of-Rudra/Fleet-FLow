const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: String,
  licenseExpiry: Date,
  status: { type: String, default: "Available" }
});

module.exports = mongoose.model("Driver", driverSchema);