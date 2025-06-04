
const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Email transporter setup
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Send OTP email
const sendOTPEmail = async (email, otp, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'ConnectPro - Email Verification',
    html: `
      <h1>Welcome to ConnectPro!</h1>
      <p>Hi ${name},</p>
      <p>Your verification code is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, profile } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create user
    const user = new User({
      name,
      email,
      password,
      role: role || 'client',
      profile: profile || {},
      otpCode: otp,
      otpExpiry
    });

    // Set approval status
    if (user.role === 'provider') {
      user.isApproved = false;
    } else {
      user.isApproved = true;
    }

    await user.save();

    // Send OTP email
    await sendOTPEmail(email, otp, name);

    res.status(201).json({
      message: 'User registered successfully. Please check your email for verification code.',
      userId: user._id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      otpCode: otp,
      otpExpiry: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otpCode = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Verification failed', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    // Generate token
    const token = generateToken(user._id);

    // Return user data
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Refresh token
router.post('/refresh-token', auth, async (req, res) => {
  try {
    const token = generateToken(req.user._id);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Token refresh failed' });
  }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email, isVerified: false });
    if (!user) {
      return res.status(400).json({ message: 'User not found or already verified' });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    user.otpCode = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    await sendOTPEmail(email, otp, user.name);

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to resend OTP' });
  }
});

module.exports = router;
