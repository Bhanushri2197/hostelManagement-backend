const mongoose = require('mongoose');

const RoomsSchema = new mongoose.Schema({
  roomTitle: String,
  roomImg: String,
  availability: Number,
  price: Number,
  description: String
});

const RoomsModel = mongoose.model("rooms", RoomsSchema);
module.exports = RoomsModel;
