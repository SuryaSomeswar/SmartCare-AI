import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [successMessage,
    setSuccessMessage] =
    useState("");

  const [errorMessage,
    setErrorMessage] =
    useState("");

  const handleLogin = async () => {
    setSuccessMessage("");
    setErrorMessage("");

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

        setSuccessMessage(
          "✅ Staff Login Successful"
        );

        setTimeout(() => {
          window.location.href =
            "/admin";
        }, 1500);

      } else {
        localStorage.removeItem(
          "staff"
        );

        setSuccessMessage(
          "✅ Login Successful"
        );

        setTimeout(() => {
          window.location.href =
            "/home";
        }, 1500);
      }

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (error) {
      console.error(error);

      if (
        error.response?.data?.message
      ) {
        setErrorMessage(
          error.response.data.message
        );
      } else {
        setErrorMessage(
          "❌ Login Failed"
        );
      }

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
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
      background:
        "linear-gradient(135deg,#fdf2f8,#faf5ff,#eef2ff)",
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
      <div
        style={{
          display: "inline-block",
          padding: "8px 18px",
          borderRadius: "999px",
          background:
            "rgba(236,72,153,0.1)",
          color: "#db2777",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        ✨ AI Powered Healthcare Platform
      </div>

      <h1
        style={{
          fontSize:
            "clamp(42px,8vw,58px)",
          fontWeight: "800",
          background:
            "linear-gradient(135deg,#ec4899,#8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor:
            "transparent",
          margin: 0,
        }}
      >
        🏥 SmartCare AI
      </h1>

      <p
        style={{
          color: "#64748b",
          fontSize:
            "clamp(14px,4vw,18px)",
          marginTop: "12px",
        }}
      >
        Intelligent Hospital Appointment &
        Healthcare Management System
      </p>
    </div>

    <div
      style={{
        background:
          "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        padding: "35px",
        borderRadius: "28px",
        border:
          "1px solid rgba(255,255,255,0.5)",
        boxShadow:
          "0 25px 60px rgba(139,92,246,0.15)",
        width: "100%",
        maxWidth: "420px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#1e293b",
        }}
      >
        🔐 Welcome Back
      </h2>

      {successMessage && (
        <div
          style={{
            background: "#dcfce7",
            color: "#166534",
            padding: "12px",
            borderRadius: "12px",
            marginBottom: "15px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          style={{
            background: "#fee2e2",
            color: "#991b1b",
            padding: "12px",
            borderRadius: "12px",
            marginBottom: "15px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {errorMessage}
        </div>
      )}

      <input
        type="email"
        placeholder="📧 Enter your email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        required
        style={{
          width: "100%",
          padding: "14px 16px",
          marginBottom: "15px",
          borderRadius: "14px",
          border: "1px solid #e5e7eb",
          fontSize: "15px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      <input
        type="password"
        placeholder="🔑 Enter your password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        required
        style={{
          width: "100%",
          padding: "14px 16px",
          marginBottom: "18px",
          borderRadius: "14px",
          border: "1px solid #e5e7eb",
          fontSize: "15px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          background:
            "linear-gradient(135deg,#ec4899,#8b5cf6)",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "14px",
          cursor: "pointer",
          fontWeight: "700",
          fontSize: "16px",
          boxShadow:
            "0 10px 25px rgba(139,92,246,0.25)",
        }}
      >
        🚀 Login
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: "18px",
          color: "#64748b",
        }}
      >
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{
            color: "#8b5cf6",
            fontWeight: "bold",
          }}
        >
          Register
        </Link>
      </p>

      <div
        style={{
          marginTop: "25px",
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: "10px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "12px",
            background: "#faf5ff",
            borderRadius: "12px",
            fontSize: "12px",
          }}
        >
          🤖
          <br />
          AI Assistant
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "12px",
            background: "#fdf2f8",
            borderRadius: "12px",
            fontSize: "12px",
          }}
        >
          📅
          <br />
          Booking
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "12px",
            background: "#eef2ff",
            borderRadius: "12px",
            fontSize: "12px",
          }}
        >
          🔒
          <br />
          Secure
        </div>
      </div>
    </div>
  </div>
);

}

export default Login;


