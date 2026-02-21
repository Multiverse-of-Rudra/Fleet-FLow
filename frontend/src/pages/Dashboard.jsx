import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeVehicles: 0,
    inShop: 0,
    available: 0,
    totalTrips: 0
  });

  useEffect(() => {
    const fetchStats = () => {
      axios
        .get("http://localhost:5000/api/stats")
        .then((res) => setStats(res.data))
        .catch((err) => console.log(err));
    };

    fetchStats();
    const interval = setInterval(fetchStats, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "white",
        fontFamily: "Arial"
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>
        🚛 FleetFlow Dashboard
      </h1>

      {/* KPI CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >
        <Card title="Total Vehicles" value={stats.totalVehicles} color="#3b82f6" />
        <Card title="Active Vehicles" value={stats.activeVehicles} color="#f59e0b" />
        <Card title="In Maintenance" value={stats.inShop} color="#ef4444" />
        <Card title="Available Vehicles" value={stats.available} color="#22c55e" />
        <Card title="Total Trips" value={stats.totalTrips} color="#8b5cf6" />
      </div>

      {/* ANALYTICS SECTION */}
      <div
        style={{
          marginTop: "60px",
          background: "#1e293b",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          📊 Operational Analytics
        </h2>

        <p style={{ opacity: 0.8 }}>
          Fleet efficiency is calculated dynamically using:
        </p>

        <div
          style={{
            marginTop: "15px",
            background: "#0f172a",
            padding: "12px",
            borderRadius: "8px",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Distance Travelled / Fuel Used
        </div>

        <p style={{ marginTop: "15px", opacity: 0.7 }}>
          Real-time performance monitoring helps optimize fleet utilization and reduce operational costs.
        </p>
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        backgroundColor: color,
        padding: "20px",
        borderRadius: "14px",
        boxShadow: "0 12px 25px rgba(0,0,0,0.3)",
        transition: "0.3s",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>{value}</h1>
      <p style={{ fontSize: "12px", opacity: 0.8 }}>Real-time data</p>
    </div>
  );
}

export default Dashboard;