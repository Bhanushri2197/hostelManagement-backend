var express = require("express");
var router = express.Router();
const UsersModel = require("../model/users");
const sendWelcomeEmail = require('../utils/sentMail');  // Assuming this is your email sending utility
const bcrypt = require("bcrypt"); 

/* POST sign-in (registration). */
router.post("/sign-in", async function (req, res, next) {
  try {
    const { name, email, phone, role, password } = req.body;

    // Check if user already exists
    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UsersModel({
      name,
      email,
      phone,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    // Send the welcome email
    try {
      await sendWelcomeEmail(newUser.email, newUser.name);  // Use newUser instead of user
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
    }

    res.status(201).json({ message: "User SignIn success.." });
  } catch (err) {
    console.error('Sign-in Error:', err);
    res.status(500).json({ message: "Error signing in", error: err.message });
  }
});

/* POST log-in (authentication). */
router.post('/log-in', async function (req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await UsersModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Return user data along with login success
    res.status(200).json({ message: "Login successful", user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
