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
const sendWelcomeEmail = async (to, name) => {
  var mailOptions = {
    from: process.env.GOOGLE_ACCOUNT,
    to: to, 
    subject: 'Welcome to HostelStyle',
    text: `Hello ${name}, welcome to HostelStyle! We're excited to have you on board.`,
    html: `<strong>Hello ${name},</strong><br><br>Welcome to <strong>HostelStyle</strong>! We're excited to have you on board.`
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

module.exports = sendWelcomeEmail;
