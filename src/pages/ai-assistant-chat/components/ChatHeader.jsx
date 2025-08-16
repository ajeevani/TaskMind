import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ onClearChat, messageCount = 0 }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackClick}
          className="md:hidden"
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center ambient-glow">
            <Icon name="Bot" size={20} color="white" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">TaskMind AI</h1>
            <p className="text-xs text-muted-foreground">
              {messageCount > 0 ? `${messageCount} messages` : 'Ready to help'}
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Voice Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="micro-feedback"
          title="Voice Mode"
        >
          <Icon name="Headphones" size={18} />
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          className="micro-feedback"
          title="Chat Settings"
        >
          <Icon name="Settings" size={18} />
        </Button>

        {/* Clear Chat */}
        {messageCount > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearChat}
            className="micro-feedback text-muted-foreground hover:text-destructive"
            title="Clear Chat"
          >
            <Icon name="Trash2" size={18} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;