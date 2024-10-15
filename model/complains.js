const mongoose = require("mongoose");

const complainSchema = new mongoose.Schema({
  complainTitle: String,
  email: String,
  roomNo: String,
  description: String,
  status: { 
    type: String,
    required: true,
    default: 'Pending'
  }, 
  createdAt: {
    type: Date,
required:true,
    default: Date.now()
  },

}, { timestamps: true }); 

const ComplainsModel = mongoose.model("Complains", complainSchema);
module.exports = ComplainsModel;
