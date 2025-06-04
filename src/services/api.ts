
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  verifyOTP: (email: string, otp: string) => api.post('/auth/verify-otp', { email, otp }),
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  refreshToken: () => api.post('/auth/refresh-token'),
  resendOTP: (email: string) => api.post('/auth/resend-otp', { email }),
};

// User APIs
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData: any) => api.put('/users/profile', profileData),
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/users/upload-avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  uploadPortfolio: (files: FileList) => {
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('portfolio', file));
    return api.post('/users/upload-portfolio', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Service APIs
export const serviceAPI = {
  getServices: (params?: any) => api.get('/services', { params }),
  getService: (id: string) => api.get(`/services/${id}`),
  createService: (serviceData: any, images: FileList) => {
    const formData = new FormData();
    Object.keys(serviceData).forEach(key => {
      if (Array.isArray(serviceData[key])) {
        formData.append(key, JSON.stringify(serviceData[key]));
      } else {
        formData.append(key, serviceData[key]);
      }
    });
    Array.from(images).forEach(file => formData.append('images', file));
    return api.post('/services', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateService: (id: string, serviceData: any, images?: FileList) => {
    const formData = new FormData();
    Object.keys(serviceData).forEach(key => {
      if (Array.isArray(serviceData[key])) {
        formData.append(key, JSON.stringify(serviceData[key]));
      } else {
        formData.append(key, serviceData[key]);
      }
    });
    if (images) {
      Array.from(images).forEach(file => formData.append('images', file));
    }
    return api.put(`/services/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteService: (id: string) => api.delete(`/services/${id}`),
  getMyServices: () => api.get('/services/provider/my-services'),
  addReview: (id: string, rating: number, comment: string) =>
    api.post(`/services/${id}/reviews`, { rating, comment }),
};

// Booking APIs
export const bookingAPI = {
  createBooking: (bookingData: any) => api.post('/bookings', bookingData),
  getBookingHistory: (params?: any) => api.get('/bookings/history', { params }),
  getBooking: (id: string) => api.get(`/bookings/${id}`),
  updateBookingStatus: (id: string, status: string) => 
    api.put(`/bookings/${id}/status`, { status }),
  cancelBooking: (id: string) => api.put(`/bookings/${id}/cancel`),
};

// Admin APIs
export const adminAPI = {
  getProviders: (status?: string) => api.get('/admin/providers', { params: { status } }),
  approveProvider: (id: string, approved: boolean) => 
    api.put(`/admin/providers/${id}/approve`, { approved }),
  getAnalytics: () => api.get('/admin/analytics'),
  getUsers: (params?: any) => api.get('/admin/users', { params }),
  deleteUser: (id: string) => api.delete(`/admin/users/${id}`),
};

export default api;
