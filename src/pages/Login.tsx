
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const { toast } = useToast();

  const handleLogin = (formData: any) => {
    console.log('Login attempt:', formData);
    
    // Simulate login process with database check
    setTimeout(() => {
      toast({
        title: 'Login successful!',
        description: 'Welcome back to ConnectPro.',
      });
      
      // Simulate checking user role from database
      if (formData.email === 'admin@connectpro.com') {
        window.location.href = '/admin/dashboard';
      } else if (formData.email.includes('provider')) {
        // If email contains 'provider', route to provider dashboard
        window.location.href = '/provider/dashboard';
      } else {
        // Default to client dashboard
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
