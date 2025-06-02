
import React, { useState } from 'react';
import { Search, Star, Calendar, User, Filter, MapPin, Phone, Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const ClientDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockServices = [
    {
      id: 1,
      name: "Elite Photography Studio",
      category: "Photography",
      rating: 4.8,
      price: "$500-800/event",
      location: "New York, NY",
      phone: "+1 234-567-8901",
      email: "info@elitephoto.com",
      description: "Professional wedding and event photography with 10+ years experience",
      image: "/placeholder.svg",
      reviews: 45,
      availability: "Available"
    },
    {
      id: 2,
      name: "Premium Catering Co.",
      category: "Catering",
      rating: 4.9,
      price: "$50-80/person",
      location: "Los Angeles, CA",
      phone: "+1 234-567-8902",
      email: "orders@premiumcatering.com",
      description: "Luxury catering services for all types of events",
      image: "/placeholder.svg",
      reviews: 67,
      availability: "Available"
    },
    {
      id: 3,
      name: "Video Pro Services",
      category: "Videography",
      rating: 4.7,
      price: "$800-1200/event",
      location: "Chicago, IL",
      phone: "+1 234-567-8903",
      email: "contact@videopro.com",
      description: "Cinematic videography for weddings and corporate events",
      image: "/placeholder.svg",
      reviews: 32,
      availability: "Busy"
    }
  ];

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
            <p className="text-gray-600">Discover and connect with the best service providers for your events</p>
          </div>

          {/* Enhanced Search and Filter Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Find Perfect Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input 
                    placeholder="Search for services, providers..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="videography">Videography</SelectItem>
                      <SelectItem value="catering">Catering</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-blue-600 hover:bg-blue-700">Search</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Services Grid */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Available Services</h2>
              <Badge variant="outline" className="text-sm">
                {filteredServices.length} providers found
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img 
                        src={service.image} 
                        alt={service.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Badge 
                        className={`absolute top-2 right-2 ${
                          service.availability === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                      >
                        {service.availability}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <Badge variant="secondary" className="mb-3">{service.category}</Badge>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {service.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {service.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        {service.email}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{service.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({service.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <p className="text-lg font-bold text-blue-600 mb-4">{service.price}</p>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        Contact Provider
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Portfolio
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <Search className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Searches Made</h3>
                <p className="text-2xl font-bold">15</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Events Planned</h3>
                <p className="text-2xl font-bold">3</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <User className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Providers Contacted</h3>
                <p className="text-2xl font-bold">8</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Reviews Given</h3>
                <p className="text-2xl font-bold">12</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientDashboard;
