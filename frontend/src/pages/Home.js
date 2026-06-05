function Home() {
  return (
    <div className="container">
      <nav className="navbar">
        <h2>🏥 SmartCare AI</h2>

        <div>
          <a href="/">
            <button>Login</button>
          </a>

          <a href="/register">
            <button style={{ marginLeft: "10px" }}>
              Register
            </button>
          </a>

          {localStorage.getItem("staff") === "true" && (
            <a href="/admin">
              <button
                style={{
                  marginLeft: "10px",
                  background: "#f59e0b",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🏥 Staff Dashboard
              </button>
            </a>
          )}
        </div>
      </nav>

      <section className="hero">
        <h1>Book Appointments Easily</h1>

        <p>
          Smart healthcare platform for patients
          and doctors.
        </p>

        <a href="/doctors">
          <button className="hero-btn">
            Book Appointment
          </button>
        </a>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("staff");
            window.location.href = "/";
          }}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "8px",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          🚪 Logout
        </button>

        <a href="/feedback">
          <button
            style={{
              marginLeft: "10px",
              padding: "15px 25px",
              background: "#ec4899",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            📝 Feedback
          </button>
        </a>
      </section>
    </div>
  );
}

export default Home;
