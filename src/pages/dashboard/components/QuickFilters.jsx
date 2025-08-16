import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickFilters = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: 'List',
      count: taskCounts?.all,
      description: 'View all tasks'
    },
    {
      id: 'personal',
      label: 'Personal',
      icon: 'User',
      count: taskCounts?.personal,
      description: 'Your personal tasks'
    },
    {
      id: 'team',
      label: 'Team',
      icon: 'Users',
      count: taskCounts?.team,
      description: 'Team assignments'
    },
    {
      id: 'ai-suggested',
      label: 'AI Suggested',
      icon: 'Brain',
      count: taskCounts?.aiSuggested,
      description: 'AI recommendations'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-soft p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Quick Filters</h3>
        <Icon name="Filter" size={16} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {filters?.map((filter) => (
          <Button
            key={filter?.id}
            variant={activeFilter === filter?.id ? "default" : "outline"}
            onClick={() => onFilterChange(filter?.id)}
            className={`
              flex flex-col items-center p-4 h-auto space-y-2 micro-feedback
              ${activeFilter === filter?.id ? 'ambient-glow' : ''}
            `}
            title={filter?.description}
          >
            <div className="flex items-center space-x-2">
              <Icon 
                name={filter?.icon} 
                size={18} 
                className={activeFilter === filter?.id ? 'text-primary-foreground' : 'text-current'} 
              />
              {filter?.count > 0 && (
                <span className={`
                  text-xs px-2 py-0.5 rounded-full font-medium
                  ${activeFilter === filter?.id 
                    ? 'bg-primary-foreground/20 text-primary-foreground' 
                    : 'bg-primary text-primary-foreground'
                  }
                `}>
                  {filter?.count}
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-center leading-tight">
              {filter?.label}
            </span>
          </Button>
        ))}
      </div>
      {/* Additional Filter Options */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" className="text-xs">
            <Icon name="Calendar" size={14} className="mr-1" />
            Today
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            <Icon name="Clock" size={14} className="mr-1" />
            Overdue
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            <Icon name="Star" size={14} className="mr-1" />
            Starred
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            <Icon name="AlertTriangle" size={14} className="mr-1" />
            High Priority
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;