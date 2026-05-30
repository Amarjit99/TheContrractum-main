const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter using SMTP or mock it
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: process.env.SMTP_PORT || 587,
    auth: {
      user: process.env.SMTP_USER || 'mock_user',
      pass: process.env.SMTP_PASS || 'mock_password',
    },
  });

  const message = {
    from: `${process.env.FROM_NAME || 'The Contractum'} <${process.env.FROM_EMAIL || 'noreply@thecontractum.com'}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
    attachments: options.attachments || [],
  };

  // If we are in production without SMTP config, we just log it as a mock
  if (!process.env.SMTP_USER || process.env.SMTP_USER === 'mock_user') {
    console.log('\n--- MOCK EMAIL SENT ---');
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`HTML Body Snippet: ${options.html.substring(0, 100)}...`);
    if (options.attachments) {
        console.log(`Attachments: ${options.attachments.length}`);
    }
    console.log('-----------------------\n');
    return true; // Pretend it worked
  }

  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
  return info;
};

module.exports = sendEmail;
