
const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const { upload, uploadToCloudinary } = require('../middleware/upload');
const Service = require('../models/Service');
const User = require('../models/User');

const router = express.Router();

// Get all services (public)
router.get('/', async (req, res) => {
  try {
    const { category, location, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;
    
    const filters = { availability: true };
    
    if (category) filters.category = category;
    if (location) filters.location = new RegExp(location, 'i');
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }
    if (search) {
      filters.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const services = await Service.find(filters)
      .populate('providerId', 'name profile.businessName profile.location profile.avatar')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Service.countDocuments(filters);

    res.json({
      services,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: total
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get services', error: error.message });
  }
});

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('providerId', 'name profile.businessName profile.location profile.avatar profile.phone profile.description')
      .populate('reviews.clientId', 'name profile.avatar');

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get service', error: error.message });
  }
});

// Create service (providers only)
router.post('/', auth, authorize(['provider']), upload.array('images', 5), async (req, res) => {
  try {
    if (!req.user.isApproved) {
      return res.status(403).json({ message: 'Provider not approved yet' });
    }

    const { title, category, description, price, priceType, location, features, serviceArea } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

    // Upload images to Cloudinary
    const imageUrls = await Promise.all(
      req.files.map(file => uploadToCloudinary(file.buffer, 'services'))
    );

    const service = new Service({
      providerId: req.user._id,
      title,
      category,
      description,
      price,
      priceType,
      location,
      images: imageUrls,
      features: features ? JSON.parse(features) : [],
      serviceArea: serviceArea ? JSON.parse(serviceArea) : []
    });

    await service.save();
    await service.populate('providerId', 'name profile.businessName profile.location');

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create service', error: error.message });
  }
});

// Update service (provider only)
router.put('/:id', auth, authorize(['provider']), upload.array('images', 5), async (req, res) => {
  try {
    const service = await Service.findOne({ _id: req.params.id, providerId: req.user._id });
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const { title, category, description, price, priceType, location, availability, features, serviceArea } = req.body;

    // Update basic fields
    if (title) service.title = title;
    if (category) service.category = category;
    if (description) service.description = description;
    if (price) service.price = price;
    if (priceType) service.priceType = priceType;
    if (location) service.location = location;
    if (typeof availability !== 'undefined') service.availability = availability;
    if (features) service.features = JSON.parse(features);
    if (serviceArea) service.serviceArea = JSON.parse(serviceArea);

    // Handle new images
    if (req.files && req.files.length > 0) {
      const newImageUrls = await Promise.all(
        req.files.map(file => uploadToCloudinary(file.buffer, 'services'))
      );
      service.images = [...service.images, ...newImageUrls];
    }

    await service.save();
    await service.populate('providerId', 'name profile.businessName profile.location');

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update service', error: error.message });
  }
});

// Delete service (provider only)
router.delete('/:id', auth, authorize(['provider']), async (req, res) => {
  try {
    const service = await Service.findOneAndDelete({ 
      _id: req.params.id, 
      providerId: req.user._id 
    });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error: error.message });
  }
});

// Get provider's services
router.get('/provider/my-services', auth, authorize(['provider']), async (req, res) => {
  try {
    const services = await Service.find({ providerId: req.user._id })
      .sort({ createdAt: -1 });

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get services', error: error.message });
  }
});

// Add review (clients only)
router.post('/:id/reviews', auth, authorize(['client']), async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if user already reviewed
    const existingReview = service.reviews.find(
      review => review.clientId.toString() === req.user._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this service' });
    }

    service.reviews.push({
      clientId: req.user._id,
      rating,
      comment
    });

    service.updateRating();
    await service.save();

    await service.populate('reviews.clientId', 'name profile.avatar');

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review', error: error.message });
  }
});

module.exports = router;
