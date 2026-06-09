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

useEffect(() => {
fetchStats();
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

return (
<div
style={{
minHeight: "100vh",
background: "#f8fafc",
}}
>
<nav
style={{
background: "white",
padding: "20px 40px",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
flexWrap: "wrap",
}}
>
<h2
style={{
color: "#2563eb",
margin: 0,
}}
>
🏥 SmartCare AI </h2>

    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <a href="/doctors">
        <button
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Book Appointment
        </button>
      </a>

      <a href="/feedback">
        <button
          style={{
            background: "#ec4899",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Feedback
        </button>
      </a>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("staff");
          window.location.href = "/";
        }}
        style={{
          background: "#dc2626",
          color: "white",
          border: "none",
          padding: "10px 18px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
          Logout
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
        color: "#0f172a",
        marginBottom: "20px",
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
        background: "white",
        padding: "30px",
        borderRadius: "18px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <h1>{stats.doctors}</h1>
      <p>Doctors Available</p>
    </div>

    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "18px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <h1>{stats.users}</h1>
      <p>Registered Patients</p>
    </div>

    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "18px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,0.08)",
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
    <h2
      style={{
        textAlign: "center",
        marginBottom: "40px",
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
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow:
            "0 5px 15px rgba(0,0,0,0.08)",
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
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow:
            "0 5px 15px rgba(0,0,0,0.08)",
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
          background: "white",
          padding: "25px",
          borderRadius: "16px",
          boxShadow:
            "0 5px 15px rgba(0,0,0,0.08)",
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
      

      <Footer />
    </BrowserRouter>
  );
}

export default App;
