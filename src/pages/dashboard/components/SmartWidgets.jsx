import React from 'react';
import Icon from '../../../components/AppIcon';

const SmartWidgets = ({ upcomingDeadlines, recentActivity, productivityInsights }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days`;
    return date?.toLocaleDateString();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'completed': return 'CheckCircle';
      case 'created': return 'Plus';
      case 'updated': return 'Edit';
      case 'deleted': return 'Trash2';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'completed': return 'text-success';
      case 'created': return 'text-primary';
      case 'updated': return 'text-warning';
      case 'deleted': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Upcoming Deadlines */}
      <div className="bg-card rounded-lg border border-border shadow-soft">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={18} className="text-warning" />
            <h3 className="font-semibold text-foreground">Upcoming Deadlines</h3>
          </div>
        </div>
        <div className="p-4">
          {upcomingDeadlines?.length > 0 ? (
            <div className="space-y-3">
              {upcomingDeadlines?.slice(0, 4)?.map((deadline) => (
                <div key={deadline?.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {deadline?.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {deadline?.project}
                    </p>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-xs font-medium text-warning">
                      {formatDate(deadline?.dueDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <Icon name="Calendar" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No upcoming deadlines</p>
            </div>
          )}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card rounded-lg border border-border shadow-soft">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={18} className="text-primary" />
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
          </div>
        </div>
        <div className="p-4">
          {recentActivity?.length > 0 ? (
            <div className="space-y-3">
              {recentActivity?.slice(0, 4)?.map((activity) => (
                <div key={activity?.id} className="flex items-start space-x-3">
                  <Icon 
                    name={getActivityIcon(activity?.type)} 
                    size={14} 
                    className={`mt-0.5 ${getActivityColor(activity?.type)}`} 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity?.description}</p>
                    <p className="text-xs text-muted-foreground">{activity?.time}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <Icon name="Activity" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No recent activity</p>
            </div>
          )}
        </div>
      </div>
      {/* AI Productivity Insights */}
      <div className="bg-card rounded-lg border border-border shadow-soft ambient-glow">
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Brain" size={18} className="text-primary" />
            <h3 className="font-semibold text-foreground">AI Insights</h3>
          </div>
        </div>
        <div className="p-4">
          {productivityInsights?.length > 0 ? (
            <div className="space-y-4">
              {productivityInsights?.slice(0, 3)?.map((insight, index) => (
                <div key={index} className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                  <div className="flex items-start space-x-2">
                    <Icon name="Lightbulb" size={14} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-primary mb-1">
                        {insight?.title}
                      </h4>
                      <p className="text-xs text-foreground">{insight?.description}</p>
                      {insight?.action && (
                        <button className="text-xs text-primary font-medium mt-1 hover:underline">
                          {insight?.action}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <Icon name="Brain" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Analyzing your patterns...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartWidgets;