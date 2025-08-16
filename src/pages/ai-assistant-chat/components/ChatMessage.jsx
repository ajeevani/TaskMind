import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatMessage = ({ message, onActionClick }) => {
  const formatTime = (date) => {
    return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderActionableContent = () => {
    if (message?.actionableContent) {
      return (
        <div className="mt-3 space-y-2">
          {message?.actionableContent?.map((action, index) => (
            <div key={index} className="bg-muted/50 rounded-lg p-3 border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm">{action?.title}</h4>
                  {action?.description && (
                    <p className="text-xs text-muted-foreground mt-1">{action?.description}</p>
                  )}
                  {action?.dueDate && (
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <Icon name="Calendar" size={12} className="mr-1" />
                      {action?.dueDate}
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onActionClick?.(action)}
                  className="ml-2 shrink-0"
                >
                  <Icon name="Plus" size={14} className="mr-1" />
                  Add
                </Button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`max-w-[85%] ${message?.type === 'user' ? 'ml-4' : 'mr-4'}`}>
        {message?.type === 'ai' && (
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Bot" size={12} color="white" />
            </div>
            <span className="text-xs text-muted-foreground">TaskMind AI</span>
          </div>
        )}
        
        <div className={`
          rounded-lg p-3 shadow-soft
          ${message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-card text-card-foreground border border-border'
          }
        `}>
          <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
          {renderActionableContent()}
          
          <div className="flex items-center justify-between mt-2">
            <p className={`text-xs ${
              message?.type === 'user' ?'text-primary-foreground/70' :'text-muted-foreground'
            }`}>
              {formatTime(message?.timestamp)}
            </p>
            
            {message?.type === 'ai' && (
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Icon name="ThumbsUp" size={12} />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Icon name="Copy" size={12} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;