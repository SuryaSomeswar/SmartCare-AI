
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

function Appointments() {
  const [searchParams] = useSearchParams();

  const doctorName =
    searchParams.get("doctor") || "";

  const selectedSlot =
    searchParams.get("slot") || "";

  const [patientName, setPatientName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [gender, setGender] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [place, setPlace] =
    useState("");

  const [date, setDate] =
    useState("");

  const [time] =
    useState(selectedSlot);

  const [successMessage,
    setSuccessMessage] =
    useState("");

  const [errorMessage,
    setErrorMessage] =
    useState("");

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    marginTop: "5px",
    marginBottom: "15px",
    boxSizing: "border-box",
    fontSize: "15px",
  };

  const downloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("SMART HOSPITAL", 20, 20);

    doc.setFontSize(12);

    doc.text(
      `Patient Name: ${patientName}`,
      20,
      40
    );

    doc.text(
      `Email: ${email}`,
      20,
      50
    );

    doc.text(
      `Gender: ${gender}`,
      20,
      60
    );

    doc.text(
      `Phone: ${phone}`,
      20,
      70
    );

    doc.text(
      `Place: ${place}`,
      20,
      80
    );

    doc.text(
      `Doctor: ${doctorName}`,
      20,
      90
    );

    doc.text(
      `Date: ${date}`,
      20,
      100
    );

    doc.text(
      `Time: ${time}`,
      20,
      110
    );

    doc.save(
      "AppointmentReceipt.pdf"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    try {
      const token =
        localStorage.getItem("token");

      await axios.post(
        "https://smartcare-ai.onrender.com/api/appointments/book",
        {
          patientName,
          email,
          gender,
          phone,
          place,
          doctorName,
          date,
          time,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setSuccessMessage(
        "✅ Appointment Booked Successfully"
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setPatientName("");
      setEmail("");
      setGender("");
      setPhone("");
      setPlace("");
      setDate("");

    } catch (error) {
      console.log(error);

      if (
        error.response &&
        error.response.data.message
      ) {
        setErrorMessage(
          error.response.data.message
        );
      } else {
        setErrorMessage(
          "❌ Booking Failed"
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
          borderRadius: "20px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
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
          📅 Book Appointment
        </h1>

       {successMessage && (
  <div
    style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "#dcfce7",
      color: "#166534",
      padding: "15px 20px",
      borderRadius: "12px",
      fontWeight: "bold",
      boxShadow:
        "0 10px 25px rgba(0,0,0,0.15)",
      zIndex: 9999,
    }}
  >
    {successMessage}
  </div>
)}

       {errorMessage && (
  <div
    style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "#fee2e2",
      color: "#991b1b",
      padding: "15px 20px",
      borderRadius: "12px",
      fontWeight: "bold",
      boxShadow:
        "0 10px 25px rgba(0,0,0,0.15)",
      zIndex: 9999,
    }}
  >
    {errorMessage}
  </div>
)}

        <form onSubmit={handleSubmit}>
          <label>Patient Name</label>

          <input
            type="text"
            value={patientName}
            onChange={(e) =>
              setPatientName(
                e.target.value
              )
            }
            required
            style={inputStyle}
          />

          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            required
            style={inputStyle}
          />

          <label>Gender</label>

          <select
            value={gender}
            onChange={(e) =>
              setGender(
                e.target.value
              )
            }
            required
            style={inputStyle}
          >
            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>
          </select>

          <label>Phone Number</label>

          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            required
            style={inputStyle}
          />

          <label>Place</label>

          <input
            type="text"
            value={place}
            onChange={(e) =>
              setPlace(
                e.target.value
              )
            }
            required
            style={inputStyle}
          />

          <label>Doctor</label>

          <input
            type="text"
            value={doctorName}
            readOnly
            style={inputStyle}
          />

          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(
                e.target.value
              )
            }
            required
            style={inputStyle}
          />

          <label>
            Selected Slot
          </label>

          <input
            type="text"
            value={time}
            readOnly
            style={inputStyle}
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
              marginTop: "10px",
            }}
          >
            ✅ Confirm Appointment
          </button>

          <button
            type="button"
            onClick={downloadReceipt}
            style={{
              width: "100%",
              background: "#16a34a",
              color: "white",
              border: "none",
              padding: "14px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            📄 Download Receipt
          </button>
        </form>
      </div>
    </div>
  );
}

export default Appointments;



