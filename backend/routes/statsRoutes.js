const router = require("express").Router();
const Vehicle = require("../models/Vehicle");
const Trip = require("../models/Trip");

router.get("/", async (req, res) => {
  try {
    const totalVehicles = await Vehicle.countDocuments();
    const activeVehicles = await Vehicle.countDocuments({ status: "on_trip" });
    const inShop = await Vehicle.countDocuments({ status: "in_shop" });
    const available = await Vehicle.countDocuments({ status: "Available" });
    const totalTrips = await Trip.countDocuments();

    res.json({
      totalVehicles,
      activeVehicles,
      inShop,
      available,
      totalTrips
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

module.exports = router;