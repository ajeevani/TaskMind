import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PriorityTaskQueue = ({ tasks, onTaskComplete, onTaskReschedule, onTaskClick }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-l-error bg-error/5';
      case 'high': return 'border-l-warning bg-warning/5';
      case 'medium': return 'border-l-primary bg-primary/5';
      default: return 'border-l-muted-foreground bg-muted/5';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return 'AlertTriangle';
      case 'high': return 'ArrowUp';
      case 'medium': return 'Minus';
      default: return 'ArrowDown';
    }
  };

  const formatTime = (time) => {
    return new Date(`2025-08-16T${time}`)?.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Priority Queue</h3>
            <p className="text-sm text-muted-foreground">AI-optimized task ordering</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Brain" size={16} className="text-primary" />
            <span className="text-xs text-primary font-medium">AI Sorted</span>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {tasks?.map((task) => (
          <div 
            key={task?.id} 
            className={`p-4 border-l-4 ${getPriorityColor(task?.priority)} hover:bg-muted/30 transition-colors cursor-pointer`}
            onClick={() => onTaskClick && onTaskClick(task)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon 
                    name={getPriorityIcon(task?.priority)} 
                    size={14} 
                    className={`${task?.priority === 'urgent' ? 'text-error' : 
                      task?.priority === 'high' ? 'text-warning' : 
                      task?.priority === 'medium' ? 'text-primary' : 'text-muted-foreground'}`} 
                  />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {task?.priority}
                  </span>
                  {task?.dueTime && (
                    <span className="text-xs text-muted-foreground">
                      Due {formatTime(task?.dueTime)}
                    </span>
                  )}
                </div>
                
                <h4 className="font-medium text-foreground mb-1 truncate">{task?.title}</h4>
                
                {task?.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {task?.description}
                  </p>
                )}

                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  {task?.estimatedTime && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{task?.estimatedTime}</span>
                    </div>
                  )}
                  {task?.category && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Tag" size={12} />
                      <span>{task?.category}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onTaskComplete && onTaskComplete(task?.id);
                  }}
                  className="micro-feedback"
                  title="Mark as complete"
                >
                  <Icon name="Check" size={16} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onTaskReschedule && onTaskReschedule(task?.id);
                  }}
                  className="micro-feedback"
                  title="Reschedule"
                >
                  <Icon name="Calendar" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {tasks?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="font-medium text-foreground mb-2">All caught up!</h4>
          <p className="text-sm text-muted-foreground">No priority tasks for today</p>
        </div>
      )}
    </div>
  );
};

export default PriorityTaskQueue;