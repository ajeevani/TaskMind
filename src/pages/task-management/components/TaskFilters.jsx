import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskFilters = ({ filters, onFiltersChange, isOpen, onToggle, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState(filters?.search || '');

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'review', label: 'In Review' },
    { value: 'completed', label: 'Completed' }
  ];

  const projectOptions = [
    { value: '', label: 'All Projects' },
    { value: 'website-redesign', label: 'Website Redesign' },
    { value: 'mobile-app', label: 'Mobile App Development' },
    { value: 'marketing-campaign', label: 'Marketing Campaign' },
    { value: 'product-launch', label: 'Product Launch' },
    { value: 'team-training', label: 'Team Training' }
  ];

  const assigneeOptions = [
    { value: '', label: 'All Assignees' },
    { value: 'me', label: 'Assigned to me' },
    { value: 'john', label: 'John Smith' },
    { value: 'sarah', label: 'Sarah Johnson' },
    { value: 'mike', label: 'Mike Chen' },
    { value: 'unassigned', label: 'Unassigned' }
  ];

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'created', label: 'Date Created' },
    { value: 'updated', label: 'Last Updated' },
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'ai-suggested', label: 'AI Suggested Order' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    handleFilterChange('search', value);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    onFiltersChange({
      search: '',
      priority: '',
      status: '',
      project: '',
      assignee: '',
      sortBy: 'dueDate',
      sortOrder: 'asc',
      showOverdue: false,
      showCompleted: true,
      dateRange: ''
    });
  };

  const hasActiveFilters = () => {
    return filters?.search || filters?.priority || filters?.status || 
           filters?.project || filters?.assignee || filters?.showOverdue || 
           !filters?.showCompleted || filters?.dateRange;
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full justify-between"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} />
            <span>Filters</span>
            {hasActiveFilters() && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={16} />
        </Button>
      </div>
      {/* Filter Panel */}
      <div className={`
        ${isOpen ? 'block' : 'hidden'} md:block
        bg-card border border-border rounded-lg p-4 space-y-4
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Filter" size={16} />
            <span>Filters</span>
          </h3>
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Search */}
        <div>
          <Input
            type="search"
            placeholder="Search tasks or ask AI..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full"
          />
          {searchQuery && (
            <div className="mt-2 p-2 bg-primary/5 border border-primary/20 rounded-md">
              <div className="flex items-center space-x-2">
                <Icon name="Sparkles" size={14} className="text-primary" />
                <span className="text-xs text-primary">AI is analyzing your search...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Filters */}
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            <Checkbox
              label="Show overdue only"
              checked={filters?.showOverdue || false}
              onChange={(e) => handleFilterChange('showOverdue', e?.target?.checked)}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Checkbox
              label="Include completed tasks"
              checked={filters?.showCompleted !== false}
              onChange={(e) => handleFilterChange('showCompleted', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 gap-4">
          <Select
            label="Priority"
            options={priorityOptions}
            value={filters?.priority || ''}
            onChange={(value) => handleFilterChange('priority', value)}
          />

          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status || ''}
            onChange={(value) => handleFilterChange('status', value)}
          />

          <Select
            label="Project"
            options={projectOptions}
            value={filters?.project || ''}
            onChange={(value) => handleFilterChange('project', value)}
          />

          <Select
            label="Assignee"
            options={assigneeOptions}
            value={filters?.assignee || ''}
            onChange={(value) => handleFilterChange('assignee', value)}
          />

          <Select
            label="Sort by"
            options={sortOptions}
            value={filters?.sortBy || 'dueDate'}
            onChange={(value) => handleFilterChange('sortBy', value)}
          />
        </div>

        {/* AI Suggestions */}
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-md ambient-glow">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Brain" size={14} className="text-primary" />
            <span className="text-sm font-medium text-primary">AI Filter Suggestions</span>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => handleFilterChange('priority', 'urgent')}
              className="block w-full text-left text-xs text-foreground hover:text-primary transition-colors"
            >
              • Show urgent tasks that need immediate attention
            </button>
            <button
              onClick={() => {
                handleFilterChange('showOverdue', true);
                handleFilterChange('showCompleted', false);
              }}
              className="block w-full text-left text-xs text-foreground hover:text-primary transition-colors"
            >
              • Focus on overdue items to catch up
            </button>
            <button
              onClick={() => handleFilterChange('sortBy', 'ai-suggested')}
              className="block w-full text-left text-xs text-foreground hover:text-primary transition-colors"
            >
              • Use AI-optimized task ordering
            </button>
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters() && (
          <div className="pt-3 border-t border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={14} className="text-success" />
              <span className="text-sm font-medium text-success">Active Filters</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters?.search && (
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                  Search: "{filters?.search}"
                </span>
              )}
              {filters?.priority && (
                <span className="inline-flex items-center px-2 py-1 bg-warning/10 text-warning text-xs rounded-md">
                  Priority: {filters?.priority}
                </span>
              )}
              {filters?.status && (
                <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-md">
                  Status: {filters?.status}
                </span>
              )}
              {filters?.showOverdue && (
                <span className="inline-flex items-center px-2 py-1 bg-error/10 text-error text-xs rounded-md">
                  Overdue Only
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskFilters;