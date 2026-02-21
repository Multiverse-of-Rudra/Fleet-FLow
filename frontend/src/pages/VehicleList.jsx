import React, { useEffect, useState } from "react";
import axios from "axios";

function VehicleList() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/vehicles")
      .then(res => setVehicles(res.data));
  }, []);

  const getColor = (status) => {
    if (status === "available") return "#22c55e";
    if (status === "on_trip") return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2>Fleet Overview</h2>
      {vehicles.map(v => (
        <div key={v._id} style={{
          background: "#1e293b",
          marginTop: "10px",
          padding: "15px",
          borderRadius: "8px"
        }}>
          <strong>{v.name}</strong>
          <span style={{
            marginLeft: "10px",
            padding: "4px 8px",
            borderRadius: "6px",
            background: getColor(v.status)
          }}>
            {v.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default VehicleList;