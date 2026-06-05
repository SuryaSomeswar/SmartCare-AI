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
    console.log("Email:", email);
    console.log("Password:", password);

    // Staff Login
    if (
      email.trim().toLowerCase() ===
        "admin@gmail.com" &&
      password.trim() === "admin123"
    ) {
      console.log(
        "STAFF LOGIN SUCCESS"
      );

      localStorage.setItem(
        "staff",
        "true"
      );

      localStorage.setItem(
        "token",
        "staff-token"
      );

      alert(
        "Staff Login Successful"
      );console.log(
  "Staff Value:",
  localStorage.getItem("staff")
);

      window.location.href =
        "/admin";

      return;
    }

    // Normal User Login
    const res = await axios.post(
     "https://smartcare-ai.onrender.com/api/auth/login",
      {
        email: email.trim(),
        password: password.trim(),
      }
    );

    localStorage.removeItem(
      "staff"
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    alert(
      "Login Successful"
    );

    window.location.href =
      "/home";

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
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            color: "#2563eb",
            margin: 0,
          }}
        >
          🏥 SmartCare AI
        </h1>

        <p
          style={{
            color: "#555",
            fontSize: "18px",
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
          padding: "40px",
          borderRadius: "12px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
          width: "350px",
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
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
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
