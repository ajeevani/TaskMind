import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const BulkActions = ({ selectedTasks, onBulkAction, onClearSelection, className = '' }) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const bulkActionOptions = [
    { value: 'mark-complete', label: 'Mark as Complete', icon: 'CheckCircle' },
    { value: 'mark-incomplete', label: 'Mark as Incomplete', icon: 'Circle' },
    { value: 'set-priority-high', label: 'Set Priority: High', icon: 'Flag' },
    { value: 'set-priority-medium', label: 'Set Priority: Medium', icon: 'Flag' },
    { value: 'set-priority-low', label: 'Set Priority: Low', icon: 'Flag' },
    { value: 'assign-to-me', label: 'Assign to Me', icon: 'User' },
    { value: 'duplicate', label: 'Duplicate Tasks', icon: 'Copy' },
    { value: 'export', label: 'Export Selected', icon: 'Download' },
    { value: 'delete', label: 'Delete Tasks', icon: 'Trash2', variant: 'destructive' }
  ];

  const handleBulkAction = async (actionValue) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onBulkAction(actionValue, selectedTasks);
      setIsActionsOpen(false);
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedTasks?.length === 0) return null;

  return (
    <div className={`bg-primary/5 border border-primary/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        {/* Selection Info */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={16} className="text-primary" />
            <span className="font-medium text-primary">
              {selectedTasks?.length} task{selectedTasks?.length > 1 ? 's' : ''} selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear selection
          </Button>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Quick Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('mark-complete')}
              disabled={isLoading}
              className="micro-feedback"
            >
              <Icon name="CheckCircle" size={14} className="mr-1" />
              Complete
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('set-priority-high')}
              disabled={isLoading}
              className="micro-feedback"
            >
              <Icon name="Flag" size={14} className="mr-1" />
              High Priority
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleBulkAction('assign-to-me')}
              disabled={isLoading}
              className="micro-feedback"
            >
              <Icon name="User" size={14} className="mr-1" />
              Assign to Me
            </Button>
          </div>

          {/* More Actions Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              disabled={isLoading}
              className="micro-feedback"
            >
              <Icon name="MoreHorizontal" size={14} className="mr-1" />
              <span className="hidden sm:inline">More Actions</span>
              <Icon name="ChevronDown" size={12} className="ml-1" />
            </Button>

            {isActionsOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsActionsOpen(false)}
                />
                <div className="absolute right-0 top-full z-20 mt-1 bg-popover border border-border rounded-md shadow-elevated py-1 min-w-[200px] animate-fade-in">
                  {bulkActionOptions?.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleBulkAction(action?.value)}
                      disabled={isLoading}
                      className={`
                        w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center space-x-2 transition-colors
                        ${action?.variant === 'destructive' ? 'text-error hover:bg-error/10' : 'text-foreground'}
                        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      <Icon name={action?.icon} size={14} />
                      <span>{action?.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* AI Suggestions for Bulk Actions */}
      <div className="mt-3 p-3 bg-background/50 rounded-md">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={14} className="text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-medium text-primary mb-1">AI Suggestion</p>
            <p className="text-xs text-foreground">
              {selectedTasks?.length > 5 
                ? "Consider breaking down large tasks into smaller subtasks before bulk operations."
                : selectedTasks?.some(task => task?.priority === 'urgent')
                ? "Some selected tasks are urgent. Consider prioritizing them first." :"You can assign all selected tasks to team members for better collaboration."
              }
            </p>
          </div>
        </div>
      </div>
      {/* Loading State */}
      {isLoading && (
        <div className="mt-3 flex items-center space-x-2 text-primary">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm">Processing bulk action...</span>
        </div>
      )}
    </div>
  );
};

export default BulkActions;