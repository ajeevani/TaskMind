import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionSelect, isVisible = true }) => {
  const quickActions = [
    {
      id: 'create-task',
      label: 'Create new task',
      icon: 'Plus',
      description: 'Start a new task with AI assistance'
    },
    {
      id: 'schedule-today',
      label: 'Schedule for today',
      icon: 'Calendar',
      description: 'Plan tasks for today'
    },
    {
      id: 'productivity-insights',
      label: 'Show productivity insights',
      icon: 'BarChart3',
      description: 'View your performance analytics'
    },
    {
      id: 'organize-tasks',
      label: 'Organize my tasks',
      icon: 'ArrowUpDown',
      description: 'Smart task prioritization'
    },
    {
      id: 'find-overdue',
      label: 'Find overdue items',
      icon: 'AlertCircle',
      description: 'Check for missed deadlines'
    },
    {
      id: 'weekly-summary',
      label: 'Weekly summary',
      icon: 'TrendingUp',
      description: 'Get your week overview'
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="p-4 border-t border-border bg-muted/30">
      <div className="mb-3">
        <h3 className="text-sm font-medium text-foreground mb-1">Quick Actions</h3>
        <p className="text-xs text-muted-foreground">Tap to get started with common tasks</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant="outline"
            size="sm"
            onClick={() => onActionSelect?.(action)}
            className="justify-start h-auto p-3 anticipatory-hover"
          >
            <div className="flex items-start space-x-3 w-full">
              <div className="shrink-0 w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                <Icon name={action?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-sm text-foreground">{action?.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{action?.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;