import { BrowserRouter, Routes, Route } from "react-router-dom";
import StaffRoute from "./components/StaffRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import AppointmentHistory from "./pages/AppointmentHistory";
import Admin from "./pages/Admin";
import AddDoctor from "./pages/AddDoctor";
import Users from "./pages/Users";
import EditDoctor from "./pages/EditDoctor";
import Feedback from "./pages/Feedback";
import AddReview from "./pages/AddReview";
import AIHealthAssistant from "./pages/AIHealthAssistant";
import { useEffect, useState } from "react";
import axios from "axios";

import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function Home() {
const [stats, setStats] = useState({
doctors: 0,
users: 0,
appointments: 0,
});
const [myAppointments, setMyAppointments] =
  useState([]);
  const [successMessage,
setSuccessMessage] =
useState("");

const [errorMessage,
setErrorMessage] =
useState("");

useEffect(() => {
  fetchStats();
  fetchMyAppointments();
}, []);

const fetchStats = async () => {
try {
const doctors = await axios.get(
"https://smartcare-ai.onrender.com/api/doctors"
);

  const users = await axios.get(
    "https://smartcare-ai.onrender.com/api/users"
  );

  const appointments = await axios.get(
    "https://smartcare-ai.onrender.com/api/appointments"
  );

  setStats({
    doctors: doctors.data.length,
    users: users.data.length,
    appointments: appointments.data.length,
  });
} catch (error) {
  console.log(error);
}


};
  const fetchMyAppointments = async () => {
  try {
    const res = await axios.get(
      "https://smartcare-ai.onrender.com/api/appointments"
    );

    const userEmail =
      localStorage.getItem("email");

    setMyAppointments(
      res.data.filter(
        (appointment) =>
          appointment.email === userEmail
      )
    );
  } catch (error) {
    console.log(error);
  }
};
  const cancelAppointment = async (id) => {
  try {
    await axios.delete(
      `https://smartcare-ai.onrender.com/api/appointments/${id}`
    );

    setSuccessMessage(
      "✅ Appointment Cancelled Successfully"
    );

    fetchMyAppointments();

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  } catch (error) {
    console.log(error);

    setErrorMessage(
      "❌ Failed To Cancel Appointment"
    );

    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }
};

return (
<div
style={{
minHeight: "100vh",
background:
"linear-gradient(135deg,#fdf2f8,#faf5ff)",
}}
>
<nav
style={{
background: "rgba(255,255,255,0.9)",
backdropFilter: "blur(12px)",
padding: "20px 40px",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
boxShadow:
"0 10px 30px rgba(139,92,246,0.15)",
flexWrap: "wrap",
}}
>
<h2
style={{
color: "#8b5cf6",
margin: 0,
fontWeight: "bold",
}}
>
🏥 SmartCare AI </h2>

  <div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
  }}
>
  <a href="/doctors">
    <button
      style={{
        background:
          "linear-gradient(135deg,#ec4899,#8b5cf6)",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      📅 Book Appointment
    </button>
  </a>

  <a href="/feedback">
    <button
      style={{
        background:
          "linear-gradient(135deg,#8b5cf6,#6366f1)",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      💬 Feedback
    </button>
  </a>

  <a href="/ai-health">
    <button
      style={{
        background:
          "linear-gradient(135deg,#ec4899,#8b5cf6)",
        color: "white",
        border: "none",
        padding: "10px 18px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      🤖 AI Assistant
    </button>
  </a>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("staff");
      window.location.href = "/";
    }}
    style={{
      background:
        "linear-gradient(135deg,#ef4444,#ec4899)",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    🚪 Logout
  </button>
</div> 
  </nav>

  <div
    style={{
      textAlign: "center",
      padding: "80px 20px 40px",
    }}
  >
    <h1
      style={{
        fontSize: "clamp(40px,7vw,70px)",
        color: "#8b5cf6",
        marginBottom: "20px",
        fontWeight: "800",
      }}
    >
      Healthcare Made
      <br />
      Simple & Smart
    </h1>

    <p
      style={{
        color: "#64748b",
        fontSize: "20px",
        maxWidth: "700px",
        margin: "auto",
        lineHeight: "1.8",
      }}
    >
      Book appointments, manage records,
      connect with doctors and use AI-powered
      healthcare assistance in one platform.
    </p>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(250px,1fr))",
      gap: "20px",
      padding: "20px 40px",
    }}
  >
    <div
      style={{
        background:
          "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        padding: "30px",
        borderRadius: "20px",
        border:
          "1px solid rgba(255,255,255,0.4)",
        boxShadow:
          "0 10px 30px rgba(139,92,246,0.15)",
        textAlign: "center",
      }}
    >
      <h1>{stats.doctors}</h1>
      <p>Doctors Available</p>
    </div>

    <div
      style={{
        background:
          "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        padding: "30px",
        borderRadius: "20px",
        border:
          "1px solid rgba(255,255,255,0.4)",
        boxShadow:
          "0 10px 30px rgba(139,92,246,0.15)",
        textAlign: "center",
      }}
    >
      <h1>{stats.users}</h1>
      <p>Registered Patients</p>
    </div>

    <div
      style={{
        background:
          "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        padding: "30px",
        borderRadius: "20px",
        border:
          "1px solid rgba(255,255,255,0.4)",
        boxShadow:
          "0 10px 30px rgba(139,92,246,0.15)",
        textAlign: "center",
      }}
    >
      <h1>{stats.appointments}</h1>
      <p>Total Appointments</p>
    </div>
  </div>

  <div
    style={{
      padding: "60px 40px",
    }}
  >
      <div
  style={{
    maxWidth: "1200px",
    margin: "40px auto",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(12px)",
    padding: "30px",
    borderRadius: "20px",
    boxShadow:
      "0 10px 30px rgba(139,92,246,0.15)",
  }}
>
  <h2
    style={{
      color: "#8b5cf6",
      marginBottom: "20px",
    }}
  >
    📋 My Appointments
  </h2>
{successMessage && (
  <div
    style={{
      background:"#dcfce7",
      color:"#166534",
      padding:"12px",
      borderRadius:"10px",
      marginBottom:"15px",
      fontWeight:"bold",
    }}
  >
    {successMessage}
  </div>
)}

{errorMessage && (
  <div
    style={{
      background:"#fee2e2",
      color:"#991b1b",
      padding:"12px",
      borderRadius:"10px",
      marginBottom:"15px",
      fontWeight:"bold",
    }}
  >
    {errorMessage}
  </div>
)}

  {myAppointments.length === 0 ? (
    <p>No Appointments Found</p>
  ) : (
    myAppointments.map(
      (appointment) => (
        <div
          key={appointment._id}
          style={{
            padding: "15px",
            borderBottom:
              "1px solid #e5e7eb",
          }}
        >
          <h3>
            👨‍⚕️ {appointment.doctorName}
          </h3>

          <p>
            📅 {appointment.date}
          </p>

          <p>
            🕒 {appointment.time}
          </p>

          <p>
  Status:{" "}
  <strong>
    {appointment.status}
  </strong>
</p>

{appointment.status !==
  "Cancelled" && (
  <button
    onClick={() =>
      cancelAppointment(
        appointment._id
      )
    }
    style={{
      background:
        "linear-gradient(135deg,#ef4444,#ec4899)",
      color: "white",
      border: "none",
      padding: "10px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "10px",
    }}
  >
    🚫 Cancel Appointment
  </button>
)}
        </div>
      )
    )
  )}
</div>
    <h2
      style={{
        textAlign: "center",
        marginBottom: "40px",
        color: "#8b5cf6",
        fontSize: "36px",
      }}
    >
      Why Choose SmartCare AI?
    </h2>
      

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(280px,1fr))",
        gap: "20px",
      }}
    >
      <div
        style={{
          background:
            "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          padding: "25px",
          borderRadius: "20px",
          border:
            "1px solid rgba(255,255,255,0.4)",
          boxShadow:
            "0 10px 30px rgba(139,92,246,0.15)",
        }}
      >
        <h3>🤖 AI Health Assistant</h3>
        <p>
          Get doctor recommendations
          based on symptoms.
        </p>
      </div>

      <div
        style={{
          background:
            "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          padding: "25px",
          borderRadius: "20px",
          border:
            "1px solid rgba(255,255,255,0.4)",
          boxShadow:
            "0 10px 30px rgba(139,92,246,0.15)",
        }}
      >
        <h3>📅 Easy Appointment Booking</h3>
        <p>
          Book appointments instantly
          with available specialists.
        </p>
      </div>

      <div
        style={{
          background:
            "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          padding: "25px",
          borderRadius: "20px",
          border:
            "1px solid rgba(255,255,255,0.4)",
          boxShadow:
            "0 10px 30px rgba(139,92,246,0.15)",
        }}
      >
        <h3>🔒 Secure Records</h3>
        <p>
          Your healthcare information
          remains protected.
        </p>
      </div>
    </div>
  </div>
</div>

);
}



function App() {
  return (
    <BrowserRouter>
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div style={{ flex: 1 }}>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <AppointmentHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <StaffRoute>
              <Admin />
            </StaffRoute>
          }
        />

        <Route
          path="/add-doctor"
          element={
            <StaffRoute>
              <AddDoctor />
            </StaffRoute>
          }
        />

        <Route
          path="/users"
          element={
            <StaffRoute>
              <Users />
            </StaffRoute>
          }
        />

        <Route
          path="/edit-doctor/:id"
          element={
            <StaffRoute>
              <EditDoctor />
            </StaffRoute>
          }
        />

        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />

        <Route
          path="/review/:id"
          element={
            <ProtectedRoute>
              <AddReview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-health"
          element={
            <ProtectedRoute>
              <AIHealthAssistant />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>

    <Footer />
  </div>
</BrowserRouter>
    
  );
}

export default App;
