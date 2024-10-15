const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  checkIn: { type: Date, default: Date.now },
  checkOut: { type: Date, default: Date.now },
  guest: Number,
  rooms: String
});

const BookingModel = mongoose.model("booking", BookingSchema);
module.exports = BookingModel;
