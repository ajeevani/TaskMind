import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingActionButton = ({ onCreateTask, onAIAssist }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCreateTask = () => {
    setIsExpanded(false);
    onCreateTask && onCreateTask();
  };

  const handleAIAssist = () => {
    setIsExpanded(false);
    onAIAssist && onAIAssist();
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-fab">
      {/* Expanded Actions */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 animate-slide-up">
          <Button
            variant="default"
            size="icon"
            onClick={handleCreateTask}
            className="w-12 h-12 rounded-full shadow-elevated micro-feedback"
            title="Create new task"
          >
            <Icon name="Plus" size={20} />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleAIAssist}
            className="w-12 h-12 rounded-full shadow-elevated micro-feedback bg-surface"
            title="AI assistance"
          >
            <Icon name="Brain" size={20} />
          </Button>
        </div>
      )}

      {/* Main FAB */}
      <Button
        variant="default"
        size="icon"
        onClick={toggleExpanded}
        className={`
          w-14 h-14 rounded-full shadow-elevated micro-feedback transition-transform duration-200
          ${isExpanded ? 'rotate-45' : 'rotate-0'}
        `}
        title={isExpanded ? "Close menu" : "Quick actions"}
      >
        <Icon name="Plus" size={24} />
      </Button>

      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 -z-10 bg-black/20 animate-fade-in"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;