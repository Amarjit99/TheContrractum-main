const express = require('express');
const router = express.Router();
const SubscriptionCount = require('../models/SubscriptionCount');
const NewsletterSubscription = require('../models/NewsletterSubscription');

// POST /api/subscription/subscribe
// Increments the global subscription count (e.g. for blog posts)
router.post('/subscribe', async (req, res) => {
  try {
    let subscription = await SubscriptionCount.findOne();
    if (!subscription) {
      subscription = new SubscriptionCount({ count: 0 });
    }
    
    subscription.count += 1;
    await subscription.save();
    
    res.status(200).json({
      success: true,
      message: 'Subscription successful',
      count: subscription.count
    });
  } catch (err) {
    console.error('Error incrementing subscription count:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/subscription/count
// Returns the current global subscription count
router.get('/count', async (req, res) => {
  try {
    const subscription = await SubscriptionCount.findOne();
    const count = subscription ? subscription.count : 0;
    res.status(200).json({ success: true, count });
  } catch (err) {
    console.error('Error fetching subscription count:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// POST /api/subscription/newsletter
// Stores a new newsletter subscription email
router.post('/newsletter', async (req, res) => {
  const { email, source, fullName, industryPreference } = req.body;
  if (!email || !source) {
    return res.status(400).json({ success: false, message: "Email and source are required" });
  }

  try {
    const existing = await NewsletterSubscription.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already subscribed" });
    }

    const newSubscription = new NewsletterSubscription({ 
      email: email.toLowerCase(), 
      source,
      fullName: fullName || '',
      industryPreference: industryPreference || ''
    });
    await newSubscription.save();

    // Create Notification
    const Notification = require("../models/Notification");
    const nameStr = fullName ? `${fullName} (${email})` : email;
    const indStr = industryPreference ? ` (Preferred: ${industryPreference})` : '';
    await Notification.create({
      type: 'Newsletter',
      title: 'New Newsletter Sub',
      message: `${nameStr} has subscribed to the newsletter via ${source}${indStr}.`,
      link: `/admin/submissions?tab=newsletter&id=${newSubscription._id}`
    });

    res.status(201).json({
      success: true,
      message: 'Subscribed successfully',
      subscription: newSubscription
    });
  } catch (err) {
    console.error('Error saving newsletter subscription:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
