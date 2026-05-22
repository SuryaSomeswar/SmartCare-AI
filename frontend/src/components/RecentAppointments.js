import { useEffect, useState } from "react";
import axios from "axios";

function RecentAppointments() {
  const [appointments, setAppointments] =
    useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/appointments"
      );

      setAppointments(
        res.data.slice(-5).reverse()
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        marginTop: "30px",
        borderRadius: "12px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2>📋 Recent Appointments</h2>

      {appointments.length === 0 ? (
        <p>No Appointments Found</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment._id}
            style={{
              borderBottom:
                "1px solid #eee",
              padding: "10px 0",
            }}
          >
            <strong>
              {appointment.patientName}
            </strong>

            <p>
              Doctor:{" "}
              {appointment.doctorName}
            </p>

            <p>
              Date: {appointment.date}
            </p>

            <p>
              Time: {appointment.time}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentAppointments;