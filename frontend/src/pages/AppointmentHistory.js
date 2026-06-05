import { useEffect, useState } from "react";
import axios from "axios";

function AppointmentHistory() {
  const [appointments, setAppointments] =
    useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "https://smartcare-ai.onrender.com/api/appointments"
      );

     const isStaff =
  localStorage.getItem("staff") === "true";

if (isStaff) {
  setAppointments(res.data);
} else {
  const userEmail =
    localStorage.getItem("email");

  setAppointments(
    res.data.filter(
      (appointment) =>
        appointment.email === userEmail
    )
  );
}
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAppointment = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) return;

    try {
      await axios.delete(
        `https://smartcare-ai.onrender.com/api/appointments/${id}`
      );

      alert(
        "Appointment Cancelled Successfully"
      );

      fetchAppointments();

    } catch (error) {
      console.log(error);
      alert("Failed to Cancel Appointment");
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
      <h1>📋 Appointment History</h1>

      {appointments.length === 0 ? (
        <p>No Appointments Found</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment._id}
            style={{
              background: "#fff",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{appointment.patientName}</h3>

            <p>
              <strong>Doctor:</strong>{" "}
              {appointment.doctorName}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {appointment.date}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {appointment.time}
            </p> 
<p>
  <strong>Status:</strong>{" "}
  <span
    style={{
      color:
        appointment.status === "Cancelled"
          ? "red"
          : appointment.status === "Completed"
          ? "green"
          : "orange",
      fontWeight: "bold",
    }}
  >
    {appointment.status}
  </span>
</p>

            {localStorage.getItem("staff") === "true" && (
  <button
    onClick={() =>
      cancelAppointment(
        appointment._id
      )
    }
    style={{
      background: "#dc2626",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "10px",
    }}
  >
    Cancel Appointment
  </button>
)}
          </div>
        ))
      )}
    </div>
  );
}

export default AppointmentHistory;
