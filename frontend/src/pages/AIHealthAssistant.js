import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AIHealthAssistant() {
  const [symptoms, setSymptoms] =
    useState("");

  const [result, setResult] =
    useState(null);

  const navigate = useNavigate();

  const analyzeSymptoms = () => {
    const text =
      symptoms.toLowerCase();

    let recommendation = {
      department:
        "General Medicine",
      doctor:
        "Dr. Rajesh",
      slot: "09:00 AM",
    };

    if (
      text.includes("chest") ||
      text.includes("heart")
    ) {
      recommendation = {
        department: "Cardiology",
        doctor: "Dr. Kumar",
        slot: "10:00 AM",
      };
    }

    else if (
      text.includes("skin") ||
      text.includes("rash")
    ) {
      recommendation = {
        department:
          "Dermatology",
        doctor: "Dr. Priya",
        slot: "11:00 AM",
      };
    }

    else if (
      text.includes("joint") ||
      text.includes("bone")
    ) {
      recommendation = {
        department:
          "Orthopedics",
        doctor: "Dr. Ramesh",
        slot: "12:00 PM",
      };
    }

    setResult(recommendation);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563eb",
        }}
      >
        🤖 AI Health Assistant
      </h1>

      <div
        style={{
          maxWidth: "700px",
          margin: "30px auto",
          background: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <textarea
          rows="5"
          placeholder="Enter symptoms (e.g. fever, cough, chest pain)"
          value={symptoms}
          onChange={(e) =>
            setSymptoms(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
          }}
        />

        <button
          onClick={analyzeSymptoms}
          style={{
            marginTop: "15px",
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Analyze Symptoms
        </button>

        {result && (
          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              background: "#eff6ff",
              borderRadius: "10px",
            }}
          >
            <h3>
              Recommended Department:
            </h3>

            <p>
              {result.department}
            </p>

            <h3>
              Recommended Doctor:
            </h3>

            <p>
              {result.doctor}
            </p>

            <h3>
              Available Slot:
            </h3>

            <p>
              {result.slot}
            </p>

            <button
              onClick={() =>
                navigate(
                  `/appointments?doctor=${result.doctor}&slot=${result.slot}`
                )
              }
              style={{
                background:
                  "#16a34a",
                color: "white",
                border: "none",
                padding:
                  "12px 20px",
                borderRadius:
                  "10px",
                cursor:
                  "pointer",
              }}
            >
              📅 Book Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIHealthAssistant;