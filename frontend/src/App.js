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

import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "20px",
        position: "relative",
      }}
    >
      <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("staff");
    window.location.href = "/";
  }}
  style={{
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  🚪 Logout
</button>

      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
          marginTop: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(32px, 6vw, 48px)",
            color: "#2563eb",
            marginBottom: "10px",
          }}
        >
          🏥 SmartCare AI
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 3vw, 20px)",
            color: "#555",
          }}
        >
          Intelligent Hospital Appointment &
          Healthcare Management System
        </p>
      </div>

      <div
        style={{
          marginTop: "60px",
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "280px",
            textAlign: "center",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>🤖 AI Assistant</h2>

          <p>
            Get department and doctor
            recommendations based on symptoms.
          </p>

          <a href="/ai-health">
            <button
              style={{
                background: "#8b5cf6",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Open Assistant
            </button>
          </a>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "280px",
            textAlign: "center",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>👨‍⚕️ Doctors</h2>

          <p>
            View specialists and available
            appointment slots.
          </p>

          <a href="/doctors">
            <button
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              View Doctors
            </button>
          </a>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "280px",
            textAlign: "center",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>📅 Appointments</h2>

          <p>
            Book and manage appointments
            easily online.
          </p>

          <a href="/history">
            <button
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              View History
            </button>
          </a>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "280px",
            textAlign: "center",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>📝 Feedback</h2>

          <p>
            Share your experience and help
            us improve our services.
          </p>

          <a href="/feedback">
            <button
              style={{
                background: "#ec4899",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Give Feedback
            </button>
          </a>
        </div>

       {localStorage.getItem("staff") ===
  "true" && (
  <div
    style={{
      background: "#fff",
      padding: "25px",
      borderRadius: "12px",
      width: "100%",
      maxWidth: "280px",
      textAlign: "center",
      boxShadow:
        "0 4px 12px rgba(0,0,0,0.1)",
    }}
  >
    <h2>🏥 Staff Portal</h2>

    <p>
      Manage doctors,
      appointments and users.
    </p>

    <a href="/admin">
      <button
        style={{
          background: "#f59e0b",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Open Dashboard
      </button>
    </a>
  </div>
)}

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
    localStorage.getItem("staff") === "true"
      ? <Admin />
      : <Home />
  }
/>

<Route
  path="/add-doctor"
  element={
    localStorage.getItem("staff") === "true"
      ? <AddDoctor />
      : <Home />
  }
/>

<Route
  path="/users"
  element={
    localStorage.getItem("staff") === "true"
      ? <Users />
      : <Home />
  }
/>

<Route
  path="/edit-doctor/:id"
  element={
    localStorage.getItem("staff") === "true"
      ? <EditDoctor />
      : <Home />
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