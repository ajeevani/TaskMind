import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import CreateAccountLink from './components/CreateAccountLink';
import FeatureShowcase from './components/FeatureShowcase';
import Icon from '../../components/AppIcon';


const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('taskMindUser');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Left Panel - Feature Showcase (Desktop Only) */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <FeatureShowcase />
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md space-y-8">
              {/* Header */}
              <LoginHeader />

              {/* Login Form */}
              <LoginForm />

              {/* Social Login */}
              <SocialLogin />

              {/* Create Account Link */}
              <CreateAccountLink />
            </div>
          </div>

          {/* Mobile Feature Preview */}
          <div className="lg:hidden bg-gradient-to-r from-primary/5 to-accent/5 p-6 border-t border-border">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="Brain" size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">AI Assistant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                    <Icon name="Zap" size={16} className="text-success" />
                  </div>
                  <span className="text-sm font-medium text-foreground">Smart Tasks</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Join thousands of users boosting productivity with AI
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Background Elements (Mobile) */}
      <div className="lg:hidden fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-16 h-16 bg-primary/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-8 w-12 h-12 bg-accent/5 rounded-lg rotate-45 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 left-4 w-8 h-8 bg-success/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default LoginPage;