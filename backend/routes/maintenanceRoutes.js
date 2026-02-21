const router = require("express").Router();
const Vehicle = require("../models/Vehicle");

router.post("/", async (req, res) => {
  const { vehicleId } = req.body;

  const vehicle = await Vehicle.findById(vehicleId);
  vehicle.status = "in_shop";
  await vehicle.save();

  res.json({ message: "Vehicle sent to maintenance" });
});

module.exports = router;