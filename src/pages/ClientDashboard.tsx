
import React from 'react';
import { Search, Star, Calendar, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ClientDashboard = () => {
  const mockServices = [
    {
      id: 1,
      name: "Elite Photography",
      category: "Photography",
      rating: 4.8,
      price: "$500/event",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Premium Catering",
      category: "Catering",
      rating: 4.9,
      price: "$50/person",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Video Pro Services",
      category: "Videography",
      rating: 4.7,
      price: "$800/event",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
            <p className="text-gray-600">Find and book the perfect service providers for your events</p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Find Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input 
                  placeholder="Search for services..." 
                  className="flex-1"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">Search</Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Services */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockServices.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <img 
                      src={service.image} 
                      alt={service.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-2">{service.category}</p>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm">{service.rating}</span>
                    </div>
                    <p className="text-lg font-semibold text-blue-600 mb-4">{service.price}</p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Upcoming Events</h3>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Booked Services</h3>
                <p className="text-2xl font-bold text-green-600">8</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Reviews Given</h3>
                <p className="text-2xl font-bold text-yellow-600">12</p>
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
