import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TaskHeader = ({ task, onTaskUpdate, onDelete }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(task?.title || '');

  const handleTitleSave = () => {
    if (title?.trim() && title !== task?.title) {
      onTaskUpdate({ ...task, title: title?.trim() });
    }
    setIsEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setTitle(task?.title || '');
    setIsEditingTitle(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'in-progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'review': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-surface border-b border-border">
      <div className="px-4 lg:px-6 py-4">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Link to="/dashboard" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Icon name="ChevronRight" size={16} />
          <Link to="/task-management" className="hover:text-foreground transition-colors">
            Tasks
          </Link>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground font-medium">Task Detail</span>
        </nav>

        {/* Task Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            {/* Title */}
            <div className="mb-3">
              {isEditingTitle ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e?.target?.value)}
                    className="text-2xl font-bold flex-1"
                    placeholder="Enter task title..."
                    onKeyDown={(e) => {
                      if (e?.key === 'Enter') handleTitleSave();
                      if (e?.key === 'Escape') handleTitleCancel();
                    }}
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleTitleSave}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Icon name="Check" size={20} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleTitleCancel}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 group">
                  <h1 className="text-2xl font-bold text-foreground truncate">
                    {task?.title || 'Untitled Task'}
                  </h1>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditingTitle(true)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Icon name="Edit2" size={16} />
                  </Button>
                </div>
              )}
            </div>

            {/* Status and Priority Badges */}
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task?.status)}`}>
                {task?.status === 'in-progress' ? 'In Progress' : 
                 task?.status === 'completed' ? 'Completed' :
                 task?.status === 'review' ? 'In Review' : 'To Do'}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task?.priority)}`}>
                {task?.priority === 'urgent' ? 'Urgent' :
                 task?.priority === 'high' ? 'High Priority' :
                 task?.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
              </span>
              {task?.dueDate && (
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={16} />
                  <span>{new Date(task.dueDate)?.toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 ml-4">
            <Button variant="ghost" size="icon" className="micro-feedback">
              <Icon name="Share2" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="micro-feedback">
              <Icon name="Copy" size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onDelete}
              className="micro-feedback text-red-600 hover:text-red-700"
            >
              <Icon name="Trash2" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;