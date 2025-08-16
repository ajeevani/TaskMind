import React from 'react';
import Icon from '../../../components/AppIcon';

const TaskTabs = ({ activeTab, onTabChange, taskCounts, className = '' }) => {
  const tabs = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: 'List',
      count: taskCounts?.all || 0,
      description: 'View all tasks'
    },
    {
      id: 'today',
      label: 'Today',
      icon: 'Calendar',
      count: taskCounts?.today || 0,
      description: 'Tasks due today'
    },
    {
      id: 'upcoming',
      label: 'Upcoming',
      icon: 'Clock',
      count: taskCounts?.upcoming || 0,
      description: 'Future tasks'
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: 'CheckCircle',
      count: taskCounts?.completed || 0,
      description: 'Finished tasks'
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-1 ${className}`}>
      {/* Desktop Tabs */}
      <div className="hidden md:flex space-x-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`
              flex items-center space-x-2 px-4 py-3 rounded-md transition-all duration-200 flex-1
              ${activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
              focus-ring micro-feedback
            `}
            title={tab?.description}
          >
            <Icon 
              name={tab?.icon} 
              size={16} 
              className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-current'} 
            />
            <span className="font-medium">{tab?.label}</span>
            {tab?.count > 0 && (
              <span className={`
                inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium
                ${activeTab === tab?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-primary/10 text-primary'
                }
              `}>
                {tab?.count > 99 ? '99+' : tab?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Mobile Tabs */}
      <div className="md:hidden flex space-x-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`
              flex flex-col items-center justify-center px-2 py-3 rounded-md transition-all duration-200 flex-1 min-h-[60px]
              ${activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
              focus-ring micro-feedback
            `}
            title={tab?.description}
          >
            <div className="relative">
              <Icon 
                name={tab?.icon} 
                size={20} 
                className={`mb-1 ${activeTab === tab?.id ? 'text-primary-foreground' : 'text-current'}`} 
              />
              {tab?.count > 0 && (
                <span className={`
                  absolute -top-1 -right-2 inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-xs font-medium
                  ${activeTab === tab?.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-primary text-primary-foreground'
                  }
                `}>
                  {tab?.count > 9 ? '9+' : tab?.count}
                </span>
              )}
            </div>
            <span className={`text-xs font-medium ${activeTab === tab?.id ? 'text-primary-foreground' : 'text-current'}`}>
              {tab?.label}
            </span>
          </button>
        ))}
      </div>
      {/* AI Focus Suggestions */}
      {activeTab === 'all' && taskCounts?.urgent > 0 && (
        <div className="mt-3 p-2 bg-warning/5 border border-warning/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={14} className="text-warning" />
            <span className="text-xs text-warning font-medium">
              AI suggests focusing on {taskCounts?.urgent} urgent task{taskCounts?.urgent > 1 ? 's' : ''} first
            </span>
          </div>
        </div>
      )}
      {activeTab === 'today' && taskCounts?.overdue > 0 && (
        <div className="mt-3 p-2 bg-error/5 border border-error/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} className="text-error" />
            <span className="text-xs text-error font-medium">
              {taskCounts?.overdue} overdue task{taskCounts?.overdue > 1 ? 's' : ''} need immediate attention
            </span>
          </div>
        </div>
      )}
      {activeTab === 'completed' && taskCounts?.completed > 0 && (
        <div className="mt-3 p-2 bg-success/5 border border-success/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} className="text-success" />
            <span className="text-xs text-success font-medium">
              Great progress! You've completed {taskCounts?.completed} task{taskCounts?.completed > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTabs;