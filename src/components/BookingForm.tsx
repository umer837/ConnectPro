
import React, { useState } from 'react';
import { Calendar, MapPin, User, Phone, Mail, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { bookingAPI } from '@/services/api';

interface BookingFormProps {
  service: {
    _id: string;
    title: string;
    price: number;
    providerId: {
      name: string;
      profile: {
        businessName: string;
        phone: string;
        email: string;
      };
    };
  };
  onClose: () => void;
  onSuccess: () => void;
}

const BookingForm = ({ service, onClose, onSuccess }: BookingFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    eventDate: '',
    eventLocation: '',
    notes: '',
    clientContact: {
      phone: '',
      email: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await bookingAPI.createBooking({
        serviceId: service._id,
        eventDate: formData.eventDate,
        eventLocation: formData.eventLocation,
        notes: formData.notes,
        clientContact: formData.clientContact
      });

      toast({
        title: "Booking Successful!",
        description: "Your booking request has been sent to the provider.",
      });

      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "Booking Failed",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Book Service</span>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h3 className="font-semibold">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.providerId.profile.businessName}</p>
            <p className="text-lg font-bold text-blue-600">${service.price}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="eventDate" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Event Date
              </Label>
              <Input
                id="eventDate"
                name="eventDate"
                type="datetime-local"
                value={formData.eventDate}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>

            <div>
              <Label htmlFor="eventLocation" className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Event Location
              </Label>
              <Input
                id="eventLocation"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={handleInputChange}
                placeholder="Enter event location"
                required
              />
            </div>

            <div>
              <Label htmlFor="clientContact.phone" className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Your Phone
              </Label>
              <Input
                id="clientContact.phone"
                name="clientContact.phone"
                type="tel"
                value={formData.clientContact.phone}
                onChange={handleInputChange}
                placeholder="Your contact phone"
                required
              />
            </div>

            <div>
              <Label htmlFor="clientContact.email" className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                Your Email
              </Label>
              <Input
                id="clientContact.email"
                name="clientContact.email"
                type="email"
                value={formData.clientContact.email}
                onChange={handleInputChange}
                placeholder="Your contact email"
                required
              />
            </div>

            <div>
              <Label htmlFor="notes">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special requirements or notes..."
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700">
                {loading ? 'Booking...' : 'Book Now'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
