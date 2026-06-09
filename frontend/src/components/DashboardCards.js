import { Link } from "react-router-dom";

function DashboardCards({
  title,
  value,
  icon,
}) {
  let path = "/";

  if (title === "Doctors") {
    path = "/doctors";
  }

  if (title === "Appointments") {
    path = "/history";
  }

  if (title === "Users") {
    path = "/users";
  }

  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "16px",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.1)",
        minWidth: "250px",
        textAlign: "center",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          fontSize: "40px",
          marginBottom: "10px",
          color: "#2563eb",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          color: "#334155",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color: "#2563eb",
          marginBottom: "20px",
        }}
      >
        {value}
      </h1>

      <Link to={path}>
        <button
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          View {title}
        </button>
      </Link>
    </div>
  );
}

export default DashboardCards;


