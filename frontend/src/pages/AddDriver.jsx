import React, { useState } from "react";
import axios from "axios";

function AddDriver() {
  const [form, setForm] = useState({
    name: "",
    licenseExpiry: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/drivers", form);
      setMessage("✅ Driver added successfully!");
      setForm({ name: "", licenseExpiry: "" });
    } catch (err) {
      setMessage("❌ Error adding driver");
    }
  };

  return (
    <div style={{
      padding: "40px",
      background: "#1f2937",
      minHeight: "100vh",
      color: "white"
    }}>
      <h2>Add New Driver</h2>

      <form onSubmit={handleSubmit} style={{
        display: "grid",
        gap: "15px",
        maxWidth: "400px",
        marginTop: "20px"
      }}>
        <input
          type="text"
          name="name"
          placeholder="Driver Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="licenseExpiry"
          value={form.licenseExpiry}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "6px"
          }}
        >
          Add Driver
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "20px" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default AddDriver;