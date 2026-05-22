function DashboardCards({
  title,
  value,
  icon,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.1)",
        minWidth: "220px",
      }}
    >
      <div
        style={{
          fontSize: "32px",
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}

export default DashboardCards;