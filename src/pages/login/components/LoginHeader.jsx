import React from 'react';

import Icon from '../../../components/AppIcon';


const LoginHeader = () => {
  return (
    <div className="text-center space-y-6">
      {/* Logo and App Name */}
      <div className="flex items-center justify-center space-x-3">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center ambient-glow">
          <Icon name="Brain" size={24} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">TaskMind AI</h1>
          <p className="text-sm text-muted-foreground">AI-Powered Productivity</p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Welcome Back
        </h2>
        <p className="text-muted-foreground">
          Sign in to your account and supercharge your productivity with AI
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} className="text-success" />
          <span>SSL Secured</span>
        </div>
        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
        <div className="flex items-center space-x-1">
          <Icon name="Lock" size={14} className="text-success" />
          <span>Privacy Protected</span>
        </div>
        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
        <div className="flex items-center space-x-1">
          <Icon name="Zap" size={14} className="text-primary" />
          <span>AI-Powered</span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;