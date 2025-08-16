import React from 'react';
import Icon from '../../../components/AppIcon';

const ProductivitySummaryCard = ({ summary }) => {
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card rounded-lg p-6 border border-border shadow-soft ambient-glow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Today's Progress</h2>
          <p className="text-sm text-muted-foreground">AI-powered insights</p>
        </div>
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="TrendingUp" size={20} className="text-primary" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className={`text-2xl font-bold ${getProgressColor(summary?.completionRate)}`}>
            {summary?.completionRate}%
          </div>
          <div className="text-xs text-muted-foreground">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{summary?.totalTasks}</div>
          <div className="text-xs text-muted-foreground">Total Tasks</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{summary?.focusTime}</div>
          <div className="text-xs text-muted-foreground">Focus Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{summary?.streak}</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Daily Goal Progress</span>
          <span className="text-sm font-medium text-foreground">{summary?.completedTasks}/{summary?.dailyGoal}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressBgColor(summary?.completionRate)}`}
            style={{ width: `${Math.min(summary?.completionRate, 100)}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-primary mb-1">AI Recommendation</h4>
            <p className="text-sm text-foreground">{summary?.aiRecommendation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivitySummaryCard;