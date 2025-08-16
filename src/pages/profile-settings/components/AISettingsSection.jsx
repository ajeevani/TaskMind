import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AISettingsSection = () => {
  const [aiSettings, setAiSettings] = useState({
    assistantBehavior: 'balanced',
    suggestionFrequency: 'moderate',
    dataSharing: {
      improveRecommendations: true,
      anonymousUsage: true,
      taskPatterns: false,
      productivityInsights: true
    },
    productivityGoals: {
      dailyTasks: 8,
      weeklyGoals: 5,
      focusTime: 4
    },
    taskCategorization: {
      autoCategories: true,
      smartPriority: true,
      deadlinePredict: true,
      timeEstimation: false
    },
    workingStyle: 'focused'
  });

  const [hasChanges, setHasChanges] = useState(false);

  const behaviorOptions = [
    { value: 'minimal', label: 'Minimal', description: 'Basic suggestions only' },
    { value: 'balanced', label: 'Balanced', description: 'Moderate AI assistance' },
    { value: 'proactive', label: 'Proactive', description: 'Frequent helpful suggestions' },
    { value: 'aggressive', label: 'Aggressive', description: 'Maximum AI optimization' }
  ];

  const frequencyOptions = [
    { value: 'low', label: 'Low', description: 'Few suggestions per day' },
    { value: 'moderate', label: 'Moderate', description: 'Balanced suggestion rate' },
    { value: 'high', label: 'High', description: 'Frequent suggestions' },
    { value: 'realtime', label: 'Real-time', description: 'Instant suggestions' }
  ];

  const workingStyleOptions = [
    { value: 'focused', label: 'Deep Focus', description: 'Long uninterrupted work sessions' },
    { value: 'flexible', label: 'Flexible', description: 'Adaptable to changing priorities' },
    { value: 'collaborative', label: 'Collaborative', description: 'Team-oriented approach' },
    { value: 'multitasking', label: 'Multitasking', description: 'Handle multiple tasks simultaneously' }
  ];

  const handleSettingChange = (category, field, value) => {
    setAiSettings(prev => ({
      ...prev,
      [category]: typeof prev?.[category] === 'object' 
        ? { ...prev?.[category], [field]: value }
        : value
    }));
    setHasChanges(true);
  };

  const handleDataSharingChange = (field, value) => {
    setAiSettings(prev => ({
      ...prev,
      dataSharing: {
        ...prev?.dataSharing,
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleCategorizationChange = (field, value) => {
    setAiSettings(prev => ({
      ...prev,
      taskCategorization: {
        ...prev?.taskCategorization,
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleGoalChange = (field, value) => {
    setAiSettings(prev => ({
      ...prev,
      productivityGoals: {
        ...prev?.productivityGoals,
        [field]: parseInt(value) || 0
      }
    }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    console.log('Saving AI settings:', aiSettings);
    setHasChanges(false);
  };

  const runAIOptimization = () => {
    console.log('Running AI optimization...');
    // Simulate AI optimization process
  };

  return (
    <div className="space-y-6">
      {/* AI Assistant Behavior */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">AI Assistant Behavior</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Assistant Style"
            options={behaviorOptions}
            value={aiSettings?.assistantBehavior}
            onChange={(value) => handleSettingChange('assistantBehavior', null, value)}
            description="How proactive should your AI assistant be?"
          />
          <Select
            label="Suggestion Frequency"
            options={frequencyOptions}
            value={aiSettings?.suggestionFrequency}
            onChange={(value) => handleSettingChange('suggestionFrequency', null, value)}
            description="How often should AI provide suggestions?"
          />
        </div>
        <div className="mt-4">
          <Select
            label="Working Style"
            options={workingStyleOptions}
            value={aiSettings?.workingStyle}
            onChange={(value) => handleSettingChange('workingStyle', null, value)}
            description="Your preferred work approach for AI optimization"
          />
        </div>
      </div>
      {/* Productivity Goals */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Productivity Goals</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Set targets for AI to help you achieve optimal productivity
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Daily Tasks Target
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={aiSettings?.productivityGoals?.dailyTasks}
              onChange={(e) => handleGoalChange('dailyTasks', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">Tasks per day</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Weekly Goals
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={aiSettings?.productivityGoals?.weeklyGoals}
              onChange={(e) => handleGoalChange('weeklyGoals', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">Major goals per week</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Focus Time (Hours)
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={aiSettings?.productivityGoals?.focusTime}
              onChange={(e) => handleGoalChange('focusTime', e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">Deep work hours daily</p>
          </div>
        </div>
      </div>
      {/* Task Categorization */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Smart Task Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Auto-categorization"
            description="Automatically categorize tasks based on content"
            checked={aiSettings?.taskCategorization?.autoCategories}
            onChange={(e) => handleCategorizationChange('autoCategories', e?.target?.checked)}
          />
          <Checkbox
            label="Smart Priority Detection"
            description="AI determines task priority automatically"
            checked={aiSettings?.taskCategorization?.smartPriority}
            onChange={(e) => handleCategorizationChange('smartPriority', e?.target?.checked)}
          />
          <Checkbox
            label="Deadline Prediction"
            description="Predict realistic deadlines for tasks"
            checked={aiSettings?.taskCategorization?.deadlinePredict}
            onChange={(e) => handleCategorizationChange('deadlinePredict', e?.target?.checked)}
          />
          <Checkbox
            label="Time Estimation"
            description="Estimate time required for task completion"
            checked={aiSettings?.taskCategorization?.timeEstimation}
            onChange={(e) => handleCategorizationChange('timeEstimation', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Data Sharing Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data & Privacy</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Control how your data is used to improve AI recommendations
        </p>
        <div className="space-y-4">
          <Checkbox
            label="Improve Recommendations"
            description="Use my task data to enhance AI suggestions"
            checked={aiSettings?.dataSharing?.improveRecommendations}
            onChange={(e) => handleDataSharingChange('improveRecommendations', e?.target?.checked)}
          />
          <Checkbox
            label="Anonymous Usage Analytics"
            description="Share anonymous usage patterns for product improvement"
            checked={aiSettings?.dataSharing?.anonymousUsage}
            onChange={(e) => handleDataSharingChange('anonymousUsage', e?.target?.checked)}
          />
          <Checkbox
            label="Task Pattern Analysis"
            description="Analyze task patterns for productivity insights"
            checked={aiSettings?.dataSharing?.taskPatterns}
            onChange={(e) => handleDataSharingChange('taskPatterns', e?.target?.checked)}
          />
          <Checkbox
            label="Productivity Insights"
            description="Generate personalized productivity reports"
            checked={aiSettings?.dataSharing?.productivityInsights}
            onChange={(e) => handleDataSharingChange('productivityInsights', e?.target?.checked)}
          />
        </div>
      </div>
      {/* AI Performance Insights */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 ambient-glow">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="TrendingUp" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">AI Performance This Week</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">87%</div>
            <div className="text-muted-foreground">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">23</div>
            <div className="text-muted-foreground">Suggestions</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">18</div>
            <div className="text-muted-foreground">Accepted</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-foreground">+15%</div>
            <div className="text-muted-foreground">Productivity</div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={handleSaveSettings}
          disabled={!hasChanges}
          iconName="Check"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Save AI Settings
        </Button>
        <Button
          variant="outline"
          onClick={runAIOptimization}
          iconName="Zap"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Optimize AI Performance
        </Button>
      </div>
    </div>
  );
};

export default AISettingsSection;