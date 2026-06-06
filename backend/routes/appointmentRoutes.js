const express = require("express");
const router = express.Router();

const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const auth = require("../middleware/authMiddleware");
const sendMail = require("../utils/sendMail");

// Book Appointment
router.post("/book", auth, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({
  name: req.body.doctorName,
});

const doctor = await Doctor.findOne({
  name: req.body.doctorName,
});

if (!doctor) {
  return res.status(404).json({
    message: "Doctor not found",
  });
}

if (!doctor.isAvailable) {
  return res.status(400).json({
    message: "Doctor is currently on leave",
  });
}

    // Prevent booking past dates
    const selectedDate =
      new Date(req.body.date);

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({
        message:
          "Cannot book appointments for past dates",
      });
    }

    // Prevent duplicate slot booking
    const existingAppointment =
      await Appointment.findOne({
        doctorName: req.body.doctorName,
        date: req.body.date,
        time: req.body.time,
      });

    if (existingAppointment) {
      return res.status(400).json({
        message:
          "This slot is already booked",
      });
    }

    const appointment =
      new Appointment(req.body);

    await appointment.save();

    res.status(201).json({
      message:
        "Appointment Booked Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});
// Get All Appointments
router.get("/", async (req, res) => {
  try {
    const appointments =
      await Appointment.find();

    res.json(appointments);

  } catch (error) {
    res.status(500).json({
      message:
        "Error Fetching Appointments",
    });
  }
});

// Cancel Appointment
router.delete("/:id", async (req, res) => {
  try {

    const appointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        {
          status: "Cancelled",
        },
        { new: true }
      );

    res.json({
      message:
        "Appointment Cancelled Successfully",
      appointment,
    });

  } catch (error) {
    res.status(500).json({
      message:
        "Error Cancelling Appointment",
    });
  }
});
// Update Appointment Status
router.put("/:id", async (req, res) => {
  try {
    const appointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        { new: true }
      );

    res.json(appointment);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
