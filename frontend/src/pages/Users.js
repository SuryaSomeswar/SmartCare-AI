import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  if (
  localStorage.getItem("staff") !== "true"
) {
  window.location.href = "/home";
  return null;
}
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  const fetchUsers = async () => {
  ...
};

if (loading) {
  return <h2>Loading Users...</h2>;
}

return (
  <div style={{ padding: "30px" }}>

  return (
    <div style={{ padding: "30px" }}>
      <h1>👥 Registered Users</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
  {users.length === 0 ? (
    <tr>
      <td colSpan="2">
        No Users Found
      </td>
    </tr>
  ) : (
    users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
      </tr>
    ))
  )}
</tbody><thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        
      </table>
    </div>
  );
}

export default Users;
