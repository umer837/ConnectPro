
const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');

const router = express.Router();

// Get pending providers
router.get('/providers', auth, authorize(['admin']), async (req, res) => {
  try {
    const { status = 'pending' } = req.query;
    
    const filters = { role: 'provider' };
    if (status === 'pending') {
      filters.isApproved = false;
      filters.isVerified = true;
    } else if (status === 'approved') {
      filters.isApproved = true;
    }

    const providers = await User.find(filters)
      .select('-password -otpCode -otpExpiry')
      .sort({ createdAt: -1 });

    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get providers', error: error.message });
  }
});

// Approve/reject provider
router.put('/providers/:id/approve', auth, authorize(['admin']), async (req, res) => {
  try {
    const { approved } = req.body;

    const provider = await User.findOne({ 
      _id: req.params.id, 
      role: 'provider' 
    }).select('-password -otpCode -otpExpiry');

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    provider.isApproved = approved;
    await provider.save();

    res.json({
      message: `Provider ${approved ? 'approved' : 'rejected'} successfully`,
      provider
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update provider status', error: error.message });
  }
});

// Get analytics
router.get('/analytics', auth, authorize(['admin']), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalClients = await User.countDocuments({ role: 'client' });
    const totalProviders = await User.countDocuments({ role: 'provider' });
    const approvedProviders = await User.countDocuments({ role: 'provider', isApproved: true });
    const pendingProviders = await User.countDocuments({ role: 'provider', isApproved: false, isVerified: true });
    
    const totalServices = await Service.countDocuments();
    const activeServices = await Service.countDocuments({ availability: true });
    
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });

    // Monthly stats
    const currentYear = new Date().getFullYear();
    const monthlyBookings = await Booking.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    const categoryStats = await Service.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);

    res.json({
      overview: {
        totalUsers,
        totalClients,
        totalProviders,
        approvedProviders,
        pendingProviders,
        totalServices,
        activeServices,
        totalBookings,
        completedBookings,
        pendingBookings
      },
      monthlyBookings,
      categoryStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get analytics', error: error.message });
  }
});

// Get all users
router.get('/users', auth, authorize(['admin']), async (req, res) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;
    
    const filters = {};
    if (role) filters.role = role;

    const users = await User.find(filters)
      .select('-password -otpCode -otpExpiry')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments(filters);

    res.json({
      users,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get users', error: error.message });
  }
});

// Delete user
router.delete('/users/:id', auth, authorize(['admin']), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin user' });
    }

    // Delete user's services if provider
    if (user.role === 'provider') {
      await Service.deleteMany({ providerId: user._id });
    }

    // Update bookings to mark user as deleted
    await Booking.updateMany(
      { $or: [{ clientId: user._id }, { providerId: user._id }] },
      { $set: { status: 'cancelled' } }
    );

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
});

module.exports = router;
