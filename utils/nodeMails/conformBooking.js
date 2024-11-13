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
const sendBookingAcceptEmail = async (email) => {
    var mailOptions = {
      from: process.env.GOOGLE_ACCOUNT,
      to: email,  
      subject: 'Your Booking is Conformed - HostelStyle',
      text: `Hello , Thank you for Choosing HostelStyle, Your Booking Request is Conformed , Please come and Visit our Hostel for Upcoming phase`,
      html: `<strong>Hello ,</strong><br><br>Welcome to <strong>HostelStyle</strong>! Thank you for Choosing HostelStyle, Your Booking Request is Conformed , Please come and Visit our Hostel for Upcoming phase`
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

module.exports = sendBookingAcceptEmail;
