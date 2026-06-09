function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#2563eb,#7c3aed)",
        background:
  "linear-gradient(135deg,#fdf2f8,#faf5ff)",
        padding: "20px",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "60px",
        }}
      >
        <h2
          style={{
            fontSize: "30px",
            margin: 0,
          }}
        >
          🏥 SmartCare AI
        </h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <a href="/">
            <button
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Login
            </button>
          </a>

          <a href="/register">
            <button
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Register
            </button>
          </a>

          {localStorage.getItem("staff") ===
            "true" && (
            <a href="/admin">
              <button
                style={{
                  background: "#f59e0b",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                🏥 Dashboard
              </button>
            </a>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "300px",
          }}
        >
          <h1
            style={{
              fontSize:
                "clamp(40px,8vw,72px)",
              lineHeight: "1.1",
              marginBottom: "20px",
            }}
          >
            Future of
            <br />
            Healthcare
          </h1>

          <p
            style={{
              fontSize: "20px",
              opacity: 0.9,
              lineHeight: "1.7",
              marginBottom: "30px",
            }}
          >
            SmartCare AI helps patients
            book appointments instantly,
            manage healthcare records,
            and connect with experienced
            doctors seamlessly.
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <a href="/doctors">
              <button
                style={{
                  background: "white",
                  color: "#2563eb",
                  border: "none",
                  padding: "15px 30px",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                📅 Book Appointment
              </button>
            </a>

            <a href="/feedback">
              <button
                style={{
                  background:
                    "rgba(255,255,255,0.15)",
                  color: "white",
                  border:
                    "1px solid rgba(255,255,255,0.3)",
                  padding: "15px 30px",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                📝 Feedback
              </button>
            </a>

            <button
              onClick={() => {
                localStorage.removeItem(
                  "token"
                );
                localStorage.removeItem(
                  "staff"
                );
                window.location.href =
                  "/";
              }}
              style={{
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "15px 30px",
                borderRadius: "12px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Right Side Card */}
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            background:
              "rgba(255,255,255,0.12)",
            backdropFilter: "blur(15px)",
            border:
              "1px solid rgba(255,255,255,0.2)",
            borderRadius: "25px",
            padding: "30px",
          }}
        >
          <h2>📊 Smart Statistics</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2,1fr)",
              gap: "20px",
              marginTop: "25px",
            }}
          >
            <div>
              <h1>50+</h1>
              <p>Doctors</p>
            </div>

            <div>
              <h1>1000+</h1>
              <p>Patients</p>
            </div>

            <div>
              <h1>24/7</h1>
              <p>Support</p>
            </div>

            <div>
              <h1>99%</h1>
              <p>Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
