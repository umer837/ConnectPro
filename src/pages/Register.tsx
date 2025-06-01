
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import AuthForm from '@/components/AuthForm';

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
          description: 'Welcome to ServiceConnect! You can now browse service providers.',
        });
      }
      
      window.location.href = '/';
    }, 1000);
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
};

export default Register;
