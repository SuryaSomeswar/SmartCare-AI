import { Navigate } from "react-router-dom";

function StaffRoute({ children }) {
  const isStaff =
    localStorage.getItem("staff") === "true";

  return isStaff
    ? children
    : <Navigate to="/home" />;
}

export default StaffRoute;
