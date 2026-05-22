const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const auth = require("../middleware/authMiddleware");
const sendMail = require("../utils/sendMail");

// Protected Route
router.post("/book", auth, async (req, res) => {
  try {
    const appointment = new Appointment(req.body);

    await appointment.save();

    await sendMail(
      req.body.email,
      "Appointment Confirmed",
      `
Appointment Confirmed

Patient: ${req.body.patientName}

Doctor: ${req.body.doctorName}

Date: ${req.body.date}

Time: ${req.body.time}

Thank you for choosing Smart Hospital.
      `
    );

    res.status(201).json({
      message:
        "Appointment Booked Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Error Booking Appointment",
    });
  }
});

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

module.exports = router;