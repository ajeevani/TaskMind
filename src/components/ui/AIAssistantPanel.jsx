import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import { generateAssistantResponse } from '../../services/openaiService';

const AIAssistantPanel = ({ isOpen, onClose, className = '' }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI assistant. I can help you manage tasks, provide insights, and answer questions about your productivity. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage?.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Get conversation history for context (last 10 messages)
      const conversationHistory = messages?.slice(-10);
      const aiResponseContent = await generateAssistantResponse(inputMessage, conversationHistory);
      
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponseContent,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'I apologize, but I\'m having trouble connecting to my AI services right now. Please check your API key configuration and try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickActions = [
    { label: 'Organize my tasks', icon: 'ArrowUpDown' },
    { label: 'Show productivity insights', icon: 'BarChart3' },
    { label: 'Create a schedule', icon: 'Calendar' },
    { label: 'Find overdue items', icon: 'AlertCircle' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="md:hidden fixed inset-0 z-ai-panel bg-black/50 animate-fade-in" onClick={onClose}>
        <div 
          className="absolute inset-x-0 bottom-0 bg-surface rounded-t-lg animate-slide-up"
          onClick={(e) => e?.stopPropagation()}
        >
          <div className="flex flex-col h-[85vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages?.map((message) => (
                <div
                  key={message?.id}
                  className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`
                      max-w-[80%] rounded-lg p-3 animate-fade-in
                      ${message?.type === 'user' ?'bg-primary text-primary-foreground ml-4' :'bg-muted text-foreground mr-4'
                      }
                    `}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
                    <p className={`text-xs mt-1 ${message?.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {formatTime(message?.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground rounded-lg p-3 mr-4 animate-fade-in">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-border">
              <div className="grid grid-cols-2 gap-2 mb-4">
                {quickActions?.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="justify-start text-xs"
                    onClick={() => setInputMessage(action?.label)}
                  >
                    <Icon name={action?.icon} size={14} className="mr-2" />
                    {action?.label}
                  </Button>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask me anything..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e?.target?.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!inputMessage?.trim()}>
                  <Icon name="Send" size={18} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed right-0 top-16 bottom-0 w-80 z-ai-panel bg-surface border-l border-border animate-slide-down">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center ambient-glow">
                <Icon name="Bot" size={16} color="white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Assistant</h3>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`flex ${message?.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    max-w-[85%] rounded-lg p-3 animate-fade-in
                    ${message?.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
                    }
                  `}
                >
                  <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
                  <p className={`text-xs mt-1 ${message?.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {formatTime(message?.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground rounded-lg p-3 animate-fade-in ai-pulse">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-border">
            <div className="grid grid-cols-1 gap-2 mb-4">
              {quickActions?.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="justify-start text-xs anticipatory-hover"
                  onClick={() => setInputMessage(action?.label)}
                >
                  <Icon name={action?.icon} size={14} className="mr-2" />
                  {action?.label}
                </Button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Ask me anything..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e?.target?.value)}
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!inputMessage?.trim()}
                className="micro-feedback"
              >
                <Icon name="Send" size={18} />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIAssistantPanel;