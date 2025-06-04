
const express = require('express');
const { auth } = require('../middleware/auth');
const { upload, uploadToCloudinary } = require('../middleware/upload');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -otpCode -otpExpiry');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get profile' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, profile } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (profile) updateData.profile = { ...req.user.profile, ...profile };

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password -otpCode -otpExpiry');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

// Upload avatar
router.post('/upload-avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const avatarUrl = await uploadToCloudinary(req.file.buffer, 'avatars');

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 'profile.avatar': avatarUrl },
      { new: true }
    ).select('-password -otpCode -otpExpiry');

    res.json({ avatar: avatarUrl, user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload avatar', error: error.message });
  }
});

// Upload portfolio images (for providers)
router.post('/upload-portfolio', auth, upload.array('portfolio', 10), async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ message: 'Only providers can upload portfolio' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const portfolioUrls = await Promise.all(
      req.files.map(file => uploadToCloudinary(file.buffer, 'portfolio'))
    );

    const currentPortfolio = req.user.profile.portfolio || [];
    const updatedPortfolio = [...currentPortfolio, ...portfolioUrls];

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { 'profile.portfolio': updatedPortfolio },
      { new: true }
    ).select('-password -otpCode -otpExpiry');

    res.json({ portfolio: updatedPortfolio, user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload portfolio', error: error.message });
  }
});

module.exports = router;
