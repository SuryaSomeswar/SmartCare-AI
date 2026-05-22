import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DashboardCards from "../components/DashboardCards";
import {
  FaUserMd,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";
import RecentAppointments from "../components/RecentAppointments";

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
          "http://localhost:5000/api/doctors"
        );

      const appointments =
        await axios.get(
          "http://localhost:5000/api/appointments"
        );

      const users =
        await axios.get(
          "http://localhost:5000/api/users"
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

  return (
    <div
      style={{
        padding: "30px",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
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
              boxShadow:
                "0 4px 12px rgba(37,99,235,0.3)",
            }}
          >
            ➕ Add Doctor
          </button>
        </Link>

        <Link to="/history">
          <button
            style={{
              background: "#16a34a",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow:
                "0 4px 12px rgba(22,163,74,0.3)",
            }}
          >
            📋 View Appointments
          </button>
        </Link>

        <Link to="/users">
          <button
            style={{
              background:
                "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow:
                "0 4px 12px rgba(124,58,237,0.3)",
            }}
          >
            👥 View Users
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Admin;