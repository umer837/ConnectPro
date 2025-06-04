
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Phone, Mail, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { bookingAPI } from '@/services/api';

interface Booking {
  _id: string;
  serviceId: {
    title: string;
    category: string;
    images: string[];
    price: number;
  };
  providerId: {
    name: string;
    profile: {
      businessName: string;
      phone: string;
    };
  };
  eventDate: string;
  eventLocation: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  bookingDate: string;
  notes?: string;
}

const BookingHistory = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getBookingHistory();
      setBookings(response.data.bookings);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load booking history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bookingAPI.cancelBooking(bookingId);
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully",
      });
      fetchBookings();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to cancel booking",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading booking history...</div>;
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Yet</h3>
          <p className="text-gray-500">Start booking services to see your history here</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Your Bookings</h2>
      {bookings.map((booking) => (
        <Card key={booking._id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <img
                  src={booking.serviceId.images[0] || '/placeholder.svg'}
                  alt={booking.serviceId.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{booking.serviceId.title}</h3>
                  <p className="text-gray-600">{booking.providerId.profile.businessName}</p>
                  <Badge variant="secondary">{booking.serviceId.category}</Badge>
                </div>
              </div>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Event: {new Date(booking.eventDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {booking.eventLocation}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {booking.providerId.profile.phone}
                </div>
                <div className="text-lg font-bold text-blue-600">
                  ${booking.totalAmount}
                </div>
              </div>
            </div>

            {booking.notes && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{booking.notes}</p>
              </div>
            )}

            <div className="flex gap-2">
              {booking.status === 'pending' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCancelBooking(booking._id)}
                >
                  Cancel Booking
                </Button>
              )}
              {booking.status === 'completed' && (
                <Button variant="outline" size="sm">
                  <Star className="w-4 h-4 mr-1" />
                  Rate Service
                </Button>
              )}
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingHistory;
