import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CreateAccountLink = () => {
  return (
    <div className="text-center space-y-4">
      {/* Create Account Link */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-3">
          Don't have an account yet?
        </p>
        <Link
          to="/register"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-2 py-1"
        >
          <Icon name="UserPlus" size={16} />
          <span>Create Account</span>
        </Link>
      </div>
      {/* Additional Links */}
      <div className="flex items-center justify-center space-x-6 text-sm">
        <Link
          to="/help"
          className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1 py-1"
        >
          Help Center
        </Link>
        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
        <Link
          to="/contact"
          className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded px-1 py-1"
        >
          Contact Support
        </Link>
      </div>
      {/* Version Info */}
      <div className="text-xs text-muted-foreground">
        TaskMind AI v2.1.0 • © {new Date()?.getFullYear()} All rights reserved
      </div>
    </div>
  );
};

export default CreateAccountLink;