
import { useState } from "react";
import axios from "axios";

function Feedback() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const [successMessage,
    setSuccessMessage] =
    useState("");

  const [errorMessage,
    setErrorMessage] =
    useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    try {
      await axios.post(
        "https://smartcare-ai.onrender.com/api/feedback",
        {
          name,
          message,
        }
      );

      setSuccessMessage(
        "✅ Thank you for your feedback!"
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setName("");
      setMessage("");

    } catch (error) {
      console.log(error);

      setErrorMessage(
        "❌ Failed to submit feedback"
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#fdf2f8,#faf5ff)",
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
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "20px",
            color: "#8b5cf6",
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
          We value your feedback.
          Help us improve SmartCare AI.
        </p>

        {successMessage && (
          <div
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "12px",
              borderRadius: "10px",
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
              borderRadius: "10px",
              marginBottom: "15px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {errorMessage}
          </div>
        )}

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
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
              border:
                "1px solid #d1d5db",
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
              padding: "12px",
              borderRadius: "8px",
              border:
                "1px solid #d1d5db",
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
                "linear-gradient(135deg,#ec4899,#8b5cf6)",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "15px",
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

