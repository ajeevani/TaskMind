import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const GlobalHeader = ({ onAIToggle, isAIOpen = false }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      console.log('Search query:', searchQuery);
    }
  };

  const handleAIToggle = () => {
    if (onAIToggle) {
      onAIToggle();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-header bg-surface border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-2 focus-ring rounded-md p-1 -ml-1"
          >
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Brain" size={20} color="white" />
            </div>
            <span className="hidden sm:block text-xl font-semibold text-foreground">
              TaskMind AI
            </span>
          </Link>
        </div>

        {/* Search Section */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <div className="relative">
            {/* Desktop Search Bar */}
            <div className="hidden md:block">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <Input
                    type="search"
                    placeholder="Search tasks, projects, or ask AI..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="pl-10 pr-4 w-full bg-muted/50 border-0 focus:bg-surface focus:ring-1 focus:ring-primary/20"
                  />
                </div>
              </form>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden">
              {isSearchExpanded ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Icon 
                      name="Search" 
                      size={18} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                    />
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="pl-9 pr-4 text-sm bg-muted/50 border-0"
                      autoFocus
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSearchToggle}
                    className="shrink-0"
                  >
                    <Icon name="X" size={18} />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSearchToggle}
                  className="micro-feedback"
                >
                  <Icon name="Search" size={20} />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-2">
          {/* AI Assistant Toggle */}
          <Button
            variant={isAIOpen ? "default" : "ghost"}
            size="icon"
            onClick={handleAIToggle}
            className={`micro-feedback ${isAIOpen ? 'ambient-glow' : ''}`}
            title="AI Assistant"
          >
            <Icon name="Bot" size={20} />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="micro-feedback relative"
            title="Notifications"
          >
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
          </Button>

          {/* Profile Menu */}
          <Link to="/profile-settings">
            <Button
              variant="ghost"
              size="icon"
              className={`micro-feedback ${location?.pathname === '/profile-settings' ? 'bg-muted' : ''}`}
              title="Profile Settings"
            >
              <Icon name="User" size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;