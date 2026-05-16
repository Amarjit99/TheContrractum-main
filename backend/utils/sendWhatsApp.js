const twilio = require('twilio');

const sendWhatsApp = async (options) => {
  // If we are in development without credentials, use the mock logger
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || process.env.WHATSAPP_MOCK === 'true') {
    console.log('\n--- MOCK WHATSAPP MESSAGE SENT ---');
    console.log(`To: ${options.phone}`);
    console.log(`Message: ${options.message}`);
    console.log('----------------------------------\n');
    return true; // Pretend it worked
  }

  try {
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    
    // Ensure the phone number includes the WhatsApp sandbox/production prefix
    const toPhone = options.phone.startsWith('whatsapp:') ? options.phone : `whatsapp:${options.phone}`;
    const fromPhone = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886'; // Default Twilio Sandbox Number

    const message = await client.messages.create({
      body: options.message,
      from: fromPhone,
      to: toPhone
    });

    console.log(`[WhatsApp] Message successfully sent to ${toPhone} (SID: ${message.sid})`);
    return message;
  } catch (error) {
    console.error('[WhatsApp] Failed to send message via Twilio:', error.message);
    throw error;
  }
};

module.exports = sendWhatsApp;
