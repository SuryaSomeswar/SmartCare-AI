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

  const markCompleted = async (id) => {
    await axios.put(
      `http://localhost:5000/api/appointments/${id}`,
      {
        status: "Completed",
      }
    );

    fetchAppointments();
  };

  const markNoShow = async (id) => {
    await axios.put(
      `http://localhost:5000/api/appointments/${id}`,
      {
        status: "No Show",
      }
    );

    fetchAppointments();
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
      <h2>
        📋 Recent Appointments
      </h2>

      {appointments.length === 0 ? (
        <p>No Appointments Found</p>
      ) : (
        appointments.map(
          (appointment) => (
            <div
              key={appointment._id}
              style={{
                borderBottom:
                  "1px solid #eee",
                padding: "15px 0",
              }}
            >
              <strong>
                {
                  appointment.patientName
                }
              </strong>

              <p>
                Doctor:
                {" "}
                {
                  appointment.doctorName
                }
              </p>

              <p>
                Date:
                {" "}
                {appointment.date}
              </p>

              <p>
                Time:
                {" "}
                {appointment.time}
              </p>

              <p>
                Status:
                {" "}
                <strong>
                  {
                    appointment.status
                  }
                </strong>
              </p>

              <button
                onClick={() =>
                  markCompleted(
                    appointment._id
                  )
                }
                style={{
                  marginRight:
                    "10px",
                  background:
                    "#16a34a",
                  color: "white",
                  border: "none",
                  padding:
                    "8px 12px",
                  borderRadius:
                    "6px",
                  cursor:
                    "pointer",
                }}
              >
                ✅ Completed
              </button>

              <button
                onClick={() =>
                  markNoShow(
                    appointment._id
                  )
                }
                style={{
                  background:
                    "#dc2626",
                  color: "white",
                  border: "none",
                  padding:
                    "8px 12px",
                  borderRadius:
                    "6px",
                  cursor:
                    "pointer",
                }}
              >
                ❌ No Show
              </button>
            </div>
          )
        )
      )}
    </div>
  );
}

export default RecentAppointments;