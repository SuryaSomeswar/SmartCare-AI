import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        padding: "40px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            color: "#2563eb",
          }}
        >
          🏥 Smart Hospital
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#555",
          }}
        >
          Fast, Secure & Easy Healthcare Management
        </p>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          🚪 Logout
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          flexWrap: "wrap",
        }}
      >
        <a href="/doctors">
          <button
            style={{
              padding: "15px 25px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            👨‍⚕️ View Doctors
          </button>
        </a>

        <a href="/history">
          <button
            style={{
              padding: "15px 25px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            📋 Appointment History
          </button>
        </a>

        <a href="/admin">
          <button
            style={{
              padding: "15px 25px",
              background: "#f59e0b",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            ⚙️ Admin Dashboard
          </button>
        </a>
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
            width: "250px",
            textAlign: "center",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>👨‍⚕️ Doctors</h2>
          <p>
            View specialists and available
            slots.
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            width: "250px",
            textAlign: "center",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>📅 Appointments</h2>
          <p>
            Book and manage appointments
            easily.
          </p>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            width: "250px",
            textAlign: "center",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2>🔒 Secure Access</h2>
          <p>
            Login and manage your healthcare
            securely.
          </p>
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
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-doctor"
          element={
            <ProtectedRoute>
              <AddDoctor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-doctor/:id"
          element={
            <ProtectedRoute>
              <EditDoctor />
            </ProtectedRoute>
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