const express = require('express');
const router = express.Router();
const MiniEvent = require('../models/MiniEvent');
const EventRegistration = require('../models/EventRegistration');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/admin');

// @desc    Get all mini events
// @route   GET /api/mini-events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await MiniEvent.find().populate('creator', 'name email').sort('-createdAt');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Create a mini event
// @route   POST /api/mini-events
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, dateTime, location, capacity, imageUrl } = req.body;
    const event = await MiniEvent.create({
      title,
      description,
      dateTime,
      location,
      capacity,
      imageUrl,
      creator: req.user._id
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc    Update a mini event
// @route   PUT /api/mini-events/:id
// @access  Private/Owner
router.put('/:id', protect, async (req, res) => {
  try {
    let event = await MiniEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    // Allow creator OR admin to edit
    const isOwner = event.creator.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin' || req.user.role === 'super-admin';
    
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to edit this event' });
    }

    event = await MiniEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc    Delete a mini event
// @route   DELETE /api/mini-events/:id
// @access  Private/Owner
router.delete('/:id', protect, async (req, res) => {
  try {
    const event = await MiniEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Allow creator OR admin to delete
    const isOwner = event.creator.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin' || req.user.role === 'super-admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();
    res.json({ message: 'Event removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    RSVP to a mini event
// @route   POST /api/mini-events/:id/rsvp
// @access  Private
router.post('/:id/rsvp', protect, async (req, res) => {
  try {
    const event = await MiniEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const isAttending = event.attendees.includes(req.user._id);

    if (isAttending) {
      // RSVP is locked once confirmed (as per user requirement)
      return res.status(400).json({ message: 'RSVP is already confirmed and locked' });
    } else {
      // Join logic with CONCURRENCY SAFE CAPACITY CHECK
      const updatedEvent = await MiniEvent.findOneAndUpdate(
        { 
          _id: req.params.id, 
          attendees: { $ne: req.user._id }, // Ensure not already joined
          $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] } // Ensure capacity not reached
        },
        { $push: { attendees: req.user._id } },
        { new: true }
      );

      if (!updatedEvent) {
        // Re-check why it failed
        const recheck = await MiniEvent.findById(req.params.id);
        if (recheck.attendees.length >= recheck.capacity) {
          return res.status(400).json({ message: 'Event is at full capacity' });
        }
        return res.status(400).json({ message: 'Already RSVPed or error joining' });
      }
      return res.json(updatedEvent);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc    Get participants for an event
// @route   GET /api/mini-events/:id/participants
// @access  Private/Admin
router.get('/:id/participants', protect, adminOnly, async (req, res) => {
  try {
    const registrations = await EventRegistration.find({ eventId: req.params.id }).sort('-createdAt');
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Toggle featured status of an event
// @route   PATCH /api/mini-events/:id/toggle-featured
// @access  Private/Admin
router.patch('/:id/toggle-featured', protect, adminOnly, async (req, res) => {
  try {
    const event = await MiniEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.featured = !event.featured;
    await event.save();

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
