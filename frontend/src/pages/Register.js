
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

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

  const handleRegister = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await axios.post(
        "https://smartcare-ai.onrender.com/api/auth/register",
        {
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        }
      );

      setSuccessMessage(
        "✅ Registration Successful"
      );

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.log(error);

      if (
        error.response?.data?.message
      ) {
        setErrorMessage(
          error.response.data.message
        );
      } else {
        setErrorMessage(
          "❌ Registration Failed"
        );
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
            WebkitBackgroundClip:
              "text",
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
          Create your account and
          experience modern healthcare.
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
          📝 Create Account
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
          type="text"
          placeholder="👤 Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px 16px",
            marginBottom: "15px",
            borderRadius: "14px",
            border:
              "1px solid #e5e7eb",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="email"
          placeholder="📧 Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px 16px",
            marginBottom: "15px",
            borderRadius: "14px",
            border:
              "1px solid #e5e7eb",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "14px 16px",
            marginBottom: "18px",
            borderRadius: "14px",
            border:
              "1px solid #e5e7eb",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleRegister}
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
          🚀 Create Account
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            color: "#64748b",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#8b5cf6",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;


