import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function AddReview() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [patientName, setPatientName] =
    useState("");

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

const submitReview = async (e) => {
  e.preventDefault();

  setSuccessMessage("");
  setErrorMessage("");

  try {
    await axios.post(
      `https://smartcare-ai.onrender.com/api/doctors/${id}/review`,
      {
        patientName,
        rating,
        comment,
      }
    );

    setSuccessMessage(
      "✅ Review Submitted Successfully"
    );

    setPatientName("");
    setRating(5);
    setComment("");

    setTimeout(() => {
      navigate("/doctors");
    }, 1500);

  } catch (error) {
    console.log(error);

    setErrorMessage(
      error.response?.data?.message ||
      "❌ Failed to Submit Review"
    );

    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }
};

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #e9d5ff",
    borderRadius: "10px",
    marginBottom: "15px",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
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
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "40px",
          borderRadius: "24px",
          boxShadow:
            "0 10px 30px rgba(139,92,246,0.15)",
          width: "600px",
          border: "1px solid #f3e8ff",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#8b5cf6",
            marginBottom: "30px",
          }}
        >
          ⭐ Doctor Review
        </h1>

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

        <form onSubmit={submitReview}>
          <label>
            Patient Name
          </label>

          <input
            type="text"
            placeholder="Enter Your Name"
            value={patientName}
            onChange={(e) =>
              setPatientName(
                e.target.value
              )
            }
            required
            style={inputStyle}
          />

          <label>
            Rating
          </label>

          <select
            value={rating}
            onChange={(e) =>
              setRating(
                Number(
                  e.target.value
                )
              )
            }
            style={inputStyle}
          >
            <option value="5">
              ⭐⭐⭐⭐⭐ (5)
            </option>

            <option value="4">
              ⭐⭐⭐⭐ (4)
            </option>

            <option value="3">
              ⭐⭐⭐ (3)
            </option>

            <option value="2">
              ⭐⭐ (2)
            </option>

            <option value="1">
              ⭐ (1)
            </option>
          </select>

          <label>
            Review
          </label>

          <textarea
            rows="5"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
            required
            style={{
              ...inputStyle,
              resize: "none",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              background:
                "linear-gradient(135deg,#ec4899,#8b5cf6)",
              color: "white",
              border: "none",
              padding: "14px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ⭐ Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddReview;


