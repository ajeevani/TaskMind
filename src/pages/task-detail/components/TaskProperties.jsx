import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const TaskProperties = ({ task, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    priority: task?.priority || 'medium',
    status: task?.status || 'todo',
    dueDate: task?.dueDate || '',
    assignee: task?.assignee || '',
    estimatedTime: task?.estimatedTime || '',
    tags: task?.tags || []
  });

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'review', label: 'In Review' },
    { value: 'completed', label: 'Completed' }
  ];

  const assigneeOptions = [
    { value: '', label: 'Unassigned' },
    { value: 'me', label: 'Assign to me' },
    { value: 'john', label: 'John Smith' },
    { value: 'sarah', label: 'Sarah Johnson' },
    { value: 'mike', label: 'Mike Chen' }
  ];

  const handleSave = () => {
    onTaskUpdate({ ...task, ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      priority: task?.priority || 'medium',
      status: task?.status || 'todo',
      dueDate: task?.dueDate || '',
      assignee: task?.assignee || '',
      estimatedTime: task?.estimatedTime || '',
      tags: task?.tags || []
    });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatAssigneeName = (assignee) => {
    const assigneeMap = {
      'me': 'You',
      'john': 'John Smith',
      'sarah': 'Sarah Johnson',
      'mike': 'Mike Chen'
    };
    return assigneeMap?.[assignee] || 'Unassigned';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Settings" size={20} />
          <span>Task Properties</span>
        </h3>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="micro-feedback"
          >
            <Icon name="Edit2" size={16} className="mr-2" />
            Edit
          </Button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Due Date"
              type="date"
              value={formData?.dueDate}
              onChange={(e) => handleInputChange('dueDate', e?.target?.value)}
            />
            <Input
              label="Estimated Time"
              type="text"
              placeholder="e.g., 2 hours, 30 minutes"
              value={formData?.estimatedTime}
              onChange={(e) => handleInputChange('estimatedTime', e?.target?.value)}
            />
          </div>

          <Select
            label="Assignee"
            options={assigneeOptions}
            value={formData?.assignee}
            onChange={(value) => handleInputChange('assignee', value)}
          />

          <div className="flex items-center space-x-2 pt-4">
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              className="micro-feedback"
            >
              <Icon name="Check" size={16} className="mr-2" />
              Save Changes
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              className="micro-feedback"
            >
              <Icon name="X" size={16} className="mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Priority</label>
              <p className="text-foreground font-medium capitalize">{task?.priority || 'Medium'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <p className="text-foreground font-medium">
                {task?.status === 'in-progress' ? 'In Progress' : 
                 task?.status === 'completed' ? 'Completed' :
                 task?.status === 'review' ? 'In Review' : 'To Do'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Due Date</label>
              <p className="text-foreground font-medium">
                {task?.dueDate ? new Date(task.dueDate)?.toLocaleDateString() : 'Not set'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Estimated Time</label>
              <p className="text-foreground font-medium">{task?.estimatedTime || 'Not specified'}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Assignee</label>
            <p className="text-foreground font-medium">{formatAssigneeName(task?.assignee)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskProperties;