const express = require("express");
const Doctor = require("../models/Doctor");

const router = express.Router();

// Get All Doctors
const Appointment = require("../models/Appointment");

router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();

    const appointments =
      await Appointment.find({
        status: {
          $ne: "Cancelled",
        },
      });

    const updatedDoctors =
      doctors.map((doctor) => {
        const bookedSlots =
          appointments
            .filter(
              (appointment) =>
                appointment.doctorName ===
                doctor.name
            )
            .map(
              (appointment) =>
                appointment.time
            );

        return {
          ...doctor._doc,
          availableSlots:
            doctor.slots.filter(
              (slot) =>
                !bookedSlots.includes(
                  slot
                )
            ),
        };
      });

    res.json(updatedDoctors);
  } catch (error) {
    res.status(500).json({
      message:
        "Error Fetching Doctors",
    });
  }
});

// Add Doctor
router.post("/add", async (req, res) => {
  try {
    const doctor = new Doctor(req.body);

    await doctor.save();

    res.json({
      message: "Doctor Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Adding Doctor",
    });
  }
});

// Add Review
router.post("/:id/review", async (req, res) => {
  try {
    const doctor = await Doctor.findById(
      req.params.id
    );

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor Not Found",
      });
    }
    const existingReview =
  doctor.reviews.find(
    (review) =>
      review.patientName ===
      req.body.patientName
  );

if (existingReview) {
  return res.status(400).json({
    message:
      "You have already reviewed this doctor",
  });
}

    doctor.reviews.push({
      patientName:
        req.body.patientName,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    doctor.reviewCount =
      doctor.reviews.length;

    const totalRating =
      doctor.reviews.reduce(
        (sum, review) =>
          sum + review.rating,
        0
      );

    doctor.rating =
      totalRating /
      doctor.reviewCount;

    await doctor.save();

    res.json({
      message:
        "Review Added Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message:
        "Error Adding Review",
    });
  }
});

// Delete Doctor
router.delete("/:id", async (req, res) => {
  try {

    const doctor =
      await Doctor.findById(
        req.params.id
      );

    if (!doctor) {
      return res.status(404).json({
        message:
          "Doctor Not Found",
      });
    }

    const existingAppointments =
      await Appointment.findOne({
        doctorName: doctor.name,
      });

    if (existingAppointments) {
      return res.status(400).json({
        message:
          "Cannot delete doctor with existing appointments",
      });
    }

    await Doctor.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Doctor Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message:
        "Error Deleting Doctor",
    });
  }
});

// Update Doctor
router.put("/:id", async (req, res) => {
  try {
    const doctor =
      await Doctor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json({
      message:
        "Doctor Updated Successfully",
      doctor,
    });

  } catch (error) {
    res.status(500).json({
      message:
        "Error Updating Doctor",
    });
  }
});

module.exports = router;
