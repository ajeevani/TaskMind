import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskDescription = ({ task, onTaskUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task?.description || '');

  const handleSave = () => {
    if (description !== task?.description) {
      onTaskUpdate({ ...task, description });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDescription(task?.description || '');
    setIsEditing(false);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="FileText" size={20} />
          <span>Description</span>
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
          <textarea
            value={description}
            onChange={(e) => setDescription(e?.target?.value)}
            placeholder="Add a detailed description for this task..."
            rows={6}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none text-foreground bg-background"
          />
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              className="micro-feedback"
            >
              <Icon name="Check" size={16} className="mr-2" />
              Save
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
        <div className="prose prose-sm max-w-none">
          {task?.description ? (
            <div className="text-foreground whitespace-pre-wrap">
              {task?.description}
            </div>
          ) : (
            <div className="text-muted-foreground italic">
              No description provided. Click "Edit" to add one.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDescription;