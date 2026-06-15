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
  const toggleAvailability = async (
  id,
  currentStatus
) => {
  try {
    await axios.put(
      `https://smartcare-ai.onrender.com/api/doctors/${id}`,
      {
        isAvailable: !currentStatus,
      }
    );

    fetchDoctors();

  } catch (error) {
    console.log(error);
    alert(
      "Failed to update availability"
    );
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
  "linear-gradient(135deg,#fdf2f8,#faf5ff)",
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
            color: "#8b5cf6",
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
  maxWidth: "700px",
  padding: "15px 20px",
  borderRadius: "14px",
  border: "1px solid #f3e8ff",
  marginTop: "20px",
  fontSize: "16px",
  outline: "none",
  boxShadow:
    boxShadow:
  "0 10px 30px rgba(139,92,246,0.15)",
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
  background:
    "rgba(255,255,255,0.9)",
  backdropFilter: "blur(12px)",
  borderRadius: "24px",
  padding: "30px",
  border:
    "1px solid rgba(255,255,255,0.4)",
  boxShadow:
    "0 10px 30px rgba(139,92,246,0.15)",
}}
            >
              <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    flexWrap: "wrap",
    gap: "10px",
  }}
>
  <h2
    style={{
      margin: 0,
      color: "#8b5cf6",
    }}
  >
    👨‍⚕️ {doctor.name}
  </h2>

  <span
    style={{
      background:
        doctor.isAvailable
          ? "#dcfce7"
          : "#fee2e2",
      color:
        doctor.isAvailable
          ? "#16a34a"
          : "#dc2626",
      padding: "6px 12px",
      borderRadius: "999px",
      fontSize: "13px",
      fontWeight: "bold",
    }}
  >
    {doctor.isAvailable
      ? "✅ Available"
      : "🚫 On Leave"}
  </span>
</div>
            
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

              <div
  style={{
    background: "#f3e8ff",
color: "#8b5cf6",
    padding: "8px 12px",
    borderRadius: "8px",
    display: "inline-block",
    marginTop: "10px",
    marginBottom: "15px",
    fontWeight: "600",
  }}
>
  🎓 {doctor.experience}
</div>
              

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
  {doctor.isAvailable ? (
    doctor.slots?.map(
      (slot, index) => (
        <Link
          key={index}
          to={`/appointments?doctor=${doctor.name}&slot=${slot}`}
        >
          <button
            style={{
  background:
  "linear-gradient(135deg,#ec4899,#8b5cf6)",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "999px",
  cursor: "pointer",
  fontWeight: "600",
}}
          >
            {slot}
          </button>
        </Link>
      )
    )
  ) : (
    <p
      style={{
        color: "#dc2626",
        fontWeight: "bold",
      }}
    >
      🚫 Doctor is currently on leave
    </p>
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
  "linear-gradient(135deg,#ec4899,#8b5cf6)",
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
  "linear-gradient(135deg,#8b5cf6,#6366f1)",
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
    toggleAvailability(
      doctor._id,
      doctor.isAvailable
    )
  }
  style={{
    background:
      doctor.isAvailable
        ? "#dc2626"
        : "#16a34a",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  {doctor.isAvailable
    ? "🚫 Mark On Leave"
    : "✅ Mark Available"}
</button>

                    <button
                      onClick={() =>
                        deleteDoctor(
                          doctor._id
                        )
                      }
                      style={{
                        background:
  "linear-gradient(135deg,#ef4444,#ec4899)",
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

