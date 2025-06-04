
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventLocation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentId: String,
  notes: String,
  clientContact: {
    phone: String,
    email: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
