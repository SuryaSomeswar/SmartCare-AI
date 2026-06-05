import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const isStaff =
    localStorage.getItem("staff") === "true";

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
          "https://smartcare-ai.onrender.com/api/doctors"
      );

      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDoctor = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `https://smartcare-ai.onrender.com/api/doctors/${id}`
      );

      alert(res.data.message);

      fetchDoctors();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Doctor");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            color: "#2563eb",
            fontSize: "42px",
          }}
        >
          👨‍⚕️ Available Doctors
        </h1>

        <p
          style={{
            color: "#64748b",
            fontSize: "18px",
          }}
        >
          Book appointments with experienced specialists
        </p>

        <input
          type="text"
          placeholder="🔍 Search Doctor or Specialization..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            marginTop: "20px",
            fontSize: "15px",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "25px",
        }}
      >
        {doctors
          .filter((doctor) => {
            return (
              doctor.name
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                ) ||
              doctor.specialization
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
            );
          })
          .map((doctor) => (
            <div
              key={doctor._id}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "25px",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,0.08)",
              }}
            >
              <h2
                style={{
                  color: "#2563eb",
                  marginBottom: "10px",
                }}
              >
                👨‍⚕️ {doctor.name}
              </h2>

              <p
                style={{
                  color: "#f59e0b",
                  fontWeight: "bold",
                  margin: "5px 0",
                }}
              >
                ⭐ {doctor.rating?.toFixed(1) || "0.0"}/5
              </p>

              <p
                style={{
                  color: "#64748b",
                  marginBottom: "15px",
                }}
              >
                📝 {doctor.reviewCount || 0} Reviews
              </p>

              <p>
                <strong>Specialization:</strong>{" "}
                {doctor.specialization}
              </p>

              <p>
                <strong>Experience:</strong>{" "}
                {doctor.experience}
              </p>

              <h4
                style={{
                  marginTop: "20px",
                  color: "#0f172a",
                }}
              >
                🕒 Available Slots
              </h4>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                {doctor.slots?.map(
                  (slot, index) => (
                    <Link
                      key={index}
                      to={`/appointments?doctor=${doctor.name}&slot=${slot}`}
                    >
                      <button
                        style={{
                          background:
                            "#2563eb",
                          color: "white",
                          border: "none",
                          padding:
                            "8px 14px",
                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                        }}
                      >
                        {slot}
                      </button>
                    </Link>
                  )
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  to={`/review/${doctor._id}`}
                >
                  <button
                    style={{
                      background:
                        "#8b5cf6",
                      color: "white",
                      border: "none",
                      padding:
                        "10px 15px",
                      borderRadius:
                        "8px",
                      cursor:
                        "pointer",
                    }}
                  >
                    ⭐ Review
                  </button>
                </Link>

                {isStaff && (
                  <>
                    <Link
                      to={`/edit-doctor/${doctor._id}`}
                    >
                      <button
                        style={{
                          background:
                            "#f59e0b",
                          color: "white",
                          border: "none",
                          padding:
                            "10px 15px",
                          borderRadius:
                            "8px",
                          cursor:
                            "pointer",
                        }}
                      >
                        ✏️ Edit Doctor
                      </button>
                    </Link>

                    <button
                      onClick={() =>
                        deleteDoctor(
                          doctor._id
                        )
                      }
                      style={{
                        background:
                          "#dc2626",
                        color: "white",
                        border: "none",
                        padding:
                          "10px 15px",
                        borderRadius:
                          "8px",
                        cursor:
                          "pointer",
                      }}
                    >
                      🗑 Delete Doctor
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Doctors;
