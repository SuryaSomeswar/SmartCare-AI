const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Users",
    });
  }
});
router.put(
  "/reset-password/:id",
  async (req, res) => {
    try {
      const { password } = req.body;

      await User.findByIdAndUpdate(
        req.params.id,
        { password }
      );

      res.json({
        message:
          "Password Reset Successfully",
      });

    } catch (error) {
      res.status(500).json({
        message:
          "Failed To Reset Password",
      });
    }
  }
);

module.exports = router;
