var express = require('express');
var router = express.Router();
const BookingModel = require('../model/booking');

// POST request to add room
router.post('/booking-request', (req, res) => {
  const {  checkIn,checkOut,guest, rooms } = req.body;

  BookingModel.create({
    checkIn,
    checkOut,
    guest,
    rooms
  })
  .then(booking => res.json(booking))
  .catch(err => res.status(500).json({ error: err.message }));
});

// GET request to fetch all rooms
router.get('/booking-request', (req, res) => {
  BookingModel.find()
    .then(booking => res.json(booking))
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET request to fetch room by ID
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

// PUT request to update room by ID
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
