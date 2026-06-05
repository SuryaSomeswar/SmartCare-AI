import { useState } from "react";
import axios from "axios";

function Feedback() {
  const [name, setName] =
    useState("");

  const [message, setMessage] =
    useState("");

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

      alert(
        "Thank you for your feedback!"
      );

      setName("");
      setMessage("");

    } catch (error) {
      console.log(error);
      alert(
        "Failed to submit feedback"
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h1>📝 Feedback Form</h1>

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
          }}
        />

        <textarea
          placeholder="Share your experience..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          rows="5"
          required
          style={{
            width: "100%",
            padding: "12px",
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: "15px",
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default Feedback;
