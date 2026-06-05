import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
 

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");
const handleLogin = async () => {
  try {
    const res = await axios.post(
      "https://smartcare-ai.onrender.com/api/auth/login",
      {
        email: email.trim(),
        password: password.trim(),
      }
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "role",
      res.data.role
    );

    localStorage.setItem(
      "email",
      email.trim()
    );

    if (
      res.data.role === "staff"
    ) {
      localStorage.setItem(
        "staff",
        "true"
      );

      alert(
        "Staff Login Successful"
      );

      window.location.href =
        "/admin";
    } else {
      localStorage.removeItem(
        "staff"
      );

      alert(
        "Login Successful"
      );

      window.location.href =
        "/home";
    }

  } catch (error) {
    console.error(error);

    if (
      error.response?.data?.message
    ) {
      alert(
        error.response.data.message
      );
    } else {
      alert("Login Failed");
    }
  }
};

 return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f7fb",
      padding: "20px",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        textAlign: "center",
        marginBottom: "30px",
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(32px, 8vw, 48px)",
          color: "#2563eb",
          margin: 0,
        }}
      >
        🏥 SmartCare AI
      </h1>

      <p
        style={{
          color: "#555",
          fontSize: "clamp(14px, 4vw, 18px)",
          marginTop: "10px",
        }}
      >
        Intelligent Hospital Appointment &
        Healthcare Management System
      </p>
    </div>

    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "350px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        🔐 Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        required
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          boxSizing: "border-box",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        required
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Login
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login;
