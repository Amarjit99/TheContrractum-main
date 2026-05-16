const cron = require('node-cron');
const Certificate = require('../models/Certificate');
const sendEmail = require('./sendEmail');

const checkExpiries = async () => {
    try {
        console.log('[Expiry Notifier] Checking for expiring certificates...');
        
        const now = new Date();
        now.setHours(0,0,0,0);
        
        const certificates = await Certificate.find({
            status: 'Issued',
            validUntil: { $exists: true, $ne: null },
            recipientEmail: { $exists: true, $ne: '' }
        });

        let notifiedCount = 0;

        for (const cert of certificates) {
            const expiryDate = new Date(cert.validUntil);
            expiryDate.setHours(0,0,0,0);
            
            const diffTime = expiryDate - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Notify at 30, 7, and 1 days before expiry
            if (diffDays === 30 || diffDays === 7 || diffDays === 1) {
                const emailHtml = `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
                        <h2 style="color: #d97706; margin-top: 0;">Certificate Expiration Warning</h2>
                        <p>Hello <strong>${cert.name}</strong>,</p>
                        <p>This is a gentle reminder that your digital certificate from The Contractum is scheduled to expire in <strong>${diffDays} day(s)</strong>.</p>
                        <div style="background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
                            <strong>Certificate Details:</strong><br/>
                            ID: ${cert.certificateId}<br/>
                            Type: ${cert.type}<br/>
                            Expires On: ${expiryDate.toDateString()}
                        </div>
                        <p>Please contact your department head or the HR team to initiate the renewal process if required.</p>
                        <p>Best regards,<br/>The Contractum</p>
                    </div>
                `;

                await sendEmail({
                    email: cert.recipientEmail,
                    subject: `Action Required: Your Certificate Expires in ${diffDays} Days`,
                    html: emailHtml
                }).catch(e => console.error(`Failed to send expiry email to ${cert.recipientEmail}:`, e));
                
                notifiedCount++;
            } else if (diffDays < 0) {
                // Auto-mark as Expired if the date has passed
                cert.status = 'Expired';
                await cert.save();
                console.log(`[Expiry Notifier] Auto-marked certificate ${cert.certificateId} as Expired.`);
            }
        }
        
        console.log(`[Expiry Notifier] Check complete. Sent ${notifiedCount} expiry warnings.`);

    } catch (err) {
        console.error('[Expiry Notifier] Error checking expiries:', err);
    }
};

const initializeExpiryCron = () => {
    // Run daily at 09:00 AM
    cron.schedule('0 9 * * *', () => {
        checkExpiries();
    });
    console.log('[System] Expiry Notifier cron scheduled (Runs: Daily at 09:00 AM)');
};

module.exports = { checkExpiries, initializeExpiryCron };
