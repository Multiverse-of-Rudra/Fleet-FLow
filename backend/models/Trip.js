const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  cargoWeight: Number,
  distance: Number,
  fuelUsed: Number,
  status: { type: String, default: "Dispatched" }
});

module.exports = mongoose.model("Trip", tripSchema);