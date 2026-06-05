import { useState } from "react";
import axios from "axios";

function AddDoctor() {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] =
    useState("");
  const [experience, setExperience] =
    useState("");
  const [slots, setSlots] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  };

  const addDoctor = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        const res = await axios.post(
  "https://smartcare-ai.onrender.com/api/doctors/add",
        {
          name,
          specialization,
          experience,
          slots: slots
            .split(",")
            .map((slot) => slot.trim()),
        }
      );

      alert(res.data.message);

      setName("");
      setSpecialization("");
      setExperience("");
      setSlots("");

    } catch (error) {
      console.log(error);
      alert("Failed to Add Doctor");
    }
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
          width: "450px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "30px",
          }}
        >
          👨‍⚕️ Add Doctor
        </h1>

        <form onSubmit={addDoctor}>
          <input
            type="text"
            placeholder="Doctor Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) =>
              setSpecialization(
                e.target.value
              )
            }
            required
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Experience"
            value={experience}
            onChange={(e) =>
              setExperience(
                e.target.value
              )
            }
            required
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Slots (09:00 AM, 10:00 AM, 11:00 AM)"
            value={slots}
            onChange={(e) =>
              setSlots(e.target.value)
            }
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#2563eb",
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
            ➕ Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDoctor;
