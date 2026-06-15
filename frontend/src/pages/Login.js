
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
          "linear-gradient(135deg,#fdf2f8,#faf5ff)",
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
            fontSize:
              "clamp(32px,8vw,48px)",
            color: "#8b5cf6",
            margin: 0,
          }}
        >
          🏥 SmartCare AI
        </h1>

        <p
          style={{
            color: "#555",
            fontSize:
              "clamp(14px,4vw,18px)",
            marginTop: "10px",
          }}
        >
          Intelligent Hospital
          Appointment &
          Healthcare Management
          System
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
          width: "100%",
          maxWidth: "380px",
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

        {successMessage && (
          <div
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "12px",
              borderRadius: "8px",
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
              borderRadius: "8px",
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
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border:
              "1px solid #d1d5db",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border:
              "1px solid #d1d5db",
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
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
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


