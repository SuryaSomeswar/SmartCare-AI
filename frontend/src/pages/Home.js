function Home() {
  return (
    <div className="container">
      <nav className="navbar">
        <h2>🏥 Smart Hospital</h2>

        <div>
          <button>Login</button>
          <button style={{marginLeft:"10px"}}>
            Register
          </button>
        </div>
      </nav>

      <section className="hero">
        <h1>Book Appointments Easily</h1>

        <p>
          Smart healthcare platform for patients
          and doctors.
        </p>

        <button className="hero-btn">
          Book Appointment
        </button>
        <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }}
  style={{
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  🚪 Logout
</button>
<a href="/feedback">
  <button
    style={{
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