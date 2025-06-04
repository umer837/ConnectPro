
import React, { useState, useEffect } from 'react';
import { Search, Star, Calendar, User, Filter, MapPin, Phone, Mail, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PortfolioModal from '@/components/PortfolioModal';
import BookingForm from '@/components/BookingForm';
import BookingHistory from '@/components/BookingHistory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { serviceAPI } from '@/services/api';

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [portfolioModal, setPortfolioModal] = useState<{isOpen: boolean, providerName: string, images: string[]}>({
    isOpen: false,
    providerName: '',
    images: []
  });
  const [bookingModal, setBookingModal] = useState<{isOpen: boolean, service: any}>({
    isOpen: false,
    service: null
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await serviceAPI.getServices();
      setServices(response.data.services);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter((service: any) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openPortfolio = (providerName: string, images: string[] = []) => {
    setPortfolioModal({
      isOpen: true,
      providerName,
      images
    });
  };

  const openBookingForm = (service: any) => {
    setBookingModal({
      isOpen: true,
      service
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} onLogout={logout} />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h1>
            <p className="text-gray-600">Discover and book the best service providers for your events</p>
          </div>

          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse Services</TabsTrigger>
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="space-y-6">
              {/* Search and Filter Section */}
              <Card>
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
                          <SelectItem value="event planning">Event Planning</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button className="bg-blue-600 hover:bg-blue-700">Search</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services Grid */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Available Services</h2>
                  <Badge variant="outline" className="text-sm">
                    {filteredServices.length} services found
                  </Badge>
                </div>
                
                {loading ? (
                  <div className="text-center py-8">Loading services...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service: any) => (
                      <Card key={service._id} className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <div className="relative mb-4">
                            <img 
                              src={service.images[0] || '/placeholder.svg'} 
                              alt={service.title}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <Badge 
                              className={`absolute top-2 right-2 ${
                                service.availability ? 'bg-green-500' : 'bg-yellow-500'
                              }`}
                            >
                              {service.availability ? 'Available' : 'Busy'}
                            </Badge>
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                          <Badge variant="secondary" className="mb-3">{service.category}</Badge>
                          
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-4 w-4 mr-2" />
                              {service.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <User className="h-4 w-4 mr-2" />
                              {service.providerId?.profile?.businessName || service.providerId?.name}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-sm font-medium">{service.rating || 0}</span>
                              <span className="text-sm text-gray-500 ml-1">({service.totalReviews || 0} reviews)</span>
                            </div>
                          </div>
                          
                          <p className="text-lg font-bold text-blue-600 mb-4">${service.price}</p>
                          
                          <div className="flex gap-2">
                            <Button 
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              onClick={() => openBookingForm(service)}
                              disabled={!service.availability}
                            >
                              <BookOpen className="w-4 h-4 mr-1" />
                              Book Now
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => openPortfolio(service.providerId?.profile?.businessName || service.providerId?.name, service.providerId?.profile?.portfolio || [])}
                            >
                              View Portfolio
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="bookings">
              <BookingHistory />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
      
      <PortfolioModal 
        isOpen={portfolioModal.isOpen}
        onClose={() => setPortfolioModal({isOpen: false, providerName: '', images: []})}
        providerName={portfolioModal.providerName}
        portfolioImages={portfolioModal.images}
      />

      {bookingModal.isOpen && (
        <BookingForm
          service={bookingModal.service}
          onClose={() => setBookingModal({isOpen: false, service: null})}
          onSuccess={() => {
            // Refresh services or show success message
          }}
        />
      )}
    </div>
  );
};

export default ClientDashboard;
