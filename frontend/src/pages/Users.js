import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] =
    useState(true);
const [search, setSearch] =
  useState("");
const [successMessage,
setSuccessMessage] =
useState("");

const [errorMessage,
setErrorMessage] =
useState("");
  useEffect(() => {
    if (
      localStorage.getItem("staff") !==
      "true"
    ) {
      window.location.href = "/home";
      return;
    }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://smartcare-ai.onrender.com/api/users"
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: "bold",
          background: "#ffffff",
        }}
      >
        Loading Users...
      </div>
    );
  }

const resetPassword = async (id) => {
  const newPassword =
    prompt("Enter New Password");

  if (!newPassword) return;

  try {
    const res = await axios.put(
      `https://smartcare-ai.onrender.com/api/users/reset-password/${id}`,
      {
        password: newPassword,
      }
    );

    setSuccessMessage(
      res.data.message
    );

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

  } catch (error) {
    setErrorMessage(
      "Failed To Reset Password"
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
        background: "#ffffff",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            marginBottom: "30px",
            color: "#2563eb",
            textAlign: "center",
          }}
        >
          👥 Registered Users
        </h1>
<input
  type="text"
  placeholder="🔍 Search by Name or Email..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    marginBottom: "20px",
    fontSize: "15px",
    outline: "none",
  }}
/>
            {successMessage && (
  <div
    style={{
      background:"#dcfce7",
      color:"#166534",
      padding:"12px",
      borderRadius:"10px",
      marginBottom:"15px",
      fontWeight:"bold",
    }}
  >
    {successMessage}
  </div>
)}

{errorMessage && (
  <div
    style={{
      background:"#fee2e2",
      color:"#991b1b",
      padding:"12px",
      borderRadius:"10px",
      marginBottom:"15px",
      fontWeight:"bold",
    }}
  >
    {errorMessage}
  </div>
)}

        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
            boxShadow:
              "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#2563eb",
                  color: "white",
                }}
              >
                <th
                  style={{
                    padding: "18px",
                    textAlign: "left",
                  }}
                >
                  Name
                </th>

                <th
                  style={{
                    padding: "18px",
                    textAlign: "left",
                  }}
                >
                  Email
                </th>
                    <th
                  style={{
                    padding: "18px",
                    textAlign: "left",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

      <tbody>
  {users
    .filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        user.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    ).length === 0 ? (
    <tr>
      <td
        colSpan="3"
        style={{
          padding: "25px",
          textAlign: "center",
        }}
      >
        No Users Found
      </td>
    </tr>
  ) : (
    users
      .filter(
        (user) =>
          user.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          user.email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      )
      .map(
        (user, index) => (
          <tr
            key={user._id}
            style={{
              background:
                index % 2 === 0
                  ? "#ffffff"
                  : "#f8fafc",
            }}
          >
            <td
              style={{
                padding:
                  "16px 18px",
                borderBottom:
                  "1px solid #e2e8f0",
              }}
            >
              {user.name}
            </td>

            <td
              style={{
                padding:
                  "16px 18px",
                borderBottom:
                  "1px solid #e2e8f0",
              }}
            >
              {user.email}
            </td>

            <td
              style={{
                padding:
                  "16px 18px",
                borderBottom:
                  "1px solid #e2e8f0",
              }}
            >
              <button
                onClick={() =>
                  resetPassword(
                    user._id
                  )
                }
                style={{
                  background:
                    "linear-gradient(135deg,#ec4899,#8b5cf6)",
                  color: "white",
                  border: "none",
                  padding:
                    "8px 15px",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer",
                }}
              >
                🔑 Reset Password
              </button>
            </td>
          </tr>
        )
      )
  )}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
