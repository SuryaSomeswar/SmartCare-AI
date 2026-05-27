const express = require("express");
const router = express.Router();

const Appointment = require("../models/Appointment");
const auth = require("../middleware/authMiddleware");
const sendMail = require("../utils/sendMail");

// Book Appointment
router.post("/book", auth, async (req, res) => {
  try {
    const appointment = new Appointment(
      req.body
    );

    await appointment.save();

    //await sendMail(
      //req.body.email,
      //"Appointment Confirmed",
      `
    //  Appointment Confirmed

//Patient: ${req.body.patientName}

//Doctor: ${req.body.doctorName}

//Date: ${req.body.date}

//Time: ${req.body.time}

//Thank you for choosing Smart Hospital.
      `
   // );

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