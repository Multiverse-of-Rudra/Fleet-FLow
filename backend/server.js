const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("ENV VALUE:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/drivers", require("./routes/driverRoutes"));
app.use("/api/trips", require("./routes/tripRoutes"));
app.use("/api/maintenance", require("./routes/maintenanceRoutes"));
app.use("/api/stats", require("./routes/statsRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));