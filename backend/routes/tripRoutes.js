const router = require("express").Router();
const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");
const Trip = require("../models/Trip");

router.post("/", async (req, res) => {
  const { vehicleId, driverId, cargoWeight, distance, fuelUsed } = req.body;

  const vehicle = await Vehicle.findById(vehicleId);
  const driver = await Driver.findById(driverId);

  if (cargoWeight > vehicle.maxCapacity) {
    return res.status(400).json({ message: "Over capacity!" });
  }

  if (new Date(driver.licenseExpiry) < new Date()) {
    return res.status(400).json({ message: "License expired!" });
  }


  if (vehicle.status !== "Available" || driver.status !== "Available") {
    return res.status(400).json({ message: "Not Available!" });
  }

  const trip = await Trip.create({
    vehicle: vehicleId,
    driver: driverId,
    cargoWeight,
    distance,
    fuelUsed
  });

  router.put("/complete/:id", async (req, res) => {
  const trip = await Trip.findById(req.params.id);

  if (!trip) return res.status(404).json({ message: "Trip not found" });

  const vehicle = await Vehicle.findById(trip.vehicle);
  const driver = await Driver.findById(trip.driver);

  vehicle.status = "available";
  driver.status = "available";

  await vehicle.save();
  await driver.save();

  trip.status = "completed";
  await trip.save();

  res.json({ message: "Trip completed successfully" });
});
  vehicle.status = "on_trip";
  driver.status = "on_trip";

  vehicle.distanceTravelled += distance;
  vehicle.fuelUsed += fuelUsed;

  await vehicle.save();
  await driver.save();

  res.json(trip);
});

module.exports = router;