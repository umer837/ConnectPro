
# ConnectPro Backend API

A comprehensive Node.js + Express + MongoDB backend for the ConnectPro service provider platform.

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Email + OTP verification
  - Role-based access control (Client, Provider, Admin)
  - Password encryption with bcrypt

- **File Upload & Storage**
  - Cloudinary integration for image hosting
  - Profile pictures and service images
  - Portfolio management for providers

- **Core APIs**
  - User management and profiles
  - Service listing and management
  - Booking system with status tracking
  - Review and rating system
  - Admin panel for provider approvals

- **Email Integration**
  - Nodemailer for email services
  - OTP verification emails
  - Registration confirmations

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account
- Gmail account (for email service)

### 1. Clone & Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the following variables:
```env
MONGODB_URI=mongodb://localhost:27017/connectpro
JWT_SECRET=your_super_secure_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Gmail App Password Setup
1. Enable 2-factor authentication in Gmail
2. Generate an app password for the application
3. Use this app password in `EMAIL_PASS`

### 4. Cloudinary Setup
1. Create account at cloudinary.com
2. Get your cloud name, API key, and API secret
3. Add these to your `.env` file

### 5. Start the Server
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "client", // or "provider"
  "profile": {
    "phone": "+1234567890",
    "businessName": "Business Name", // for providers
    "category": "Photography", // for providers
    "description": "Service description"
  }
}
```

#### Verify OTP
```
POST /api/auth/verify-otp
{
  "email": "john@example.com",
  "otp": "123456"
}
```

#### Login
```
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Service Endpoints

#### Get All Services
```
GET /api/services?category=Photography&location=New York&page=1&limit=10
```

#### Create Service (Provider Only)
```
POST /api/services
Content-Type: multipart/form-data

{
  "title": "Wedding Photography",
  "category": "Photography",
  "description": "Professional wedding photography",
  "price": 500,
  "priceType": "per_event",
  "location": "New York",
  "features": ["Digital Gallery", "2 Photographers"],
  "images": [file1, file2, file3]
}
```

#### Update Service
```
PUT /api/services/:id
```

#### Delete Service
```
DELETE /api/services/:id
```

### Booking Endpoints

#### Create Booking
```
POST /api/bookings
{
  "serviceId": "service_id",
  "eventDate": "2024-06-15T10:00:00Z",
  "eventLocation": "Event venue address",
  "notes": "Special requirements",
  "clientContact": {
    "phone": "+1234567890",
    "email": "client@example.com"
  }
}
```

#### Get Booking History
```
GET /api/bookings/history?status=pending&page=1&limit=10
```

### Admin Endpoints

#### Get Pending Providers
```
GET /api/admin/providers?status=pending
```

#### Approve/Reject Provider
```
PUT /api/admin/providers/:id/approve
{
  "approved": true
}
```

#### Get Analytics
```
GET /api/admin/analytics
```

## 🗃️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // hashed
  role: ['client', 'provider', 'admin'],
  isVerified: Boolean,
  isApproved: Boolean,
  profile: {
    phone: String,
    avatar: String,
    businessName: String,
    category: String,
    description: String,
    location: String,
    priceRange: String,
    portfolio: [String]
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Services Collection
```javascript
{
  _id: ObjectId,
  providerId: ObjectId,
  title: String,
  category: String,
  description: String,
  images: [String],
  price: Number,
  priceType: String,
  location: String,
  availability: Boolean,
  rating: Number,
  totalReviews: Number,
  reviews: [{
    clientId: ObjectId,
    rating: Number,
    comment: String,
    date: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Bookings Collection
```javascript
{
  _id: ObjectId,
  clientId: ObjectId,
  serviceId: ObjectId,
  providerId: ObjectId,
  bookingDate: Date,
  eventDate: Date,
  eventLocation: String,
  status: ['pending', 'confirmed', 'completed', 'cancelled'],
  totalAmount: Number,
  paymentStatus: String,
  notes: String,
  clientContact: {
    phone: String,
    email: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS configuration
- Input validation and sanitization
- Rate limiting (can be added)
- Helmet for security headers

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/connectpro
JWT_SECRET=your_production_jwt_secret
CLIENT_URL=https://yourdomain.com
```

### Deployment Platforms
- **Heroku**: Easy deployment with MongoDB Atlas
- **Vercel**: Serverless deployment
- **DigitalOcean**: VPS deployment
- **AWS EC2**: Full control deployment

## 📝 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.
```
