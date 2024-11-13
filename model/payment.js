const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    email: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true }, // Corrected to lowercase 'status'
    token: { type: String, required: true }   // Added token field to store the unique transaction ID
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

const PaymentModel = mongoose.model('Payment', PaymentSchema);

module.exports = PaymentModel;