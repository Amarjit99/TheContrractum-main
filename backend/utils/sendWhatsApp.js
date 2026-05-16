const sendWhatsApp = async (options) => {
  // Mock WhatsApp API call
  // In a real application, you would use Twilio, MessageBird, or WhatsApp Business API here

  const messagePayload = {
    to: options.phone,
    text: options.message,
  };

  if (!process.env.TWILIO_ACCOUNT_SID || process.env.WHATSAPP_MOCK === 'true') {
    console.log('\n--- MOCK WHATSAPP MESSAGE SENT ---');
    console.log(`To: ${options.phone}`);
    console.log(`Message: ${options.message}`);
    console.log('----------------------------------\n');
    return true; // Pretend it worked
  }

  // TODO: Add actual API call here when keys are provided
  return true;
};

module.exports = sendWhatsApp;
