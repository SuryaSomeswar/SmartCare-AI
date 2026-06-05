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

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `https://smartcare-ai.onrender.com/api/doctors/${id}/review,
        {
          patientName,
          rating,
          comment,
        }
      );

      alert(res.data.message);

      navigate("/doctors");

    } catch (error) {
      console.log(error);
      alert("Failed to Submit Review");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    marginBottom: "15px",
    fontSize: "15px",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
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
          borderRadius: "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.1)",
          width: "600px",
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
              background: "#8b5cf6",
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
