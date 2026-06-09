import { useState } from "react";
import axios from "axios";

function Feedback() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://smartcare-ai.onrender.com/api/feedback",
        {
          name,
          message,
        }
      );

      alert("Thank you for your feedback!");

      setName("");
      setMessage("");
    } catch (error) {
      console.log(error);
      alert("Failed to submit feedback");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "24px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0",
        }}
      >
        <h1
          style={{
            marginBottom: "25px",
            color: "#0f172a",
            fontSize: "36px",
            textAlign: "center",
          }}
        >
          📝 Feedback Form
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          We value your feedback. Help us improve SmartCare AI.
        </p>

        <form onSubmit={submitFeedback}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "20px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <textarea
            placeholder="Share your experience..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            rows="6"
            required
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              fontSize: "16px",
              resize: "none",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "20px",
              background:
                "linear-gradient(135deg,#2563eb,#3b82f6)",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            🚀 Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
