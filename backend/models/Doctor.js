const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  specialization: {
    type: String,
    required: true,
  },

  experience: {
    type: String,
    required: true,
  },

  slots: [
    {
      type: String,
    },
  ],

  rating: {
    type: Number,
    default: 0,
  },

  reviewCount: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      patientName: {
        type: String,
      },

      rating: {
        type: Number,
      },

      comment: {
        type: String,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model(
  "Doctor",
  doctorSchema
);