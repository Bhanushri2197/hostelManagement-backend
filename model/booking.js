const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  checkIn: { type: Date, default: Date.now },
  checkOut: { type: Date, default: Date.now },
  email: String,
  rooms: String,
  status: { 
    type: String,
    required: true,
    default: 'Pending'
  },
});

const BookingModel = mongoose.model("booking", BookingSchema);
module.exports = BookingModel;
