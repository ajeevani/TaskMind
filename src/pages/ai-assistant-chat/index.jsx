import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import QuickActions from './components/QuickActions';
import SuggestedPrompts from './components/SuggestedPrompts';
import { generateStructuredChatResponse } from '../../services/openaiService';

const AIAssistantChat = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hello! I'm TaskMind AI, your intelligent productivity assistant. I can help you:\n\n• Create and organize tasks\n• Analyze your productivity patterns\n• Suggest optimal schedules\n• Provide workflow insights\n• Answer questions about your tasks\n\nHow can I assist you today?`,
      timestamp: new Date(Date.now() - 300000),
      actionableContent: null
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setShowQuickActions(false);

    try {
      // Get conversation history for context (last 10 messages)
      const conversationHistory = messages?.slice(-10);
      const aiResponseData = await generateStructuredChatResponse(messageText, conversationHistory);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponseData?.content,
        timestamp: new Date(),
        actionableContent: aiResponseData?.actionableContent
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'I apologize, but I\'m having trouble connecting to my AI services right now. Please check your OpenAI API key configuration and try again. You can update your API key in the .env file.',
        timestamp: new Date(),
        actionableContent: null
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptSelect = (promptText) => {
    handleSendMessage(promptText);
  };

  const handleQuickActionSelect = (action) => {
    const actionMessages = {
      'create-task': 'Help me create a new task',
      'schedule-today': 'Show me an optimized schedule for today',
      'productivity-insights': 'Analyze my productivity patterns this week',
      'organize-tasks': 'Help me organize and prioritize my tasks',
      'find-overdue': 'Show me any overdue tasks or upcoming deadlines',
      'weekly-summary': 'Give me a summary of this week\'s productivity'
    };
    
    const message = actionMessages?.[action?.id] || action?.label;
    handleSendMessage(message);
  };

  const handleActionableClick = (action) => {
    // In a real app, this would add the task to the user's task list console.log('Adding task:', action);
    
    // Show confirmation message
    const confirmationMessage = {
      id: Date.now(),
      type: 'ai',
      content: `✅ Great! I've added "${action?.title}" to your task list. You can view and manage it in your Task Management section.`,
      timestamp: new Date(),
      actionableContent: null
    };
    
    setMessages(prev => [...prev, confirmationMessage]);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: `Hello! I'm TaskMind AI, your intelligent productivity assistant. I can help you:\n\n• Create and organize tasks\n• Analyze your productivity patterns\n• Suggest optimal schedules\n• Provide workflow insights\n• Answer questions about your tasks\n\nHow can I assist you today?`,
        timestamp: new Date(),
        actionableContent: null
      }
    ]);
    setShowQuickActions(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader onAIToggle={() => {}} />
      <PrimaryNavigation />
      {/* Main Content */}
      <main className="pt-16 md:pt-32 pb-20 md:pb-4 min-h-screen">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {/* Chat Header */}
          <ChatHeader 
            onClearChat={handleClearChat}
            messageCount={messages?.length}
          />

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto">
            {/* Welcome/Suggested Prompts */}
            {messages?.length <= 1 && (
              <SuggestedPrompts 
                onPromptSelect={handlePromptSelect}
                isVisible={showQuickActions}
              />
            )}

            {/* Messages */}
            <div className="p-4 space-y-4">
              {messages?.map((message) => (
                <ChatMessage
                  key={message?.id}
                  message={message}
                  onActionClick={handleActionableClick}
                />
              ))}
              
              <TypingIndicator isVisible={isTyping} />
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages?.length > 1 && !isTyping && (
              <QuickActions 
                onActionSelect={handleQuickActionSelect}
                isVisible={showQuickActions}
              />
            )}
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isTyping}
            placeholder="Ask me about tasks, productivity, or anything else..."
          />
        </div>
      </main>
    </div>
  );
};

export default AIAssistantChat;