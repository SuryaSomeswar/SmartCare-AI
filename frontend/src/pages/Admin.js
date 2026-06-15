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

  const [successMessage,
    setSuccessMessage] =
    useState("");

  const [errorMessage,
    setErrorMessage] =
    useState("");

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

      setErrorMessage(
        "❌ Failed to load dashboard data"
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
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
        background:
          "linear-gradient(135deg,#fdf2f8,#faf5ff)",
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
          background:
            "linear-gradient(135deg,#ec4899,#8b5cf6)",
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
          marginBottom: "10px",
          color: "#8b5cf6",
          fontSize: "42px",
          fontWeight: "700",
        }}
      >
        🏥 Admin Dashboard
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
          fontSize: "16px",
        }}
      >
        Manage doctors, appointments and
        users from one central dashboard.
      </p>

      {successMessage && (
        <div
          style={{
            background: "#dcfce7",
            color: "#166534",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "15px",
            fontWeight: "bold",
          }}
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: "12px",
            borderRadius: "10px",
            marginBottom: "15px",
            fontWeight: "bold",
          }}
        >
          {errorMessage}
        </div>
      )}

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
              background:
                "linear-gradient(135deg,#ec4899,#8b5cf6)",
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
              background:
                "linear-gradient(135deg,#8b5cf6,#6366f1)",
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
              background:
                "linear-gradient(135deg,#ef4444,#ec4899)",
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


