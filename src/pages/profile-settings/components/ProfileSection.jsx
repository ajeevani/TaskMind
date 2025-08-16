import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProfileSection = () => {
  const [profileData, setProfileData] = useState({
    displayName: "Alex Johnson",
    email: "alex.johnson@email.com",
    timezone: "America/New_York",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const timezoneOptions = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Asia/Shanghai", label: "China Standard Time (CST)" }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarUpload = () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      // Mock new avatar URL
      setProfileData(prev => ({
        ...prev,
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face"
      }));
    }, 2000);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Simulate save process
    console.log('Profile saved:', profileData);
  };

  const detectTimezone = () => {
    const detectedTimezone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
    const matchingOption = timezoneOptions?.find(option => option?.value === detectedTimezone);
    if (matchingOption) {
      handleInputChange('timezone', detectedTimezone);
    }
  };

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border bg-muted">
            <Image
              src={profileData?.avatar}
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold text-foreground mb-2">Profile Picture</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Upload a new avatar. Recommended size: 400x400px
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAvatarUpload}
            loading={isUploading}
            iconName="Upload"
            iconPosition="left"
          >
            {isUploading ? 'Uploading...' : 'Change Avatar'}
          </Button>
        </div>
      </div>
      {/* Profile Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            iconName={isEditing ? "Check" : "Edit"}
            iconPosition="left"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            label="Display Name"
            type="text"
            value={profileData?.displayName}
            onChange={(e) => handleInputChange('displayName', e?.target?.value)}
            disabled={!isEditing}
            description="This name will be visible to other users"
          />

          <Input
            label="Email Address"
            type="email"
            value={profileData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            description="Used for notifications and account recovery"
          />

          <div className="space-y-2">
            <Select
              label="Timezone"
              options={timezoneOptions}
              value={profileData?.timezone}
              onChange={(value) => handleInputChange('timezone', value)}
              disabled={!isEditing}
              description="Used for scheduling and deadline notifications"
            />
            {isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={detectTimezone}
                iconName="MapPin"
                iconPosition="left"
                className="text-primary"
              >
                Auto-detect timezone
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* AI Insights */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 ambient-glow">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Brain" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">AI Profile Insights</span>
        </div>
        <div className="space-y-2 text-sm text-foreground">
          <p>• Your profile is 85% complete - consider adding a bio for better team collaboration</p>
          <p>• Based on your timezone, optimal focus hours are 9 AM - 11 AM</p>
          <p>• Profile views increased by 23% this month</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;