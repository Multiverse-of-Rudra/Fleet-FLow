const router = require("express").Router();
const Vehicle = require("../models/Vehicle");


router.post("/", async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: "Error creating vehicle" });
  }
});


router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching vehicles" });
  }
});

  router.get("/", async (req, res) => {
  const vehicles = await Vehicle.find();

  const enhanced = vehicles.map(v => ({
    ...v.toObject(),
    efficiency: v.fuelUsed > 0 ? (v.distanceTravelled / v.fuelUsed).toFixed(2) : 0
  }));

  res.json(enhanced);
});

router.get("/analytics", async (req, res) => {
  const vehicles = await Vehicle.find();

  const totalDistance = vehicles.reduce((acc, v) => acc + v.distanceTravelled, 0);
  const totalFuel = vehicles.reduce((acc, v) => acc + v.fuelUsed, 0);

  const avgEfficiency = totalFuel > 0 ? totalDistance / totalFuel : 0;

  res.json({ totalDistance, avgEfficiency });
});

router.put("/:id", async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedVehicle);
  } catch (err) {
    res.status(500).json({ message: "Error updating vehicle" });
  }
});

module.exports = router;