const mongoose = require('mongoose');

// Schema definition
const UsersSchema = new mongoose.Schema({
  name: String,
  email: String, 
  phone: Number,
  role: String,
  password: { type: String, required: true }, 
});

// Mongoose model export
const UsersModel = mongoose.model("Users", UsersSchema);
module.exports = UsersModel;
