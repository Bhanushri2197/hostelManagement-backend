const sgMail = require('@sendgrid/mail');

// Set your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Function to send the email
const sendWelcomeEmail = async (email, name) => {
  const msg = {
    to: email,
    from: 'steffynajones@gmail.com',  // Verified SendGrid email address
    subject: 'Welcome to HostelStyle',
    text: `Hello ${name}, welcome to HostelStyle! We're excited to have you on board.`,
    html: `<strong>Hello ${name},</strong><br><br>Welcome to <strong>HostelStyle</strong>! We're excited to have you on board.`,
  };

  try {
    await sgMail.send(msg);
    console.log('Welcome email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendWelcomeEmail;
