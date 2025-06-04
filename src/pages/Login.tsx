
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import AuthForm from '@/components/AuthForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const { toast } = useToast();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData: any) => {
    setLoading(true);
    try {
      const response = await login(formData.email, formData.password);
      
      toast({
        title: 'Login successful!',
        description: 'Welcome back to ConnectPro.',
      });

      // Redirect based on user role
      if (response.user.role === 'admin') {
        window.location.href = '/admin/dashboard';
      } else if (response.user.role === 'provider') {
        if (!response.user.isApproved) {
          toast({
            title: 'Account Pending',
            description: 'Your provider account is pending approval.',
            variant: 'destructive',
          });
          return;
        }
        window.location.href = '/provider/dashboard';
      } else {
        window.location.href = '/client/dashboard';
      }
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.response?.data?.message || 'Invalid credentials',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <AuthForm type="login" onSubmit={handleLogin} loading={loading} />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
