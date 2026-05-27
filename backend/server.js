const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Appointment = require("./models/Appointment");

const app = express();

console.log(
  "MONGO_URI:",
  process.env.MONGO_URI
);

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log(
      "MongoDB Connected"
    )
  )
  .catch((err) =>
    console.log(err)
  );

app.get("/", (req, res) => {
  res.send(
    "API Running Successfully"
  );
});

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/doctors",
  require("./routes/doctorRoutes")
);

app.use(
  "/api/appointments",
  require("./routes/appointmentRoutes")
);

app.use(
  "/api/users",
  require("./routes/userRoutes")
);

// Auto mark Pending appointments as No Show after 24 hours
setInterval(async () => {
  try {
    const appointments =
      await Appointment.find({
        status: "Pending",
      });

    const now = new Date();

    for (const appointment of appointments) {
      const appointmentDate =
        new Date(
          `${appointment.date} ${appointment.time}`
        );

      const diffHours =
        (now - appointmentDate) /
        (1000 * 60 * 60);

      if (diffHours >= 24) {
        appointment.status =
          "No Show";

        await appointment.save();

        console.log(
          `Appointment ${appointment._id} marked as No Show`
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
}, 60 * 60 * 1000);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});