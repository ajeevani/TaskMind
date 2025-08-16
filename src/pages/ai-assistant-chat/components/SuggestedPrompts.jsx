import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuggestedPrompts = ({ onPromptSelect, isVisible = true }) => {
  const prompts = [
    {
      id: 'productivity-analysis',
      text: "Analyze my productivity patterns this week",
      icon: 'TrendingUp',
      category: 'insights'
    },
    {
      id: 'task-prioritization',
      text: "Help me prioritize my tasks for today",
      icon: 'ArrowUpDown',
      category: 'organization'
    },
    {
      id: 'schedule-optimization',
      text: "Optimize my schedule for maximum productivity",
      icon: 'Calendar',
      category: 'planning'
    },
    {
      id: 'deadline-check',
      text: "Show me tasks with upcoming deadlines",
      icon: 'Clock',
      category: 'alerts'
    },
    {
      id: 'workflow-improvement',
      text: "Suggest improvements to my workflow",
      icon: 'Zap',
      category: 'optimization'
    },
    {
      id: 'team-collaboration',
      text: "Help me coordinate with my team",
      icon: 'Users',
      category: 'collaboration'
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="MessageSquare" size={24} className="text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Welcome to TaskMind AI
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          I'm here to help you manage tasks, boost productivity, and optimize your workflow. Try asking me something!
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">Suggested prompts:</h3>
        <div className="grid gap-2">
          {prompts?.map((prompt) => (
            <Button
              key={prompt?.id}
              variant="outline"
              onClick={() => onPromptSelect?.(prompt?.text)}
              className="justify-start h-auto p-3 text-left anticipatory-hover"
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="shrink-0 w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                  <Icon name={prompt?.icon} size={16} className="text-primary" />
                </div>
                <span className="text-sm text-foreground">{prompt?.text}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-6 p-3 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5 shrink-0" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Pro tip:</p>
            <p>You can ask me to create tasks, set reminders, analyze your productivity, or help organize your workflow. I learn from your patterns to provide better suggestions over time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestedPrompts;