
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import AuthForm from '@/components/AuthForm';
import ServiceProviderRegistrationForm from '@/components/ServiceProviderRegistrationForm';
import OTPVerification from '@/components/OTPVerification';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Register = () => {
  const { toast } = useToast();
  const { register } = useAuth();
  const [userType, setUserType] = useState<'client' | 'provider' | null>(null);
  const [step, setStep] = useState<'select' | 'register' | 'verify'>('select');
  const [registrationEmail, setRegistrationEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClientRegister = async (formData: any) => {
    setLoading(true);
    try {
      await register({
        ...formData,
        role: 'client'
      });
      
      setRegistrationEmail(formData.email);
      setStep('verify');
      
      toast({
        title: 'Registration successful!',
        description: 'Please check your email for verification code.',
      });
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProviderRegister = async (formData: any) => {
    setLoading(true);
    try {
      await register({
        ...formData,
        role: 'provider'
      });
      
      setRegistrationEmail(formData.email);
      setStep('verify');
      
      toast({
        title: 'Registration successful!',
        description: 'Please check your email for verification code.',
      });
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerified = () => {
    toast({
      title: 'Email verified!',
      description: 'You can now login to your account.',
    });
    window.location.href = '/login';
  };

  // User type selection screen
  if (step === 'select') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Join ConnectPro
              </CardTitle>
              <CardDescription>
                Choose your account type to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => {
                  setUserType('client');
                  setStep('register');
                }}
                className="w-full h-20 text-left bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
                variant="outline"
              >
                <div>
                  <div className="font-semibold text-lg">I'm a Client</div>
                  <div className="text-sm text-blue-600">Looking for service providers</div>
                </div>
              </Button>
              
              <Button 
                onClick={() => {
                  setUserType('provider');
                  setStep('register');
                }}
                className="w-full h-20 text-left bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
                variant="outline"
              >
                <div>
                  <div className="font-semibold text-lg">I'm a Service Provider</div>
                  <div className="text-sm text-green-600">Offering services to clients</div>
                </div>
              </Button>

              <div className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign in
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // OTP verification screen
  if (step === 'verify') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <OTPVerification
            email={registrationEmail}
            onVerified={handleOTPVerified}
            onBack={() => setStep('register')}
          />
        </div>
        <Footer />
      </div>
    );
  }

  // Registration form screen
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {userType === 'client' ? (
          <AuthForm type="register" onSubmit={handleClientRegister} loading={loading} />
        ) : (
          <ServiceProviderRegistrationForm onSubmit={handleProviderRegister} loading={loading} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Register;
