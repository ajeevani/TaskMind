import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySection = () => {
  const [securityData, setSecurityData] = useState({
    twoFactorEnabled: false,
    passwordLastChanged: "2024-07-15",
    activeSessions: 3,
    loginNotifications: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const connectedDevices = [
    {
      id: 1,
      device: "MacBook Pro",
      location: "New York, NY",
      lastActive: "Active now",
      browser: "Chrome 118",
      isCurrent: true
    },
    {
      id: 2,
      device: "iPhone 15 Pro",
      location: "New York, NY",
      lastActive: "2 hours ago",
      browser: "Safari Mobile",
      isCurrent: false
    },
    {
      id: 3,
      device: "iPad Air",
      location: "Boston, MA",
      lastActive: "1 day ago",
      browser: "Safari",
      isCurrent: false
    }
  ];

  const loginHistory = [
    {
      id: 1,
      timestamp: "2024-08-16 09:30:00",
      location: "New York, NY",
      device: "MacBook Pro",
      status: "success"
    },
    {
      id: 2,
      timestamp: "2024-08-15 18:45:00",
      location: "New York, NY",
      device: "iPhone 15 Pro",
      status: "success"
    },
    {
      id: 3,
      timestamp: "2024-08-15 14:20:00",
      location: "Boston, MA",
      device: "iPad Air",
      status: "success"
    },
    {
      id: 4,
      timestamp: "2024-08-14 22:15:00",
      location: "Unknown Location",
      device: "Unknown Device",
      status: "failed"
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordSubmit = async () => {
    if (passwordForm?.newPassword !== passwordForm?.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsChangingPassword(true);
    try {
      // Simulate password change
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      setSecurityData(prev => ({
        ...prev,
        passwordLastChanged: new Date()?.toISOString()?.split('T')?.[0]
      }));
      alert('Password changed successfully');
    } catch (error) {
      alert('Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleTwoFactorToggle = () => {
    setSecurityData(prev => ({
      ...prev,
      twoFactorEnabled: !prev?.twoFactorEnabled
    }));
  };

  const handleDeviceLogout = (deviceId) => {
    console.log('Logging out device:', deviceId);
    // Simulate device logout
  };

  const handleLogoutAllDevices = () => {
    console.log('Logging out all devices');
    // Simulate logout all devices
  };

  const exportSecurityData = () => {
    const data = {
      loginHistory,
      connectedDevices,
      securitySettings: securityData,
      exportDate: new Date()?.toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'security-data.json';
    a?.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Password Security */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Password Security</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            iconName="Key"
            iconPosition="left"
          >
            Change Password
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground mb-4">
          Last changed: {formatDate(securityData?.passwordLastChanged)}
        </div>

        {showPasswordForm && (
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border">
            <Input
              label="Current Password"
              type="password"
              value={passwordForm?.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
              required
            />
            <Input
              label="New Password"
              type="password"
              value={passwordForm?.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
              description="Must be at least 8 characters with numbers and symbols"
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordForm?.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
              required
            />
            <div className="flex space-x-3">
              <Button
                variant="default"
                onClick={handlePasswordSubmit}
                loading={isChangingPassword}
                disabled={!passwordForm?.currentPassword || !passwordForm?.newPassword || !passwordForm?.confirmPassword}
                iconName="Check"
                iconPosition="left"
              >
                Update Password
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPasswordForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${securityData?.twoFactorEnabled ? 'text-success' : 'text-muted-foreground'}`}>
              {securityData?.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <Button
              variant={securityData?.twoFactorEnabled ? "destructive" : "default"}
              size="sm"
              onClick={handleTwoFactorToggle}
              iconName={securityData?.twoFactorEnabled ? "ShieldOff" : "Shield"}
              iconPosition="left"
            >
              {securityData?.twoFactorEnabled ? 'Disable' : 'Enable'} 2FA
            </Button>
          </div>
        </div>

        {securityData?.twoFactorEnabled && (
          <div className="bg-success/10 border border-success/20 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Two-factor authentication is active</span>
            </div>
            <p className="text-sm text-foreground mt-2">
              Your account is protected with authenticator app verification.
            </p>
          </div>
        )}
      </div>
      {/* Connected Devices */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Connected Devices</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogoutAllDevices}
            iconName="LogOut"
            iconPosition="left"
          >
            Logout All
          </Button>
        </div>

        <div className="space-y-4">
          {connectedDevices?.map((device) => (
            <div key={device?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon 
                    name={device?.device?.includes('iPhone') ? 'Smartphone' : device?.device?.includes('iPad') ? 'Tablet' : 'Laptop'} 
                    size={20} 
                    className="text-muted-foreground" 
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{device?.device}</span>
                    {device?.isCurrent && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {device?.location} • {device?.browser}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {device?.lastActive}
                  </div>
                </div>
              </div>
              {!device?.isCurrent && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeviceLogout(device?.id)}
                  iconName="LogOut"
                  iconPosition="left"
                >
                  Logout
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Login History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Login Activity</h3>
        <div className="space-y-3">
          {loginHistory?.map((login) => (
            <div key={login?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${login?.status === 'success' ? 'bg-success' : 'bg-error'}`}></div>
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {formatDate(login?.timestamp)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {login?.location} • {login?.device}
                  </div>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                login?.status === 'success' ?'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                {login?.status === 'success' ? 'Success' : 'Failed'}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Security Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Security Preferences</h3>
        <div className="space-y-4">
          <Checkbox
            label="Login Notifications"
            description="Get notified when someone logs into your account"
            checked={securityData?.loginNotifications}
            onChange={(e) => setSecurityData(prev => ({
              ...prev,
              loginNotifications: e?.target?.checked
            }))}
          />
        </div>
      </div>
      {/* Export Data */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Export</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Download your security data including login history and device information
        </p>
        <Button
          variant="outline"
          onClick={exportSecurityData}
          iconName="Download"
          iconPosition="left"
        >
          Export Security Data
        </Button>
      </div>
      {/* Security Score */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 ambient-glow">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Shield" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Security Score: 85/100</span>
        </div>
        <div className="space-y-2 text-sm text-foreground">
          <p>• ✅ Strong password policy enabled</p>
          <p>• {securityData?.twoFactorEnabled ? '✅' : '❌'} Two-factor authentication {securityData?.twoFactorEnabled ? 'enabled' : 'disabled'}</p>
          <p>• ✅ Regular security monitoring active</p>
          <p>• ⚠️ Consider reviewing connected devices monthly</p>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;