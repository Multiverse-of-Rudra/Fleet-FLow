import React, { useEffect, useState } from "react";
import axios from "axios";

function TripForm() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const [suggested, setSuggested] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/vehicles")
      .then(res => setVehicles(res.data));

    axios.get("http://localhost:5000/api/drivers")
      .then(res => setDrivers(res.data));
  }, []);

  useEffect(() => {
  const fetchData = () => {
    axios.get("http://localhost:5000/api/vehicles")
      .then(res => setVehicles(res.data));

    axios.get("http://localhost:5000/api/drivers")
      .then(res => setDrivers(res.data));
  };

  fetchData();
  const interval = setInterval(fetchData, 3000);

  return () => clearInterval(interval);
}, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "cargoWeight") {
      const weight = e.target.value;
      const available = vehicles.filter(
        v => v.status === "available" && v.maxCapacity >= weight
      );
      setSuggested(available[0] || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/trips", form);
      setMessage("✅ Trip Created Successfully!");
    } catch (err) {
      setMessage("❌ " + err.response.data.message);
    }
  };

  return (
    <div style={{
      padding: "40px",
      background: "#1f2937",
      minHeight: "100vh",
      color: "white"
    }}>
      <h2>Create Trip</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px", maxWidth: "400px" }}>
        <select name="vehicleId" onChange={handleChange} required>
          <option value="">Select Vehicle</option>
          {vehicles.map(v => (
            <option key={v._id} value={v._id}>{v.name} ({v.status})</option>
          ))}
        </select>

        <select name="driverId" onChange={handleChange} required>
          <option value="">Select Driver</option>
          {drivers.map(d => (
            <option key={d._id} value={d._id}>{d.name} ({d.status})</option>
          ))}
        </select>

        <input type="number" name="cargoWeight" placeholder="Cargo Weight" onChange={handleChange} required />
        <input type="number" name="distance" placeholder="Distance" onChange={handleChange} required />
        <input type="number" name="fuelUsed" placeholder="Fuel Used" onChange={handleChange} required />

        <button type="submit" style={{
          padding: "10px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "6px"
        }}>
          Dispatch Trip
        </button>
      </form>

      {suggested && (
        <div style={{ marginTop: "20px", background: "#065f46", padding: "10px", borderRadius: "8px" }}>
          🧠 Suggested Vehicle: {suggested.name}
        </div>
      )}

      {message && <p style={{ marginTop: "20px" }}>{message}</p>}
    </div>
  );
}

export default TripForm;