import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ChatInput = ({ onSendMessage, disabled = false, placeholder = "Ask me anything..." }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!message?.trim() || disabled) return;

    onSendMessage?.(message?.trim());
    setMessage('');
    inputRef?.current?.focus();
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      // In a real app, this would stop voice recognition and process the audio
      console.log('Voice recording stopped');
    } else {
      // Start recording
      setIsRecording(true);
      // In a real app, this would start voice recognition
      console.log('Voice recording started');
      
      // Simulate voice input after 3 seconds
      setTimeout(() => {
        setMessage("Create a task to review quarterly reports");
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-border bg-surface">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 pr-12 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-foreground placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              minHeight: '48px',
              maxHeight: '120px',
              overflowY: message?.length > 100 ? 'auto' : 'hidden'
            }}
          />
          
          {/* Voice Input Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleVoiceToggle}
            disabled={disabled}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 ${
              isRecording ? 'text-error animate-pulse' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={isRecording ? "MicOff" : "Mic"} size={16} />
          </Button>
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          size="icon"
          disabled={!message?.trim() || disabled}
          className="shrink-0 w-12 h-12 micro-feedback"
        >
          <Icon name="Send" size={18} />
        </Button>
      </form>
      {/* Voice Recording Indicator */}
      {isRecording && (
        <div className="mt-2 flex items-center justify-center space-x-2 text-sm text-error animate-fade-in">
          <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
          <span>Listening... Speak now</span>
          <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
        </div>
      )}
      {/* Input Hints */}
      <div className="mt-2 flex flex-wrap gap-2">
        {['Create task', 'Schedule meeting', 'Show insights', 'Organize tasks']?.map((hint) => (
          <Button
            key={hint}
            variant="ghost"
            size="sm"
            onClick={() => setMessage(hint)}
            disabled={disabled}
            className="text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
          >
            {hint}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChatInput;