import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import ProviderCard from '@/components/ProviderCard';
import ContactModal from '@/components/ContactModal';

const Providers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);

  // Sample data - in real app this would come from API
  const providers = [
    {
      _id: '1',
      name: 'Sarah Photography',
      category: 'Photographers',
      description: 'Professional wedding and event photographer with 8+ years experience. Specializing in candid moments and artistic portraits.',
      rating: 4.9,
      reviewCount: 127,
      location: 'Downtown',
      image: '/placeholder.svg',
      isVerified: true,
      responseTime: '2 hours',
      phone: '(555) 123-4567',
      email: 'sarah@photography.com'
    },
    {
      _id: '2',
      name: 'Elite Event Films',
      category: 'Videographers',
      description: 'Cinematic wedding and event videography. Creating beautiful memories with professional equipment and creative storytelling.',
      rating: 4.8,
      reviewCount: 94,
      location: 'Midtown',
      image: '/placeholder.svg',
      isVerified: true,
      responseTime: '1 hour',
      phone: '(555) 234-5678',
      email: 'contact@elitefilms.com'
    },
    {
      _id: '3',
      name: 'Gourmet Catering Co',
      category: 'Catering',
      description: 'Full-service catering for weddings, corporate events, and special occasions. Fresh, locally-sourced ingredients.',
      rating: 4.7,
      reviewCount: 156,
      location: 'Food District',
      image: '/placeholder.svg',
      isVerified: true,
      responseTime: '4 hours',
      phone: '(555) 345-6789',
      email: 'info@gourmetcatering.com'
    },
    {
      _id: '4',
      name: 'Perfect Day Events',
      category: 'Event Organizers',
      description: 'Complete event planning and coordination services. From intimate gatherings to large celebrations, we handle every detail.',
      rating: 4.9,
      reviewCount: 203,
      location: 'City Center',
      image: '/placeholder.svg',
      isVerified: true,
      responseTime: '3 hours',
      phone: '(555) 456-7890',
      email: 'hello@perfectdayevents.com'
    }
  ];

  const categories = [
    'All Categories',
    'Photographers',
    'Videographers',
    'Catering',
    'Event Organizers'
  ];

  const locations = ['All Locations', 'Downtown', 'Midtown', 'Food District', 'City Center'];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           provider.category.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesLocation = selectedLocation === 'all' || 
                           provider.location.toLowerCase() === selectedLocation.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleContact = (providerId: string) => {
    const provider = providers.find(p => p._id === providerId);
    setSelectedProvider(provider);
    setIsContactModalOpen(true);
  };

  const handleInquirySubmit = (inquiry: any) => {
    console.log('Inquiry submitted:', inquiry, 'to provider:', selectedProvider?.name);
    toast({
      title: 'Inquiry sent!',
      description: `Your message has been sent to ${selectedProvider?.name}. They will contact you soon.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Service Providers</h1>
          <p className="text-lg text-gray-600">
            Discover verified event and media professionals in your area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search providers, services, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select onValueChange={setSelectedCategory} defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {categories.map((category) => (
                  <SelectItem 
                    key={category} 
                    value={category === 'All Categories' ? 'all' : category}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedLocation} defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {locations.map((location) => (
                  <SelectItem 
                    key={location} 
                    value={location === 'All Locations' ? 'all' : location}
                  >
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {location}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''} found
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Provider Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider._id}
                provider={provider}
                onContact={handleContact}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No providers found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or browse all categories.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedLocation('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        providerName={selectedProvider?.name || ''}
        onSubmit={handleInquirySubmit}
      />
    </div>
  );
};

export default Providers;
