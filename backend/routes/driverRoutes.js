const router = require("express").Router();
const Driver = require("../models/Driver");


router.post("/", async (req, res) => {
  try {
    const driver = await Driver.create(req.body);
    res.status(201).json(driver);
  } catch (err) {
    res.status(500).json({ message: "Error creating driver" });
  }
});

router.get("/", async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching drivers" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDriver);
  } catch (err) {
    res.status(500).json({ message: "Error updating driver" });
  }
});

module.exports = router;