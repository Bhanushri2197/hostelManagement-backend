require('dotenv').config();
var nodemailer = require('nodemailer');

// Create transporter
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_ACCOUNT,  
    pass: process.env.GOOGLE_ACCOUNT_PASS  
  }
});

// Send test email
const sendBookingReqEmail = async (to) => {
    var mailOptions = {
      from: 'steffynajones@gmail.com',
      to: to, 
      subject: 'Your Booking Request is Sent Successfully - HostelStyle',
      text: `Hello , Thank you for Choosing HostelStyle, Your Booking Request is Sent Successfully , Please wait for our conformation`,
      html: `<strong>Hello ,</strong><br><br>Welcome to <strong>HostelStyle</strong> Thank you for Choosing HostelStyle, Your Booking Request is Sent Successfully , Please wait for our conformation`
    };
  
    // Send the email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.log('Error sending email: ' + error);
      throw error;
    }
  };

module.exports = sendBookingReqEmail;
