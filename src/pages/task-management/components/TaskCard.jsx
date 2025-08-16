import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete, onDuplicate, onShare, className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-error border-error bg-error/5';
      case 'high': return 'text-warning border-warning bg-warning/5';
      case 'medium': return 'text-primary border-primary bg-primary/5';
      case 'low': return 'text-success border-success bg-success/5';
      default: return 'text-muted-foreground border-border bg-muted/5';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'in-progress': return 'text-primary bg-primary/10';
      case 'review': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays <= 7) return `${diffDays} days left`;
    
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    return date < today && task?.status !== 'completed';
  };

  const menuItems = [
    { label: 'Edit', icon: 'Edit', action: onEdit },
    { label: 'Duplicate', icon: 'Copy', action: onDuplicate },
    { label: 'Share', icon: 'Share', action: onShare },
    { label: 'Delete', icon: 'Trash2', action: onDelete, variant: 'destructive' }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-200 morph-transition ${className}`}>
      <div className="flex items-start space-x-3">
        {/* Completion Checkbox */}
        <div className="pt-1">
          <Checkbox
            checked={task?.completed || task?.status === 'completed'}
            onChange={(e) => onToggleComplete(task?.id, e?.target?.checked)}
            className="micro-feedback"
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`font-medium text-foreground line-clamp-2 ${task?.completed ? 'line-through opacity-60' : ''}`}>
              {task?.title}
            </h3>
            
            {/* Context Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="shrink-0 h-8 w-8 micro-feedback"
              >
                <Icon name="MoreVertical" size={16} />
              </Button>

              {isMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-8 z-20 bg-popover border border-border rounded-md shadow-elevated py-1 min-w-[140px] animate-fade-in">
                    {menuItems?.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          item?.action(task);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center space-x-2 transition-colors ${
                          item?.variant === 'destructive' ? 'text-error hover:bg-error/10' : 'text-foreground'
                        }`}
                      >
                        <Icon name={item?.icon} size={14} />
                        <span>{item?.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          {task?.description && (
            <p className={`text-sm text-muted-foreground mb-3 line-clamp-2 ${task?.completed ? 'opacity-60' : ''}`}>
              {task?.description}
            </p>
          )}

          {/* Task Meta Information */}
          <div className="flex items-center flex-wrap gap-2 mb-3">
            {/* Priority Badge */}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task?.priority)}`}>
              <Icon name="Flag" size={12} className="mr-1" />
              {task?.priority?.charAt(0)?.toUpperCase() + task?.priority?.slice(1)}
            </span>

            {/* Status Badge */}
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task?.status)}`}>
              {task?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
            </span>

            {/* Due Date */}
            {task?.dueDate && (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isOverdue(task?.dueDate) 
                  ? 'text-error bg-error/10 border border-error/20' :'text-muted-foreground bg-muted/50'
              }`}>
                <Icon name="Calendar" size={12} className="mr-1" />
                {formatDate(task?.dueDate)}
              </span>
            )}

            {/* Estimated Time */}
            {task?.estimatedTime && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-muted-foreground bg-muted/50">
                <Icon name="Clock" size={12} className="mr-1" />
                {task?.estimatedTime}
              </span>
            )}
          </div>

          {/* Tags */}
          {task?.tags && task?.tags?.length > 0 && (
            <div className="flex items-center flex-wrap gap-1">
              {task?.tags?.slice(0, 3)?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-accent/10 text-accent border border-accent/20"
                >
                  #{tag}
                </span>
              ))}
              {task?.tags?.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{task?.tags?.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Assignee */}
          {task?.assignee && (
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              <Icon name="User" size={12} className="mr-1" />
              <span>Assigned to {task?.assignee}</span>
            </div>
          )}

          {/* AI Suggestions */}
          {task?.aiSuggestion && (
            <div className="mt-3 p-2 bg-primary/5 border border-primary/20 rounded-md">
              <div className="flex items-start space-x-2">
                <Icon name="Lightbulb" size={14} className="text-primary mt-0.5 shrink-0" />
                <p className="text-xs text-primary">{task?.aiSuggestion}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;