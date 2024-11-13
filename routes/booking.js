var express = require('express');
var router = express.Router();
const BookingModel = require('../model/booking');
const sendBookingReqEmail = require('../utils/nodeMails/bookingMail'); // Assuming this is the utility for sending emails
const sendBookingAcceptEmail = require("../utils/nodeMails/conformBooking")
// POST request to add room
router.post('/booking-request', async (req, res) => {
  const { checkIn, checkOut, email, rooms,status } = req.body;

  try {
    // Create a new booking request
    const booking = await BookingModel.create({
      checkIn,
      checkOut,
      email,
      rooms,
      status
    });

    // Send booking request confirmation email
    try {
      await sendBookingReqEmail(email);
    } catch (emailError) {
      console.error('Error sending booking request email:', emailError);
    }

    // Return the created booking as response
    res.json(booking);

  } catch (err) {
    // Catch and handle errors in booking creation
    res.status(500).json({ error: err.message });
  }
});

// GET request to fetch all bookings
router.get('/booking-request', (req, res) => {
  BookingModel.find()
    .then(booking => res.json(booking))
    .catch(err => res.status(500).json({ error: err.message }));
});
router.put("/booking-request/:_id", async (req, res) => {
  try {
    const updatedRequest = await BookingModel.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!updatedRequest) {    
      return res.status(404).json({ message: "Request not found" });
    }
    await sendBookingAcceptEmail(updatedRequest.email); 
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET request to fetch booking by ID
router.get('/booking-request/:_id', async (req, res) => {
  try {
    const room = await BookingModel.findById(req.params._id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE request to delete booking by ID
router.delete("/booking-request/:_id", async (req, res) => {
  try {
    const deletedRequest = await BookingModel.findByIdAndDelete(req.params._id);
    if (!deletedRequest) {
      return res.status(404).json({ message: "Booking request not found" });
    }
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT request to update booking by ID
router.put("/booking-request/:_id", async (req, res) => {
  try {
    const updatedRoom = await BookingModel.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

module.exports = router;
