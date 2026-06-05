const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const auth = require("../middleware/authMiddleware");
const sendMail = require("../utils/sendMail");

// Book Appointment
// Book Appointment
router.post("/book", auth, async (req, res) => {
  try {

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
    await Appointment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Appointment Cancelled Successfully",
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
