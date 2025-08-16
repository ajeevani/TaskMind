import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickAddTask = ({ onAddTask, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isExpanded && inputRef?.current) {
      inputRef?.current?.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    if (taskTitle?.length > 3) {
      // Simulate AI suggestions based on input
      const suggestions = generateAISuggestions(taskTitle);
      setAiSuggestions(suggestions);
    } else {
      setAiSuggestions([]);
    }
  }, [taskTitle]);

  const generateAISuggestions = (input) => {
    const suggestions = [];
    
    // Smart deadline suggestions
    if (input?.toLowerCase()?.includes('meeting') || input?.toLowerCase()?.includes('call')) {
      suggestions?.push({
        type: 'deadline',
        text: 'Suggest scheduling for tomorrow at 2 PM',
        action: () => console.log('Schedule meeting')
      });
    }
    
    if (input?.toLowerCase()?.includes('review') || input?.toLowerCase()?.includes('check')) {
      suggestions?.push({
        type: 'priority',
        text: 'Set as medium priority with 1-hour estimate',
        action: () => console.log('Set priority')
      });
    }
    
    if (input?.toLowerCase()?.includes('urgent') || input?.toLowerCase()?.includes('asap')) {
      suggestions?.push({
        type: 'priority',
        text: 'Mark as urgent priority',
        action: () => console.log('Mark urgent')
      });
    }
    
    // Auto-completion suggestions
    const completions = [
      'Complete project documentation',
      'Review team performance metrics',
      'Update client presentation slides',
      'Schedule follow-up meeting with stakeholders'
    ];
    
    const matchingCompletions = completions?.filter(completion =>
      completion?.toLowerCase()?.includes(input?.toLowerCase()) && 
      completion?.toLowerCase() !== input?.toLowerCase()
    );
    
    matchingCompletions?.slice(0, 2)?.forEach(completion => {
      suggestions?.push({
        type: 'completion',
        text: completion,
        action: () => setTaskTitle(completion)
      });
    });
    
    return suggestions?.slice(0, 3);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!taskTitle?.trim()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: '',
        priority: 'medium',
        status: 'todo',
        dueDate: '',
        tags: [],
        assignee: 'me',
        estimatedTime: '',
        completed: false,
        createdAt: new Date()?.toISOString(),
        aiSuggestion: 'AI suggests breaking this task into smaller subtasks for better productivity.'
      };

      onAddTask(newTask);
      setTaskTitle('');
      setAiSuggestions([]);
      setIsExpanded(false);
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTaskTitle('');
    setAiSuggestions([]);
    setIsExpanded(false);
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {!isExpanded ? (
        // Collapsed State
        (<button
          onClick={() => setIsExpanded(true)}
          className="w-full p-4 text-left hover:bg-muted/50 transition-colors rounded-lg focus-ring"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Plus" size={16} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Add new task</p>
              <p className="text-sm text-muted-foreground">Quick task creation with AI assistance</p>
            </div>
          </div>
        </button>)
      ) : (
        // Expanded State
        (<div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder="What needs to be done?"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e?.target?.value)}
                className="w-full"
                disabled={isLoading}
              />
              
              {/* AI Suggestions */}
              {aiSuggestions?.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-popover border border-border rounded-md shadow-elevated animate-fade-in">
                  <div className="p-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Sparkles" size={14} className="text-primary" />
                      <span className="text-xs font-medium text-primary">AI Suggestions</span>
                    </div>
                    <div className="space-y-1">
                      {aiSuggestions?.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={suggestion?.action}
                          className="w-full text-left p-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                        >
                          <div className="flex items-start space-x-2">
                            <Icon 
                              name={suggestion?.type === 'completion' ? 'ArrowRight' : 'Lightbulb'} 
                              size={12} 
                              className="text-primary mt-0.5 shrink-0" 
                            />
                            <span>{suggestion?.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  type="submit"
                  size="sm"
                  loading={isLoading}
                  disabled={!taskTitle?.trim()}
                  className="micro-feedback"
                >
                  <Icon name="Plus" size={14} className="mr-1" />
                  Add Task
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  title="Set priority"
                  disabled={isLoading}
                >
                  <Icon name="Flag" size={14} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  title="Set due date"
                  disabled={isLoading}
                >
                  <Icon name="Calendar" size={14} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  title="Assign to someone"
                  disabled={isLoading}
                >
                  <Icon name="User" size={14} />
                </Button>
              </div>
            </div>
          </form>
          {/* AI Tip */}
          <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={14} className="text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-primary font-medium mb-1">AI Tip</p>
                <p className="text-xs text-foreground">
                  Try typing keywords like "urgent", "meeting", or "review" to get smart suggestions for priority and scheduling.
                </p>
              </div>
            </div>
          </div>
        </div>)
      )}
    </div>
  );
};

export default QuickAddTask;