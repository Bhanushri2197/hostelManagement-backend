const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const { v4: uuidv4 } = require('uuid');
const paymentModel = require('../model/payment');

router.post('/bill', async function(req, res) {
    const { email, price, token } = req.body;

    if (!email || !price || !token || !token.id || !token.email) {
        return res.status(400).json({ message: "Missing required payment information." });
    }

    try {
        const transactionKey = uuidv4();

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const charge = await stripe.charges.create({
            amount: price, // Amount in paise (cents)
            currency: "inr",
            customer: customer.id,
            receipt_email: email,
            description: "Room Booking Payment"
        });

        const payment = new paymentModel({
            email: email,
            price: price / 100, // Store as original currency amount
            status: charge.status,
            token: transactionKey
        });

        const savedPayment = await payment.save();
        res.json({
            message: "Payment processed successfully",
            payment: savedPayment
        });

    } catch (error) {
        console.error("Payment processing error:", error);
        res.status(500).json({ message: "Payment failed", error: error.message });
    }
});

module.exports = router;
