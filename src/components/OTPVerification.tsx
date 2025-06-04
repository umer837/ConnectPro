
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface OTPVerificationProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ email, onVerified, onBack }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const { toast } = useToast();
  const { verifyOTP } = useAuth();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter a valid 6-digit OTP.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await verifyOTP(email, otp);
      toast({
        title: 'Email Verified!',
        description: 'Your email has been successfully verified.',
      });
      onVerified();
    } catch (error: any) {
      toast({
        title: 'Verification Failed',
        description: error.response?.data?.message || 'Invalid or expired OTP.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResending(true);
    try {
      // Call resend OTP API here if needed
      toast({
        title: 'OTP Sent',
        description: 'A new OTP has been sent to your email.',
      });
    } catch (error: any) {
      toast({
        title: 'Failed to resend OTP',
        description: error.response?.data?.message || 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setResending(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Verify Your Email</CardTitle>
        <CardDescription>
          We've sent a 6-digit verification code to<br />
          <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="text-center text-lg tracking-widest"
              maxLength={6}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Email'}
          </Button>

          <div className="text-center space-y-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleResendOTP}
              disabled={resending}
              className="text-sm"
            >
              {resending ? 'Sending...' : "Didn't receive the code? Resend"}
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="text-sm"
            >
              ← Back to registration
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OTPVerification;
