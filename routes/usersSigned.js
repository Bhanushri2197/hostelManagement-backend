var express = require("express");
var router = express.Router();
const UsersModel = require("../model/users");
const sendWelcomeEmail = require('../utils/nodeMails/welcomeMail');  
const bcrypt = require("bcrypt"); 

/* POST sign-in (registration). */
router.post("/sign-in", async function (req, res, next) {
  try {
    const { name, email, phone, role,roomNo, password } = req.body;

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
      roomNo,
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

router.get('/users', (req, res) => {
  UsersModel.find()
    .then(user => res.json(user))
    .catch(err => res.status(500).json({ error: err.message }));
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
    res.status(200).json({ message: "Login successful", user: { _id: user._id, name: user.name, email: user.email ,role: user.role } });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT request to update room by ID
router.put("/users/:_id", async (req, res) => {
  try {
    const updatedUser = await UsersModel.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users/:_id', async (req, res) => {
  try {
    const user = await  UsersModel.findById(req.params._id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/users/:_id", async (req, res) => {
  try {
    const deletedUser = await UsersModel.findByIdAndDelete(req.params._id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
