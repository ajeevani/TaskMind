import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreferencesSection = () => {
  const [preferences, setPreferences] = useState({
    theme: 'auto',
    language: 'en',
    notifications: {
      taskReminders: true,
      aiSuggestions: true,
      teamUpdates: false,
      weeklyReports: true,
      emailDigest: true,
      pushNotifications: true,
      soundEnabled: false
    },
    workingHours: {
      start: '09:00',
      end: '17:00',
      timezone: 'America/New_York'
    }
  });

  const [hasChanges, setHasChanges] = useState(false);

  const themeOptions = [
    { value: 'light', label: 'Light Theme', description: 'Clean and bright interface' },
    { value: 'dark', label: 'Dark Theme', description: 'Easy on the eyes' },
    { value: 'auto', label: 'Auto (System)', description: 'Follows system preference' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English', description: 'English (US)' },
    { value: 'es', label: 'Español', description: 'Spanish' },
    { value: 'fr', label: 'Français', description: 'French' },
    { value: 'de', label: 'Deutsch', description: 'German' },
    { value: 'ja', label: '日本語', description: 'Japanese' },
    { value: 'zh', label: '中文', description: 'Chinese (Simplified)' }
  ];

  const handlePreferenceChange = (category, field, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: typeof prev?.[category] === 'object' 
        ? { ...prev?.[category], [field]: value }
        : value
    }));
    setHasChanges(true);
  };

  const handleNotificationChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev?.notifications,
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSavePreferences = () => {
    console.log('Saving preferences:', preferences);
    setHasChanges(false);
    // Simulate save process
  };

  const resetToDefaults = () => {
    setPreferences({
      theme: 'auto',
      language: 'en',
      notifications: {
        taskReminders: true,
        aiSuggestions: true,
        teamUpdates: false,
        weeklyReports: true,
        emailDigest: true,
        pushNotifications: true,
        soundEnabled: false
      },
      workingHours: {
        start: '09:00',
        end: '17:00',
        timezone: 'America/New_York'
      }
    });
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Theme & Language */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Appearance & Language</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Theme"
            options={themeOptions}
            value={preferences?.theme}
            onChange={(value) => handlePreferenceChange('theme', null, value)}
            description="Choose your preferred interface theme"
          />
          <Select
            label="Language"
            options={languageOptions}
            value={preferences?.language}
            onChange={(value) => handlePreferenceChange('language', null, value)}
            description="Select your preferred language"
          />
        </div>
      </div>
      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Checkbox
              label="Task Reminders"
              description="Get notified about upcoming deadlines"
              checked={preferences?.notifications?.taskReminders}
              onChange={(e) => handleNotificationChange('taskReminders', e?.target?.checked)}
            />
            <Checkbox
              label="AI Suggestions"
              description="Receive intelligent task recommendations"
              checked={preferences?.notifications?.aiSuggestions}
              onChange={(e) => handleNotificationChange('aiSuggestions', e?.target?.checked)}
            />
            <Checkbox
              label="Team Updates"
              description="Notifications from team members"
              checked={preferences?.notifications?.teamUpdates}
              onChange={(e) => handleNotificationChange('teamUpdates', e?.target?.checked)}
            />
            <Checkbox
              label="Weekly Reports"
              description="Summary of your productivity"
              checked={preferences?.notifications?.weeklyReports}
              onChange={(e) => handleNotificationChange('weeklyReports', e?.target?.checked)}
            />
            <Checkbox
              label="Email Digest"
              description="Daily email summary"
              checked={preferences?.notifications?.emailDigest}
              onChange={(e) => handleNotificationChange('emailDigest', e?.target?.checked)}
            />
            <Checkbox
              label="Push Notifications"
              description="Browser push notifications"
              checked={preferences?.notifications?.pushNotifications}
              onChange={(e) => handleNotificationChange('pushNotifications', e?.target?.checked)}
            />
          </div>
          
          <div className="pt-4 border-t border-border">
            <Checkbox
              label="Sound Notifications"
              description="Play sound for important notifications"
              checked={preferences?.notifications?.soundEnabled}
              onChange={(e) => handleNotificationChange('soundEnabled', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
      {/* Working Hours */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Working Hours</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Set your preferred working hours for smart scheduling and notifications
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Start Time</label>
            <input
              type="time"
              value={preferences?.workingHours?.start}
              onChange={(e) => handlePreferenceChange('workingHours', 'start', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">End Time</label>
            <input
              type="time"
              value={preferences?.workingHours?.end}
              onChange={(e) => handlePreferenceChange('workingHours', 'end', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </div>
      {/* AI Recommendations */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 ambient-glow">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Lightbulb" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">AI Recommendations</span>
        </div>
        <div className="space-y-2 text-sm text-foreground">
          <p>• Enable task reminders for 23% better completion rates</p>
          <p>• Your optimal notification time is 8:30 AM based on activity patterns</p>
          <p>• Consider enabling team updates for better collaboration</p>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={handleSavePreferences}
          disabled={!hasChanges}
          iconName="Check"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Save Preferences
        </Button>
        <Button
          variant="outline"
          onClick={resetToDefaults}
          iconName="RotateCcw"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default PreferencesSection;