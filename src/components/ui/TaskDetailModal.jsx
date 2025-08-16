import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { Checkbox } from './Checkbox';

const TaskDetailModal = ({ isOpen, onClose, task, onSave, className = '' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    dueDate: '',
    tags: [],
    assignee: '',
    estimatedTime: '',
    completed: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task?.title || '',
        description: task?.description || '',
        priority: task?.priority || 'medium',
        status: task?.status || 'todo',
        dueDate: task?.dueDate || '',
        tags: task?.tags || [],
        assignee: task?.assignee || '',
        estimatedTime: task?.estimatedTime || '',
        completed: task?.completed || false
      });
      
      // Simulate AI suggestions
      setAiSuggestions([
        'Break this task into smaller subtasks',
        'Consider setting a deadline for better productivity',
        'Add relevant tags for better organization'
      ]);
    }
  }, [task]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      if (onSave) {
        onSave({ ...task, ...formData });
      }
      onClose();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', description: 'Can be done later' },
    { value: 'medium', label: 'Medium Priority', description: 'Normal importance' },
    { value: 'high', label: 'High Priority', description: 'Needs attention soon' },
    { value: 'urgent', label: 'Urgent', description: 'Critical priority' }
  ];

  const statusOptions = [
    { value: 'todo', label: 'To Do', description: 'Not started' },
    { value: 'in-progress', label: 'In Progress', description: 'Currently working' },
    { value: 'review', label: 'In Review', description: 'Awaiting feedback' },
    { value: 'completed', label: 'Completed', description: 'Finished' }
  ];

  const assigneeOptions = [
    { value: '', label: 'Unassigned' },
    { value: 'me', label: 'Assign to me' },
    { value: 'john', label: 'John Smith' },
    { value: 'sarah', label: 'Sarah Johnson' },
    { value: 'mike', label: 'Mike Chen' }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Modal */}
      <div className="md:hidden fixed inset-0 z-modal bg-black/50 animate-fade-in" onClick={onClose}>
        <div 
          className="absolute inset-x-0 bottom-0 bg-surface rounded-t-lg animate-slide-up max-h-[90vh] overflow-hidden"
          onClick={(e) => e?.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">
                {task?.id ? 'Edit Task' : 'New Task'}
              </h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* AI Suggestions */}
              {aiSuggestions?.length > 0 && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 ambient-glow">
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Lightbulb" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">AI Suggestions</span>
                  </div>
                  <div className="space-y-2">
                    {aiSuggestions?.map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={14} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Fields */}
              <div className="space-y-4">
                <Input
                  label="Task Title"
                  type="text"
                  placeholder="Enter task title..."
                  value={formData?.title}
                  onChange={(e) => handleInputChange('title', e?.target?.value)}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Add task description..."
                    value={formData?.description}
                    onChange={(e) => handleInputChange('description', e?.target?.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Priority"
                    options={priorityOptions}
                    value={formData?.priority}
                    onChange={(value) => handleInputChange('priority', value)}
                  />

                  <Select
                    label="Status"
                    options={statusOptions}
                    value={formData?.status}
                    onChange={(value) => handleInputChange('status', value)}
                  />
                </div>

                <Input
                  label="Due Date"
                  type="date"
                  value={formData?.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e?.target?.value)}
                />

                <Select
                  label="Assignee"
                  options={assigneeOptions}
                  value={formData?.assignee}
                  onChange={(value) => handleInputChange('assignee', value)}
                />

                <Input
                  label="Estimated Time"
                  type="text"
                  placeholder="e.g., 2 hours, 30 minutes"
                  value={formData?.estimatedTime}
                  onChange={(e) => handleInputChange('estimatedTime', e?.target?.value)}
                />

                <Checkbox
                  label="Mark as completed"
                  checked={formData?.completed}
                  onChange={(e) => handleInputChange('completed', e?.target?.checked)}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-3">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave} 
                  loading={isLoading}
                  className="flex-1"
                  disabled={!formData?.title?.trim()}
                >
                  {task?.id ? 'Update Task' : 'Create Task'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed right-0 top-16 bottom-0 w-96 z-modal bg-surface border-l border-border animate-slide-down">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">
              {task?.id ? 'Edit Task' : 'New Task'}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* AI Suggestions */}
            {aiSuggestions?.length > 0 && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 ambient-glow">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Lightbulb" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">AI Suggestions</span>
                </div>
                <div className="space-y-2">
                  {aiSuggestions?.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="ArrowRight" size={14} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              <Input
                label="Task Title"
                type="text"
                placeholder="Enter task title..."
                value={formData?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Add task description..."
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>

              <Select
                label="Priority"
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => handleInputChange('priority', value)}
              />

              <Select
                label="Status"
                options={statusOptions}
                value={formData?.status}
                onChange={(value) => handleInputChange('status', value)}
              />

              <Input
                label="Due Date"
                type="date"
                value={formData?.dueDate}
                onChange={(e) => handleInputChange('dueDate', e?.target?.value)}
              />

              <Select
                label="Assignee"
                options={assigneeOptions}
                value={formData?.assignee}
                onChange={(value) => handleInputChange('assignee', value)}
              />

              <Input
                label="Estimated Time"
                type="text"
                placeholder="e.g., 2 hours, 30 minutes"
                value={formData?.estimatedTime}
                onChange={(e) => handleInputChange('estimatedTime', e?.target?.value)}
              />

              <Checkbox
                label="Mark as completed"
                checked={formData?.completed}
                onChange={(e) => handleInputChange('completed', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleSave} 
                loading={isLoading}
                className="flex-1 micro-feedback"
                disabled={!formData?.title?.trim()}
              >
                {task?.id ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetailModal;