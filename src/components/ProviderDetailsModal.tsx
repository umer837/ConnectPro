
import React from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Provider {
  id: number;
  name: string;
  email: string;
  service: string;
  experience: string;
  status: string;
  appliedDate: string;
  portfolio: string;
}

interface ProviderDetailsModalProps {
  provider: Provider | null;
  onClose: () => void;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const ProviderDetailsModal = ({ provider, onClose, onApprove, onReject }: ProviderDetailsModalProps) => {
  if (!provider) return null;

  const mockDetails = {
    phone: '+1 234-567-8900',
    location: 'New York, NY',
    businessName: `${provider.name} ${provider.service}`,
    description: `Professional ${provider.service.toLowerCase()} services with ${provider.experience} of experience. Specializing in high-quality event coverage and customer satisfaction.`,
    portfolio: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    pricing: '$500-1200/event',
    availability: 'Weekends and Evenings'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Provider Details</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Provider Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Provider Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Full Name</label>
                  <p className="text-lg">{provider.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Business Name</label>
                  <p className="text-lg">{mockDetails.businessName}</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-600" />
                  <span>{provider.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-600" />
                  <span>{mockDetails.phone}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Service Category</label>
                  <p className="text-lg">{provider.service}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Experience</label>
                  <p className="text-lg">{provider.experience}</p>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-600" />
                  <span>{mockDetails.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-600" />
                  <span>Applied: {provider.appliedDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Details */}
          <Card>
            <CardHeader>
              <CardTitle>Business Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Description</label>
                <p className="text-gray-800 mt-1">{mockDetails.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Pricing Range</label>
                  <p className="text-lg font-semibold text-blue-600">{mockDetails.pricing}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Availability</label>
                  <p className="text-lg">{mockDetails.availability}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockDetails.portfolio.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Application Status */}
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge 
                    variant={
                      provider.status === 'approved' ? 'default' :
                      provider.status === 'rejected' ? 'destructive' : 
                      'secondary'
                    }
                    className="text-sm"
                  >
                    {provider.status.toUpperCase()}
                  </Badge>
                  <span className="text-gray-600">Applied on {provider.appliedDate}</span>
                </div>
                
                {provider.status === 'pending' && (
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => onReject(provider.id)}
                      variant="destructive"
                      className="flex items-center"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => onApprove(provider.id)}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center"
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetailsModal;
