
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const { toast } = useToast();

  const handleLogin = (formData: any) => {
    console.log('Login attempt:', formData);
    
    // Simulate login process
    setTimeout(() => {
      toast({
        title: 'Login successful!',
        description: 'Welcome back to ConnectPro.',
      });
      
      // Redirect based on role
      if (formData.email === 'admin@connectpro.com') {
        window.location.href = '/admin/dashboard';
      } else if (formData.role === 'provider') {
        window.location.href = '/provider/dashboard';
      } else {
        window.location.href = '/client/dashboard';
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
