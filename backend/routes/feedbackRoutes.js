const express = require("express");
const router = express.Router();

const Feedback = require("../models/Feedback");

// Submit Feedback
router.post("/", async (req, res) => {
  try {
    const feedback = new Feedback({
      name: req.body.name,
      message: req.body.message,
    });

    await feedback.save();

    res.json({
      message:
        "Feedback Submitted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Error Submitting Feedback",
    });
  }
});

// Get All Feedback
router.get("/", async (req, res) => {
  try {
    const feedback =
      await Feedback.find().sort({
        createdAt: -1,
      });

    res.json(feedback);
  } catch (error) {
    res.status(500).json({
      message:
        "Error Fetching Feedback",
    });
  }
});

module.exports = router;