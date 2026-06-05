import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [specialization, setSpecialization] =
    useState("");
  const [experience, setExperience] =
    useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(
          "https://smartcare-ai.onrender.com/api/doctors"
        );

        const doctor = res.data.find(
          (d) => d._id === id
        );

        if (doctor) {
          setName(doctor.name);
          setSpecialization(
            doctor.specialization
          );
          setExperience(
            doctor.experience
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctor();
  }, [id]);

  const updateDoctor = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `https://smartcare-ai.onrender.com/api/doctors/${id}`,
        {
          name,
          specialization,
          experience,
        }
      );

      alert(res.data.message);

      navigate("/doctors");
    } catch (error) {
      console.log(error);
      alert("Failed to Update Doctor");
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h1>✏️ Edit Doctor</h1>

      <form onSubmit={updateDoctor}>
        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Doctor Name"
          required
        />

        <br />
        <br />

        <input
          type="text"
          value={specialization}
          onChange={(e) =>
            setSpecialization(
              e.target.value
            )
          }
          placeholder="Specialization"
          required
        />

        <br />
        <br />

        <input
          type="text"
          value={experience}
          onChange={(e) =>
            setExperience(
              e.target.value
            )
          }
          placeholder="Experience"
          required
        />

        <br />
        <br />

        <button
          type="submit"
          style={{
            background: "#f59e0b",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Update Doctor
        </button>
      </form>
    </div>
  );
}

export default EditDoctor;
