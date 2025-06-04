
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // This would typically fetch the service details
  const mockService = {
    _id: serviceId || '',
    title: 'Elite Photography Studio',
    price: 800,
    providerId: {
      name: 'John Provider',
      profile: {
        businessName: 'Elite Photography',
        phone: '+1 234-567-8901',
        email: 'info@elitephoto.com'
      }
    }
  };

  const handleSuccess = () => {
    navigate('/client/dashboard');
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} onLogout={logout} />
      <div className="flex-grow">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
          
          <BookingForm
            service={mockService}
            onClose={handleClose}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
