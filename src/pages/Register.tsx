
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import AuthForm from '@/components/AuthForm';
import ServiceProviderRegistrationForm from '@/components/ServiceProviderRegistrationForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Register = () => {
  const { toast } = useToast();
  const [userType, setUserType] = useState<'client' | 'provider' | null>(null);

  const handleClientRegister = (formData: any) => {
    console.log('Client registration:', formData);
    
    // Simulate saving to database
    setTimeout(() => {
      toast({
        title: 'Registration successful!',
        description: 'Your account has been created. Please login to continue.',
      });
      // Redirect to login instead of dashboard
      window.location.href = '/login';
    }, 1000);
  };

  const handleProviderRegister = (formData: any) => {
    console.log('Provider registration:', formData);
    
    // Simulate saving to database
    setTimeout(() => {
      toast({
        title: 'Registration successful!',
        description: 'Your account has been created and is pending approval. Please login to check your status.',
      });
      // Redirect to login instead of dashboard
      window.location.href = '/login';
    }, 1000);
  };

  // User type selection screen
  if (!userType) {
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
                onClick={() => setUserType('client')}
                className="w-full h-20 text-left bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
                variant="outline"
              >
                <div>
                  <div className="font-semibold text-lg">I'm a Client</div>
                  <div className="text-sm text-blue-600">Looking for service providers</div>
                </div>
              </Button>
              
              <Button 
                onClick={() => setUserType('provider')}
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {userType === 'client' ? (
          <AuthForm type="register" onSubmit={handleClientRegister} />
        ) : (
          <ServiceProviderRegistrationForm onSubmit={handleProviderRegister} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Register;
