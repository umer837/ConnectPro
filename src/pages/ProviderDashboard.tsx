
import React, { useState } from 'react';
import { Plus, Edit, Star, DollarSign, Calendar, Upload } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProviderDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: '',
    price: '',
    description: ''
  });

  const mockServices = [
    {
      id: 1,
      name: "Wedding Photography Package",
      category: "Photography",
      price: "$800",
      rating: 4.8,
      bookings: 15,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Corporate Event Coverage",
      category: "Photography", 
      price: "$600",
      rating: 4.9,
      bookings: 8,
      image: "/placeholder.svg"
    }
  ];

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Service submitted:', serviceForm);
    setIsEditing(false);
    setServiceForm({ name: '', category: '', price: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Dashboard</h1>
              <p className="text-gray-600">Manage your services and bookings</p>
            </div>
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </div>

          {/* Add/Edit Service Form */}
          {isEditing && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Add New Service</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleServiceSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="serviceName">Service Name</Label>
                    <Input
                      id="serviceName"
                      value={serviceForm.name}
                      onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                      placeholder="Enter service name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setServiceForm({...serviceForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="photography">Photography</SelectItem>
                        <SelectItem value="videography">Videography</SelectItem>
                        <SelectItem value="catering">Catering</SelectItem>
                        <SelectItem value="event-planning">Event Planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      value={serviceForm.price}
                      onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                      placeholder="Enter price (e.g., $500/event)"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                      placeholder="Describe your service"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Save Service
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Total Earnings</h3>
                <p className="text-2xl font-bold text-green-600">$12,450</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Total Bookings</h3>
                <p className="text-2xl font-bold text-blue-600">23</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Average Rating</h3>
                <p className="text-2xl font-bold text-yellow-600">4.8</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Edit className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Active Services</h3>
                <p className="text-2xl font-bold text-purple-600">{mockServices.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Services List */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button 
                        size="sm" 
                        className="absolute top-2 right-2 bg-white text-gray-700 hover:bg-gray-100"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-2">{service.category}</p>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm">{service.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">{service.bookings} bookings</span>
                    </div>
                    <p className="text-lg font-semibold text-blue-600 mb-4">{service.price}</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProviderDashboard;
