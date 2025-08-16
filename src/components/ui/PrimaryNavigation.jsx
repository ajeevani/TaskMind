import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const PrimaryNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and insights'
    },
    {
      label: 'Tasks',
      path: '/task-management',
      icon: 'CheckSquare',
      description: 'Manage your tasks'
    },
    {
      label: 'AI Assistant',
      path: '/ai-assistant-chat',
      icon: 'MessageSquare',
      description: 'Chat with AI'
    },
    {
      label: 'Profile',
      path: '/profile-settings',
      icon: 'Settings',
      description: 'Account settings'
    }
  ];

  const isActive = (path) => {
    if (path === '/task-management') {
      return location?.pathname === '/task-management' || location?.pathname === '/task-detail';
    }
    return location?.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation - Top Horizontal */}
      <nav className="hidden md:block fixed top-16 left-0 right-0 z-navigation bg-surface border-b border-border">
        <div className="px-4 lg:px-6">
          <div className="flex space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  flex items-center space-x-2 py-4 px-2 border-b-2 transition-all duration-200
                  ${isActive(item?.path)
                    ? 'border-primary text-primary font-medium' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }
                  focus-ring rounded-t-md
                `}
                title={item?.description}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={isActive(item?.path) ? 'text-primary' : 'text-current'} 
                />
                <span className="text-sm font-medium">{item?.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {/* Mobile Navigation - Bottom Tabs */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-navigation bg-surface border-t border-border">
        <div className="flex">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`
                flex-1 flex flex-col items-center justify-center py-2 px-1 touch-target
                transition-all duration-200 micro-feedback
                ${isActive(item?.path)
                  ? 'text-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                }
                focus-ring
              `}
              title={item?.description}
            >
              <div className="relative">
                <Icon 
                  name={item?.icon} 
                  size={24} 
                  className={`mb-1 ${isActive(item?.path) ? 'text-primary' : 'text-current'}`} 
                />
                {isActive(item?.path) && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-fade-in"></div>
                )}
              </div>
              <span className={`text-xs font-medium ${isActive(item?.path) ? 'text-primary' : 'text-current'}`}>
                {item?.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default PrimaryNavigation;