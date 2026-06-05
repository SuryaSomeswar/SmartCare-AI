import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "https://smartcare-ai.onrender.com/api/auth/login",
        {
          name,
          email,
          password,
        }
      );

      alert(res.data.message);

      navigate("/");
    } catch (error) {
  console.log("FULL ERROR:", error);

  if (error.response) {
    console.log("Response Data:", error.response.data);
    alert(JSON.stringify(error.response.data));
  } else if (error.request) {
    alert("No response from server. Is backend running?");
  } else {
    alert(error.message);
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
          🏥 Smart Hospital
        </h1>

        <p
          style={{
            color: "#555",
            fontSize: "18px",
            marginTop: "10px",
          }}
        >
          Create your account
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
          📝 Register
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

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
          onClick={handleRegister}
          style={{
            width: "100%",
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
