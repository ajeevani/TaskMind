import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { generateTaskInsights } from '../../../services/openaiService';

const AIInsightsPanel = ({ task }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastTaskId, setLastTaskId] = useState(null);

  // Generate insights when task changes
  useEffect(() => {
    if (task && task?.id !== lastTaskId) {
      loadInsights();
      setLastTaskId(task?.id);
    }
  }, [task, lastTaskId]);

  const loadInsights = async () => {
    if (!task) return;
    
    setIsLoading(true);
    try {
      const generatedInsights = await generateTaskInsights(task);
      setInsights(generatedInsights);
    } catch (error) {
      console.error('Error loading AI insights:', error);
      // Fallback to default insight if API fails
      setInsights([
        {
          type: 'suggestion',
          icon: 'Lightbulb',
          title: 'AI Service Unavailable',
          content: 'Unable to generate AI insights at the moment. Please check your OpenAI API key configuration.',
          action: 'Retry'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'suggestion': return 'border-blue-200 bg-blue-50';
      case 'warning': return 'border-orange-200 bg-orange-50';
      case 'optimization': return 'border-green-200 bg-green-50';
      case 'reference': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'suggestion': return 'text-blue-600';
      case 'warning': return 'text-orange-600';
      case 'optimization': return 'text-green-600';
      case 'reference': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const handleRefreshInsights = () => {
    loadInsights();
  };

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden ambient-glow">
      <div 
        className="flex items-center justify-between p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Brain" size={16} color="white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">AI Insights</h3>
            <p className="text-xs text-muted-foreground">Smart recommendations for this task</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </div>
      {isExpanded && (
        <div className="p-4 space-y-4 progressive-reveal">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Generating AI insights...</span>
              </div>
            </div>
          ) : (
            insights?.map((insight, index) => (
              <div 
                key={index} 
                className={`border rounded-lg p-4 ${getInsightColor(insight?.type)} animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={insight?.icon} 
                    size={20} 
                    className={`mt-0.5 ${getIconColor(insight?.type)}`} 
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground mb-1">
                      {insight?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {insight?.content}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="anticipatory-hover"
                      onClick={() => {
                        if (insight?.action === 'Retry') {
                          handleRefreshInsights();
                        }
                      }}
                    >
                      {insight?.action}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}

          <div className="pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center micro-feedback"
              onClick={handleRefreshInsights}
              disabled={isLoading}
            >
              <Icon name="RefreshCw" size={16} className="mr-2" />
              {isLoading ? 'Generating...' : 'Refresh Insights'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsightsPanel;