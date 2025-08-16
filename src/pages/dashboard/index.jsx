import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import AIAssistantPanel from '../../components/ui/AIAssistantPanel';
import ProductivitySummaryCard from './components/ProductivitySummaryCard';
import PriorityTaskQueue from './components/PriorityTaskQueue';
import SmartWidgets from './components/SmartWidgets';
import QuickFilters from './components/QuickFilters';
import FloatingActionButton from './components/FloatingActionButton';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for productivity summary
  const productivitySummary = {
    completionRate: 78,
    totalTasks: 24,
    completedTasks: 18,
    dailyGoal: 20,
    focusTime: "4.2h",
    streak: 12,
    aiRecommendation: "You're most productive between 9-11 AM. Consider scheduling your high-priority tasks during this time window for optimal results."
  };

  // Mock data for priority tasks
  const [priorityTasks] = useState([
    {
      id: 1,
      title: "Complete quarterly report presentation",
      description: "Finalize slides and prepare talking points for the Q3 review meeting with stakeholders.",
      priority: "urgent",
      dueTime: "14:00",
      estimatedTime: "2 hours",
      category: "Work"
    },
    {
      id: 2,
      title: "Review and approve marketing campaign",
      description: "Review the new product launch campaign materials and provide feedback to the marketing team.",
      priority: "high",
      dueTime: "16:30",
      estimatedTime: "45 minutes",
      category: "Review"
    },
    {
      id: 3,
      title: "Schedule team one-on-ones",
      description: "Set up individual meetings with team members for next week's performance discussions.",
      priority: "medium",
      dueTime: "18:00",
      estimatedTime: "30 minutes",
      category: "Management"
    },
    {
      id: 4,
      title: "Update project documentation",
      description: "Add recent changes to the project wiki and update the technical specifications document.",
      priority: "low",
      estimatedTime: "1 hour",
      category: "Documentation"
    }
  ]);

  // Mock data for upcoming deadlines
  const upcomingDeadlines = [
    {
      id: 1,
      title: "Product Launch Presentation",
      project: "Marketing Campaign",
      dueDate: "2025-08-17"
    },
    {
      id: 2,
      title: "Budget Review Meeting",
      project: "Finance",
      dueDate: "2025-08-19"
    },
    {
      id: 3,
      title: "Client Proposal Submission",
      project: "Sales",
      dueDate: "2025-08-21"
    },
    {
      id: 4,
      title: "Team Performance Reviews",
      project: "HR",
      dueDate: "2025-08-23"
    }
  ];

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: "completed",
      description: "Completed \'Design system updates'",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "created",
      description: "Created new task \'Client meeting prep'",
      time: "3 hours ago"
    },
    {
      id: 3,
      type: "updated",
      description: "Updated priority for \'Quarterly report'",
      time: "4 hours ago"
    },
    {
      id: 4,
      type: "completed",
      description: "Completed \'Email responses'",
      time: "5 hours ago"
    }
  ];

  // Mock data for AI productivity insights
  const productivityInsights = [
    {
      title: "Peak Performance Window",
      description: "Your productivity peaks between 9-11 AM. Schedule important tasks during this time.",
      action: "Optimize Schedule"
    },
    {
      title: "Task Completion Pattern",
      description: "You complete 23% more tasks when you break them into smaller subtasks.",
      action: "Break Down Tasks"
    },
    {
      title: "Focus Time Opportunity",
      description: "Consider blocking 2-hour focus sessions for deep work. Your completion rate increases by 34%.",
      action: "Block Focus Time"
    }
  ];

  // Task counts for filters
  const taskCounts = {
    all: 24,
    personal: 16,
    team: 8,
    aiSuggested: 5
  };

  const handleAIToggle = () => {
    setIsAIOpen(!isAIOpen);
  };

  const handleTaskComplete = (taskId) => {
    console.log('Completing task:', taskId);
    // In a real app, this would update the task status
  };

  const handleTaskReschedule = (taskId) => {
    console.log('Rescheduling task:', taskId);
    // In a real app, this would open a reschedule modal
  };

  const handleTaskClick = (task) => {
    navigate('/task-detail', { state: { task } });
  };

  const handleCreateTask = () => {
    navigate('/task-management', { state: { action: 'create' } });
  };

  const handleAIAssist = () => {
    setIsAIOpen(true);
  };

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    console.log('Filter changed to:', filterId);
  };

  // Pull to refresh functionality
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Get current time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader onAIToggle={handleAIToggle} isAIOpen={isAIOpen} />
      {/* Primary Navigation */}
      <PrimaryNavigation />
      {/* Main Content */}
      <main className="pt-32 md:pt-28 pb-20 md:pb-8 px-4 lg:px-6">
        <div className={`max-w-7xl mx-auto transition-all duration-300 ${isAIOpen ? 'md:mr-80' : ''}`}>
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              {getTimeBasedGreeting()}! 👋
            </h1>
            <p className="text-muted-foreground">
              {isRefreshing ? 'Refreshing your data...' : "Here's your productivity overview for today"}
            </p>
          </div>

          {/* Pull to Refresh Indicator */}
          {isRefreshing && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-6">
            {/* Left Column - Filters & Widgets */}
            <div className="lg:col-span-3 space-y-6">
              <QuickFilters 
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                taskCounts={taskCounts}
              />
              <SmartWidgets 
                upcomingDeadlines={upcomingDeadlines}
                recentActivity={recentActivity}
                productivityInsights={productivityInsights}
              />
            </div>

            {/* Center Column - Main Content */}
            <div className="lg:col-span-9 space-y-6">
              <ProductivitySummaryCard summary={productivitySummary} />
              <PriorityTaskQueue 
                tasks={priorityTasks}
                onTaskComplete={handleTaskComplete}
                onTaskReschedule={handleTaskReschedule}
                onTaskClick={handleTaskClick}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            <ProductivitySummaryCard summary={productivitySummary} />
            
            <QuickFilters 
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              taskCounts={taskCounts}
            />
            
            <PriorityTaskQueue 
              tasks={priorityTasks}
              onTaskComplete={handleTaskComplete}
              onTaskReschedule={handleTaskReschedule}
              onTaskClick={handleTaskClick}
            />
            
            <SmartWidgets 
              upcomingDeadlines={upcomingDeadlines}
              recentActivity={recentActivity}
              productivityInsights={productivityInsights}
            />
          </div>
        </div>
      </main>
      {/* Floating Action Button */}
      <FloatingActionButton 
        onCreateTask={handleCreateTask}
        onAIAssist={handleAIAssist}
      />
      {/* AI Assistant Panel */}
      <AIAssistantPanel 
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />
      {/* Pull to Refresh for Mobile */}
      <div 
        className="md:hidden fixed top-16 left-0 right-0 h-2 bg-transparent z-10"
        onTouchStart={(e) => {
          const startY = e?.touches?.[0]?.clientY;
          const handleTouchMove = (e) => {
            const currentY = e?.touches?.[0]?.clientY;
            if (currentY - startY > 100 && window.scrollY === 0) {
              handleRefresh();
              document.removeEventListener('touchmove', handleTouchMove);
            }
          };
          document.addEventListener('touchmove', handleTouchMove);
          document.addEventListener('touchend', () => {
            document.removeEventListener('touchmove', handleTouchMove);
          }, { once: true });
        }}
      />
    </div>
  );
};

export default Dashboard;