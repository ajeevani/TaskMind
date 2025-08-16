import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SubtasksList = ({ task, onTaskUpdate }) => {
  const [subtasks, setSubtasks] = useState(task?.subtasks || [
    { id: 1, title: "Research competitor analysis", completed: true, createdAt: new Date('2025-08-14') },
    { id: 2, title: "Create wireframes for main pages", completed: false, createdAt: new Date('2025-08-15') },
    { id: 3, title: "Set up development environment", completed: false, createdAt: new Date('2025-08-16') }
  ]);
  const [newSubtask, setNewSubtask] = useState('');
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);

  const handleAddSubtask = () => {
    if (newSubtask?.trim()) {
      const newTask = {
        id: Date.now(),
        title: newSubtask?.trim(),
        completed: false,
        createdAt: new Date()
      };
      const updatedSubtasks = [...subtasks, newTask];
      setSubtasks(updatedSubtasks);
      onTaskUpdate({ ...task, subtasks: updatedSubtasks });
      setNewSubtask('');
      setIsAddingSubtask(false);
    }
  };

  const handleToggleSubtask = (subtaskId) => {
    const updatedSubtasks = subtasks?.map(subtask =>
      subtask?.id === subtaskId 
        ? { ...subtask, completed: !subtask?.completed }
        : subtask
    );
    setSubtasks(updatedSubtasks);
    onTaskUpdate({ ...task, subtasks: updatedSubtasks });
  };

  const handleDeleteSubtask = (subtaskId) => {
    const updatedSubtasks = subtasks?.filter(subtask => subtask?.id !== subtaskId);
    setSubtasks(updatedSubtasks);
    onTaskUpdate({ ...task, subtasks: updatedSubtasks });
  };

  const completedCount = subtasks?.filter(subtask => subtask?.completed)?.length;
  const progressPercentage = subtasks?.length > 0 ? (completedCount / subtasks?.length) * 100 : 0;

  const aiSuggestions = [
    "Break down 'Create wireframes' into individual page wireframes",
    "Add \'Review and testing\' as final subtask",
    "Consider adding time estimates for each subtask"
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="CheckSquare" size={20} />
          <h3 className="text-lg font-semibold text-foreground">Subtasks</h3>
          <span className="text-sm text-muted-foreground">
            ({completedCount}/{subtasks?.length})
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsAddingSubtask(true)}
          className="micro-feedback"
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Add Subtask
        </Button>
      </div>
      {/* Progress Bar */}
      {subtasks?.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
      {/* AI Suggestions */}
      <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Lightbulb" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">AI Subtask Suggestions</span>
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
      {/* Add New Subtask */}
      {isAddingSubtask && (
        <div className="mb-4 p-4 border border-border rounded-lg bg-muted/30">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter subtask title..."
              value={newSubtask}
              onChange={(e) => setNewSubtask(e?.target?.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e?.key === 'Enter') handleAddSubtask();
                if (e?.key === 'Escape') {
                  setIsAddingSubtask(false);
                  setNewSubtask('');
                }
              }}
              autoFocus
            />
            <Button
              variant="default"
              size="icon"
              onClick={handleAddSubtask}
              disabled={!newSubtask?.trim()}
            >
              <Icon name="Check" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsAddingSubtask(false);
                setNewSubtask('');
              }}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>
      )}
      {/* Subtasks List */}
      <div className="space-y-3">
        {subtasks?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="CheckSquare" size={48} className="mx-auto mb-3 opacity-50" />
            <p>No subtasks yet. Break down this task into smaller steps.</p>
          </div>
        ) : (
          subtasks?.map((subtask, index) => (
            <div 
              key={subtask?.id} 
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 animate-fade-in ${
                subtask?.completed 
                  ? 'bg-green-50 border-green-200' :'bg-background border-border hover:bg-muted/50'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Checkbox
                checked={subtask?.completed}
                onChange={() => handleToggleSubtask(subtask?.id)}
                className="shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  subtask?.completed 
                    ? 'text-muted-foreground line-through' 
                    : 'text-foreground'
                }`}>
                  {subtask?.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  Created {subtask?.createdAt?.toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteSubtask(subtask?.id)}
                className="shrink-0 text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubtasksList;