var express = require('express');
var router = express.Router();
const notificationModel = require('../model/notification');

// POST request to add room
router.post('/notification', (req, res) => {
  const {  notification } = req.body;

  notificationModel.create({
    notification 
  })
  .then(notification => res.json(notification))
  .catch(err => res.status(500).json({ error: err.message }));
});

router.get('/notification', (req, res) => {
  notificationModel.find()
    .then(notification => res.json(notification))
    .catch(err => res.status(500).json({ error: err.message }));
});

router.delete("/notification/:_id", async (req, res) => {
    try {
      const deletedRequest = await notificationModel.findByIdAndDelete(req.params._id);
      if (!deletedRequest) {
        return res.status(404).json({ message: "Booking request not found" });
      }
      res.json({ message: "Request deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;