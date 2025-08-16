import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialLogin = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    
    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful social login
      localStorage.setItem('taskMindUser', JSON.stringify({
        email: `user@${provider}.com`,
        provider: provider,
        loginTime: new Date()?.toISOString(),
        socialLogin: true
      }));
      
      navigate('/dashboard');
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      icon: 'Square',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-muted-foreground">Or continue with</span>
        </div>
      </div>
      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => handleSocialLogin(provider?.id)}
            loading={loadingProvider === provider?.id}
            disabled={loadingProvider !== null}
            className={`
              h-12 justify-center space-x-3 transition-all duration-200
              ${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor}
              hover:shadow-md micro-feedback
            `}
          >
            <Icon 
              name={provider?.icon} 
              size={18} 
              className={loadingProvider === provider?.id ? 'animate-spin' : ''} 
            />
            <span className="font-medium">
              {loadingProvider === provider?.id ? 'Connecting...' : provider?.name}
            </span>
          </Button>
        ))}
      </div>
      {/* Security Notice */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <button className="text-primary hover:text-primary/80 underline focus:outline-none focus:ring-2 focus:ring-primary/20 rounded">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-primary hover:text-primary/80 underline focus:outline-none focus:ring-2 focus:ring-primary/20 rounded">
            Privacy Policy
          </button>
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;