
import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
  portfolioImages: string[];
}

const PortfolioModal = ({ isOpen, onClose, providerName, portfolioImages }: PortfolioModalProps) => {
  if (!isOpen) return null;

  const samplePortfolio = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{providerName} - Portfolio</h2>
          <Button variant="ghost" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {samplePortfolio.map((image, index) => (
              <div key={index} className="relative group">
                <img 
                  src={image} 
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <ExternalLink className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">
              Showcasing professional work and creative excellence
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Contact {providerName}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
