
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Photography', 'Videography', 'Catering', 'Event Planning']
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  price: {
    type: Number,
    required: true,
    min: 0
  },
  priceType: {
    type: String,
    enum: ['per_hour', 'per_event', 'per_person', 'fixed'],
    default: 'per_event'
  },
  location: {
    type: String,
    required: true
  },
  availability: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  features: [String],
  serviceArea: [String]
}, {
  timestamps: true
});

// Update rating when reviews change
serviceSchema.methods.updateRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.totalReviews = 0;
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating = totalRating / this.reviews.length;
    this.totalReviews = this.reviews.length;
  }
};

module.exports = mongoose.model('Service', serviceSchema);
