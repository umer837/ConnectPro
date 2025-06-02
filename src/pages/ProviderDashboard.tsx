
import React, { useState } from 'react';
import { Plus, Edit, Star, DollarSign, Calendar, Upload, Trash2, Eye, Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const ProviderDashboard = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    location: '',
    duration: ''
  });

  const [mockServices, setMockServices] = useState([
    {
      id: 1,
      name: "Wedding Photography Package",
      category: "Photography",
      price: "$800-1200",
      rating: 4.8,
      bookings: 15,
      location: "New York, NY",
      duration: "8 hours",
      description: "Complete wedding photography package including pre-wedding shoot",
      image: "/placeholder.svg",
      status: "active"
    },
    {
      id: 2,
      name: "Corporate Event Coverage",
      category: "Photography", 
      price: "$600-900",
      rating: 4.9,
      bookings: 8,
      location: "New York, NY",
      duration: "4-6 hours",
      description: "Professional corporate event photography and documentation",
      image: "/placeholder.svg",
      status: "active"
    }
  ]);

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Service submitted:', serviceForm);
    
    if (editingService) {
      // Update existing service
      setMockServices(prev => prev.map(service => 
        service.id === editingService.id 
          ? { ...service, ...serviceForm, id: editingService.id }
          : service
      ));
      toast({
        title: 'Service Updated',
        description: 'Your service has been updated successfully.',
      });
    } else {
      // Add new service
      const newService = {
        id: Date.now(),
        ...serviceForm,
        rating: 0,
        bookings: 0,
        image: "/placeholder.svg",
        status: "active"
      };
      setMockServices(prev => [...prev, newService]);
      toast({
        title: 'Service Added',
        description: 'Your new service has been added successfully.',
      });
    }
    
    setIsEditing(false);
    setEditingService(null);
    setServiceForm({ name: '', category: '', price: '', description: '', location: '', duration: '' });
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      category: service.category,
      price: service.price,
      description: service.description,
      location: service.location,
      duration: service.duration
    });
    setIsEditing(true);
  };

  const handleDeleteService = (serviceId) => {
    setMockServices(prev => prev.filter(service => service.id !== serviceId));
    toast({
      title: 'Service Deleted',
      description: 'The service has been removed from your listings.',
      variant: 'destructive',
    });
  };

  const totalEarnings = mockServices.reduce((sum, service) => sum + (service.bookings * 500), 0);
  const totalBookings = mockServices.reduce((sum, service) => sum + service.bookings, 0);
  const averageRating = mockServices.length > 0 
    ? (mockServices.reduce((sum, service) => sum + service.rating, 0) / mockServices.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Provider Dashboard</h1>
              <p className="text-gray-600">Manage your services, bookings, and grow your business</p>
            </div>
            <Button 
              onClick={() => {
                setIsEditing(true);
                setEditingService(null);
                setServiceForm({ name: '', category: '', price: '', description: '', location: '', duration: '' });
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
          </div>

          {/* Enhanced Add/Edit Service Form */}
          {isEditing && (
            <Card className="mb-8 border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle>
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleServiceSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <SelectItem value="Photography">Photography</SelectItem>
                        <SelectItem value="Videography">Videography</SelectItem>
                        <SelectItem value="Catering">Catering</SelectItem>
                        <SelectItem value="Event Planning">Event Planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price Range</Label>
                    <Input
                      id="price"
                      value={serviceForm.price}
                      onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                      placeholder="e.g., $500-800/event"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={serviceForm.duration}
                      onChange={(e) => setServiceForm({...serviceForm, duration: e.target.value})}
                      placeholder="e.g., 6-8 hours"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Service Location</Label>
                    <Input
                      id="location"
                      value={serviceForm.location}
                      onChange={(e) => setServiceForm({...serviceForm, location: e.target.value})}
                      placeholder="City, State"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                      placeholder="Describe your service offering"
                      required
                    />
                  </div>
                  <div className="md:col-span-2 flex gap-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      {editingService ? 'Update Service' : 'Save Service'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setEditingService(null);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Total Earnings</h3>
                <p className="text-2xl font-bold">${totalEarnings.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Total Bookings</h3>
                <p className="text-2xl font-bold">{totalBookings}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Average Rating</h3>
                <p className="text-2xl font-bold">{averageRating}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <Edit className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Active Services</h3>
                <p className="text-2xl font-bold">{mockServices.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Services List */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockServices.map((service) => (
                <Card key={service.id} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-white text-gray-700 hover:bg-gray-100 h-8 w-8 p-0"
                        >
                          <Camera className="h-4 w-4" />
                        </Button>
                        <Badge 
                          className={service.status === 'active' ? 'bg-green-500' : 'bg-red-500'}
                        >
                          {service.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <Badge variant="secondary" className="mb-3">{service.category}</Badge>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{service.location}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{service.duration}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Bookings:</span>
                        <span className="font-medium">{service.bookings}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{service.rating}</span>
                      </div>
                      <p className="text-lg font-bold text-blue-600">{service.price}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleEditService(service)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
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
