import React from 'react';
import Icon from '../../../components/AppIcon';

const TypingIndicator = ({ isVisible = false }) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start animate-fade-in">
      <div className="mr-4 max-w-[85%]">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center ambient-glow">
            <Icon name="Bot" size={12} color="white" />
          </div>
          <span className="text-xs text-muted-foreground">TaskMind AI</span>
        </div>
        
        <div className="bg-card text-card-foreground border border-border rounded-lg p-3 shadow-soft ai-pulse">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm text-muted-foreground">AI is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;