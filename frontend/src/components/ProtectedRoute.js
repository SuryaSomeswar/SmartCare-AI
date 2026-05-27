import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token =
    localStorage.getItem("token");

  const isStaff =
    localStorage.getItem("staff") ===
    "true";

  if (!token && !isStaff) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;