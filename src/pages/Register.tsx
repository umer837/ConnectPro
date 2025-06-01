
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Register = () => {
  const { toast } = useToast();

  const handleRegister = (formData: any) => {
    console.log('Registration attempt:', formData);
    
    // Simulate registration process
    setTimeout(() => {
      if (formData.role === 'provider') {
        toast({
          title: 'Registration successful!',
          description: 'Your account has been created. Please wait for admin approval before your profile goes live.',
        });
      } else {
        toast({
          title: 'Registration successful!',
          description: 'Welcome to ConnectPro! You can now browse service providers.',
        });
      }
      
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <AuthForm type="register" onSubmit={handleRegister} />
      </div>
      <Footer />
    </div>
  );
};

export default Register;
