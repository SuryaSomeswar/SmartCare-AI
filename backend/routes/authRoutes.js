const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } =
      req.body;
    if (
  password.length < 8
) {
  return res.status(400).json({
    message:
      "Password must be at least 8 characters long",
  });
}

if (
  !/[A-Z]/.test(password)
) {
  return res.status(400).json({
    message:
      "Password must contain at least one uppercase letter",
  });
}

if (
  !/[a-z]/.test(password)
) {
  return res.status(400).json({
    message:
      "Password must contain at least one lowercase letter",
  });
}

if (
  !/[0-9]/.test(password)
) {
  return res.status(400).json({
    message:
      "Password must contain at least one number",
  });
}
    const existingUser =
  await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({
    message: "Email already exists",
  });
}

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({
      message:
        "User Registered Successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      message: "Login Successful",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
