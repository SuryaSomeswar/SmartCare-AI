const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  place: {
    type: String,
    required: true,
  },

  doctorName: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model(
  "Appointment",
  appointmentSchema
);