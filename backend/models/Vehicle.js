const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  name: String,
  maxCapacity: Number,
  status: { type: String, default: "Available" },
  fuelUsed: { type: Number, default: 0 },
  distanceTravelled: { type: Number, default: 0 }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);