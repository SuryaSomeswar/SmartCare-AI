import { useEffect, useState } from "react";
import axios from "axios";
import {
  Link,
  Navigate,
} from "react-router-dom";

import DashboardCards from "../components/DashboardCards";
import RecentAppointments from "../components/RecentAppointments";

import {
  FaUserMd,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";

function Admin() {
  const [doctorCount, setDoctorCount] =
    useState(0);

  const [appointmentCount,
    setAppointmentCount] =
    useState(0);

  const [userCount, setUserCount] =
    useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const doctors =
        await axios.get(
          "https://smartcare-ai.onrender.com/api/doctors"
        );

      const appointments =
        await axios.get(
          "https://smartcare-ai.onrender.com/api/appointments"
        );

      const users =
        await axios.get(
          "https://smartcare-ai.onrender.com/api/users"
        );

      setDoctorCount(
        doctors.data.length
      );

      setAppointmentCount(
        appointments.data.length
      );

      setUserCount(
        users.data.length
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (
    localStorage.getItem("staff") !==
    "true"
  ) {
    return <Navigate to="/home" />;
  }

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <button
        onClick={() => {
          localStorage.removeItem(
            "token"
          );
          localStorage.removeItem(
            "staff"
          );
          window.location.href = "/";
        }}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "#374151",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        🚪 Logout
      </button>

      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        🏥 Admin Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <DashboardCards
          title="Doctors"
          value={doctorCount}
          icon={<FaUserMd />}
        />

        <DashboardCards
          title="Appointments"
          value={appointmentCount}
          icon={<FaCalendarAlt />}
        />

        <DashboardCards
          title="Users"
          value={userCount}
          icon={<FaUsers />}
        />
      </div>

      <RecentAppointments />

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "40px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/add-doctor">
          <button
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            ➕ Add Doctor
          </button>
        </Link>

        <Link to="/doctors">
          <button
            style={{
              background: "#f59e0b",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            ✏️ Edit Doctors
          </button>
        </Link>

        <Link to="/doctors">
          <button
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            🗑️ Delete Doctors
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Admin;


