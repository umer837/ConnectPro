
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import AuthForm from '@/components/AuthForm';

const Login = () => {
  const { toast } = useToast();

  const handleLogin = (formData: any) => {
    console.log('Login attempt:', formData);
    
    // Simulate login process
    setTimeout(() => {
      toast({
        title: 'Login successful!',
        description: 'Welcome back to ServiceConnect.',
      });
      
      // Redirect based on role
      if (formData.email === 'admin@serviceconnect.com') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    }, 1000);
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default Login;
