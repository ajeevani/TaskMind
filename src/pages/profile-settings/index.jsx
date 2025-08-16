import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';

import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import AIAssistantPanel from '../../components/ui/AIAssistantPanel';
import ProfileSection from './components/ProfileSection';
import PreferencesSection from './components/PreferencesSection';
import AISettingsSection from './components/AISettingsSection';
import SecuritySection from './components/SecuritySection';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information and avatar'
    },
    {
      id: 'preferences',
      label: 'Preferences',
      icon: 'Settings',
      description: 'Notifications and appearance'
    },
    {
      id: 'ai-settings',
      label: 'AI Settings',
      icon: 'Brain',
      description: 'AI assistant customization'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Password and privacy settings'
    }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleAIToggle = () => {
    setIsAIOpen(!isAIOpen);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSection />;
      case 'preferences':
        return <PreferencesSection />;
      case 'ai-settings':
        return <AISettingsSection />;
      case 'security':
        return <SecuritySection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Profile Settings - TaskMind AI</title>
        <meta name="description" content="Manage your account settings, preferences, AI customization, and security options in TaskMind AI." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Global Header */}
        <GlobalHeader onAIToggle={handleAIToggle} isAIOpen={isAIOpen} />
        
        {/* Primary Navigation */}
        <PrimaryNavigation />

        {/* Main Content */}
        <main className={`
          pt-16 md:pt-32 pb-20 md:pb-8 transition-all duration-300
          ${isAIOpen && !isMobile ? 'mr-80' : ''}
        `}>
          <div className="max-w-6xl mx-auto px-4 lg:px-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Settings" size={20} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Profile Settings</h1>
                  <p className="text-muted-foreground">Manage your account and customize your experience</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Desktop Sidebar Navigation */}
              <div className="hidden lg:block w-64 shrink-0">
                <div className="bg-card border border-border rounded-lg p-4 sticky top-36">
                  <nav className="space-y-2">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => handleTabChange(tab?.id)}
                        className={`
                          w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200
                          ${activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }
                          focus-ring
                        `}
                      >
                        <Icon 
                          name={tab?.icon} 
                          size={18} 
                          className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-current'} 
                        />
                        <div>
                          <div className="font-medium">{tab?.label}</div>
                          <div className={`text-xs ${activeTab === tab?.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                            {tab?.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Mobile Tab Navigation */}
              <div className="lg:hidden mb-6">
                <div className="bg-card border border-border rounded-lg p-2">
                  <div className="flex overflow-x-auto space-x-1 scrollbar-hide">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => handleTabChange(tab?.id)}
                        className={`
                          flex items-center space-x-2 px-4 py-3 rounded-lg whitespace-nowrap transition-all duration-200 shrink-0
                          ${activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }
                          focus-ring
                        `}
                      >
                        <Icon 
                          name={tab?.icon} 
                          size={16} 
                          className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-current'} 
                        />
                        <span className="text-sm font-medium">{tab?.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 min-w-0">
                <div className="animate-fade-in">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* AI Assistant Panel */}
        <AIAssistantPanel 
          isOpen={isAIOpen} 
          onClose={() => setIsAIOpen(false)} 
        />
      </div>
    </>
  );
};

export default ProfileSettings;