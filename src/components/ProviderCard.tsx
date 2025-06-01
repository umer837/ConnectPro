
import React from 'react';
import { Star, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProviderCardProps {
  provider: {
    _id: string;
    name: string;
    category: string;
    description: string;
    rating: number;
    reviewCount: number;
    location: string;
    image: string;
    isVerified: boolean;
    responseTime: string;
    phone: string;
    email: string;
  };
  onContact: (providerId: string) => void;
}

const ProviderCard = ({ provider, onContact }: ProviderCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={provider.image || '/placeholder.svg'}
              alt={provider.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {provider.isVerified && (
              <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full p-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                {provider.name}
              </h3>
              <Badge variant="secondary" className="ml-2">
                {provider.category}
              </Badge>
            </div>
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(provider.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {provider.rating} ({provider.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {provider.description}
        </p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{provider.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>Responds in {provider.responseTime}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 space-y-2">
        <div className="w-full grid grid-cols-2 gap-2">
          <a href={`tel:${provider.phone}`}>
            <Button variant="outline" size="sm" className="w-full">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
          </a>
          <Button 
            size="sm" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => onContact(provider._id)}
          >
            <Mail className="h-4 w-4 mr-1" />
            Contact
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProviderCard;
