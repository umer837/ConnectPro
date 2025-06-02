
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Lock, Briefcase, MapPin, DollarSign } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';

interface ServiceProviderFormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
}

const ServiceProviderRegistrationForm = ({ onSubmit, loading = false }: ServiceProviderFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'provider',
    businessName: '',
    category: '',
    description: '',
    experience: '',
    location: '',
    priceRange: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Service Provider Registration
          </CardTitle>
          <CardDescription>
            Join our platform and start offering your services to clients
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Business Information */}
            <hr className="my-6" />
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="businessName"
                    type="text"
                    placeholder="Your business name"
                    value={formData.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Service Category</Label>
                <Select onValueChange={(value) => handleChange('category', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your service category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Photography">Photography</SelectItem>
                    <SelectItem value="Videography">Videography</SelectItem>
                    <SelectItem value="Catering">Catering</SelectItem>
                    <SelectItem value="Event Planning">Event Planning</SelectItem>
                    <SelectItem value="Music & DJ">Music & DJ</SelectItem>
                    <SelectItem value="Decoration">Decoration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select onValueChange={(value) => handleChange('experience', value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="1-2 years">1-2 years</SelectItem>
                    <SelectItem value="3-5 years">3-5 years</SelectItem>
                    <SelectItem value="6-10 years">6-10 years</SelectItem>
                    <SelectItem value="10+ years">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Service Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceRange">Price Range</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="priceRange"
                  type="text"
                  placeholder="e.g., $500-1000/event"
                  value={formData.priceRange}
                  onChange={(e) => handleChange('priceRange', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Service Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your services, specialties, and what makes you unique..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                required
              />
            </div>
          </CardContent>

          <div className="px-6 pb-6">
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Provider Account'}
            </Button>

            <div className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign in
              </a>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ServiceProviderRegistrationForm;
