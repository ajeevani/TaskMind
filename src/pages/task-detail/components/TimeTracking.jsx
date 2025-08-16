import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimeTracking = ({ task, onTaskUpdate }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentSession, setCurrentSession] = useState(0);
  const [totalTime, setTotalTime] = useState(task?.totalTime || 0);
  const [sessions, setSessions] = useState(task?.timeSessions || [
    { id: 1, duration: 3600, date: new Date('2025-08-14'), description: "Initial research and planning" },
    { id: 2, duration: 2700, date: new Date('2025-08-15'), description: "Wireframe creation" },
    { id: 3, duration: 1800, date: new Date('2025-08-16'), description: "Development setup" }
  ]);

  useEffect(() => {
    let interval;
    if (isTracking) {
      interval = setInterval(() => {
        setCurrentSession(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const handleStartStop = () => {
    if (isTracking) {
      // Stop tracking and save session
      if (currentSession > 0) {
        const newSession = {
          id: Date.now(),
          duration: currentSession,
          date: new Date(),
          description: "Work session"
        };
        const updatedSessions = [...sessions, newSession];
        const updatedTotalTime = totalTime + currentSession;
        
        setSessions(updatedSessions);
        setTotalTime(updatedTotalTime);
        onTaskUpdate({ 
          ...task, 
          timeSessions: updatedSessions, 
          totalTime: updatedTotalTime 
        });
      }
      setCurrentSession(0);
    }
    setIsTracking(!isTracking);
  };

  const totalSessionTime = sessions?.reduce((sum, session) => sum + session?.duration, 0);
  const todaysSessions = sessions?.filter(session => 
    session?.date?.toDateString() === new Date()?.toDateString()
  );
  const todaysTime = todaysSessions?.reduce((sum, session) => sum + session?.duration, 0);

  const aiInsights = [
    "Your most productive hours are between 9-11 AM based on session data",
    "Average session length: 45 minutes - consider taking breaks",
    "You\'re 23% more efficient on this type of task compared to similar ones"
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Clock" size={20} />
          <span>Time Tracking</span>
        </h3>
      </div>
      {/* Current Session Timer */}
      <div className="text-center mb-6 p-6 bg-muted/30 rounded-lg">
        <div className="text-3xl font-mono font-bold text-foreground mb-2">
          {formatTime(currentSession)}
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {isTracking ? 'Current session' : 'Ready to start'}
        </p>
        <Button
          variant={isTracking ? "destructive" : "default"}
          size="lg"
          onClick={handleStartStop}
          className="micro-feedback"
        >
          <Icon 
            name={isTracking ? "Square" : "Play"} 
            size={20} 
            className="mr-2" 
          />
          {isTracking ? 'Stop Tracking' : 'Start Tracking'}
        </Button>
      </div>
      {/* Time Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {formatDuration(totalSessionTime + currentSession)}
          </div>
          <p className="text-sm text-blue-600 font-medium">Total Time</p>
        </div>
        <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {formatDuration(todaysTime + currentSession)}
          </div>
          <p className="text-sm text-green-600 font-medium">Today</p>
        </div>
        <div className="text-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {sessions?.length}
          </div>
          <p className="text-sm text-purple-600 font-medium">Sessions</p>
        </div>
      </div>
      {/* AI Productivity Insights */}
      <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg ambient-glow">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="TrendingUp" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Productivity Insights</span>
        </div>
        <div className="space-y-2">
          {aiInsights?.map((insight, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={14} className="text-primary mt-0.5 shrink-0" />
              <span className="text-sm text-foreground">{insight}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Sessions */}
      <div>
        <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="History" size={16} />
          <span>Recent Sessions</span>
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {sessions?.slice(-5)?.reverse()?.map((session, index) => (
            <div 
              key={session?.id} 
              className="flex items-center justify-between p-3 bg-background border border-border rounded-lg animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {session?.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {session?.date?.toLocaleDateString()} at {session?.date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="text-sm font-medium text-foreground">
                {formatDuration(session?.duration)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;