import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] =
    useState(true);

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
        }}
      >
        Loading Users...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
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
            fontSize: "42px",
            marginBottom: "30px",
            color: "#0f172a",
          }}
        >
          👥 Registered Users
        </h1>

        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.08)",
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
                  background:
                    "linear-gradient(135deg,#ec4899,#8b5cf6)",
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
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan="2"
                    style={{
                      padding: "25px",
                      textAlign:
                        "center",
                    }}
                  >
                    No Users Found
                  </td>
                </tr>
              ) : (
                users.map(
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
