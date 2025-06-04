
const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User');

const router = express.Router();

// Create booking (clients only)
router.post('/', auth, authorize(['client']), async (req, res) => {
  try {
    const { serviceId, eventDate, eventLocation, notes, clientContact } = req.body;

    // Verify service exists
    const service = await Service.findById(serviceId).populate('providerId');
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (!service.availability) {
      return res.status(400).json({ message: 'Service is not available' });
    }

    const booking = new Booking({
      clientId: req.user._id,
      serviceId,
      providerId: service.providerId._id,
      bookingDate: new Date(),
      eventDate: new Date(eventDate),
      eventLocation,
      totalAmount: service.price,
      notes,
      clientContact
    });

    await booking.save();
    await booking.populate([
      { path: 'serviceId', select: 'title category images price' },
      { path: 'providerId', select: 'name profile.businessName profile.phone profile.email' }
    ]);

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
});

// Get user's bookings
router.get('/history', auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const filters = {};
    if (req.user.role === 'client') {
      filters.clientId = req.user._id;
    } else if (req.user.role === 'provider') {
      filters.providerId = req.user._id;
    }

    if (status) filters.status = status;

    const bookings = await Booking.find(filters)
      .populate('serviceId', 'title category images price')
      .populate('clientId', 'name profile.avatar profile.phone')
      .populate('providerId', 'name profile.businessName profile.phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(filters);

    res.json({
      bookings,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get booking history', error: error.message });
  }
});

// Get single booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('serviceId', 'title category images price description')
      .populate('clientId', 'name profile.avatar profile.phone profile.email')
      .populate('providerId', 'name profile.businessName profile.phone profile.email profile.avatar');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user has access to this booking
    if (booking.clientId._id.toString() !== req.user._id.toString() && 
        booking.providerId._id.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get booking', error: error.message });
  }
});

// Update booking status (providers only)
router.put('/:id/status', auth, authorize(['provider']), async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findOne({ 
      _id: req.params.id, 
      providerId: req.user._id 
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    await booking.populate([
      { path: 'serviceId', select: 'title category images price' },
      { path: 'clientId', select: 'name profile.avatar profile.phone' }
    ]);

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking status', error: error.message });
  }
});

// Cancel booking
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user can cancel this booking
    if (booking.clientId.toString() !== req.user._id.toString() && 
        booking.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel completed booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel booking', error: error.message });
  }
});

module.exports = router;
