var express = require('express');
var router = express.Router();
const RoomsModel = require('../model/rooms');
const UploadImg = require('../model/uploadImg')



// POST request to add room
router.post('/rooms', async (req, res) => {
    try {
      const { roomTitle, availability, price, description, roomImg } = req.body;
      const uploadedImageUrl = await UploadImg(roomImg); 
      
      const newRoom = await RoomsModel.create({
        roomTitle,
        roomImg: uploadedImageUrl, 
        availability,
        price,
        description
      });
      
      res.json(newRoom);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// GET request to fetch all rooms
router.get('/rooms', (req, res) => {
  RoomsModel.find()
    .then(rooms => res.json(rooms))
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET request to fetch room by ID
router.get('/rooms/:_id', async (req, res) => {
  try {
    const room = await RoomsModel.findById(req.params._id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT request to update room by ID
router.put("/rooms/:_id", async (req, res) => {
  try {
    const updatedRoom = await RoomsModel.findByIdAndUpdate(req.params._id, req.body, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(updatedRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE request to delete room by ID
router.delete("/rooms/:_id", async (req, res) => {
  try {
    const deletedRoom = await RoomsModel.findByIdAndDelete(req.params._id);
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
