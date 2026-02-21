import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import TripForm from "./pages/Tripform";
import AddDriver from "./pages/AddDriver";

function App() {
  const [page, setPage] = useState("dashboard");

  const navButton = {
    marginLeft: "15px",
    padding: "8px 16px",
    background: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  };

  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#0f172a",
        color: "white"
      }}>
        <div style={{ fontWeight: "bold" }}>🚛 FleetFlow</div>
        <div>
          <button style={navButton} onClick={() => setPage("dashboard")}>Dashboard</button>
          <button style={navButton} onClick={() => setPage("trip")}>Create Trip</button>
          <button style={navButton} onClick={() => setPage("driver")}>
  Add Driver
</button>
        </div>
      </div>

      {page === "dashboard" && <Dashboard />}
      {page === "trip" && <TripForm />}
      {page === "driver" && <AddDriver />}

    </>
  );
}

export default App;