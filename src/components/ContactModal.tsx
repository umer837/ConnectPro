
import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
  onSubmit: (inquiry: { subject: string; message: string; contactInfo: string }) => void;
}

const ContactModal = ({ isOpen, onClose, providerName, onSubmit }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    contactInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ subject: '', message: '', contactInfo: '' });
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Contact {providerName}</DialogTitle>
          <DialogDescription>
            Send an inquiry to this service provider. They will receive your message and contact information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="What service do you need?"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Describe your project or requirements..."
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactInfo">Your Contact Information</Label>
            <Input
              id="contactInfo"
              placeholder="Phone number or preferred contact method"
              value={formData.contactInfo}
              onChange={(e) => handleChange('contactInfo', e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4 mr-2" />
              Send Inquiry
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
