import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import AIAssistantPanel from '../../components/ui/AIAssistantPanel';
import TaskHeader from './components/TaskHeader';
import TaskDescription from './components/TaskDescription';
import AIInsightsPanel from './components/AIInsightsPanel';
import TaskProperties from './components/TaskProperties';
import SubtasksList from './components/SubtasksList';
import TimeTracking from './components/TimeTracking';
import CommentsSection from './components/CommentsSection';
import AttachmentsSection from './components/AttachmentsSection';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const TaskDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock task data - in real app this would come from URL params or API
  const [task, setTask] = useState({
    id: 'task-001',
    title: 'Design and implement user dashboard interface',
    description: `Create a comprehensive user dashboard that provides an overview of key metrics, recent activities, and quick access to important features.\n\nThe dashboard should include:\n- Key performance indicators (KPIs)\n- Recent activity feed\n- Quick action buttons\n- Responsive design for mobile and desktop\n- Dark/light theme support\n\nThis is a high-priority task that requires collaboration with the design team and careful attention to user experience principles.`,
    priority: 'high',
    status: 'in-progress',
    dueDate: '2025-08-20',
    assignee: 'me',
    estimatedTime: '8 hours',
    totalTime: 7200, // 2 hours in seconds
    tags: ['ui/ux', 'frontend', 'dashboard'],
    createdAt: new Date('2025-08-14'),
    updatedAt: new Date('2025-08-16'),
    subtasks: [
      { id: 1, title: "Research competitor analysis", completed: true, createdAt: new Date('2025-08-14') },
      { id: 2, title: "Create wireframes for main pages", completed: false, createdAt: new Date('2025-08-15') },
      { id: 3, title: "Set up development environment", completed: false, createdAt: new Date('2025-08-16') }
    ],
    timeSessions: [
      { id: 1, duration: 3600, date: new Date('2025-08-14'), description: "Initial research and planning" },
      { id: 2, duration: 2700, date: new Date('2025-08-15'), description: "Wireframe creation" },
      { id: 3, duration: 1800, date: new Date('2025-08-16'), description: "Development setup" }
    ],
    comments: [
      {
        id: 1,
        author: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        content: "I\'ve reviewed the initial wireframes and they look great! Just a few minor adjustments needed on the navigation structure.",
        timestamp: new Date('2025-08-15T10:30:00'),
        isEdited: false
      },
      {
        id: 2,
        author: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        content: "The development environment is set up and ready. I\'ve also added the necessary dependencies for the project.",
        timestamp: new Date('2025-08-15T14:15:00'),
        isEdited: false
      },
      {
        id: 3,
        author: "You",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        content: "Thanks for the feedback! I\'ll incorporate the navigation changes and push an update by tomorrow.",
        timestamp: new Date('2025-08-16T09:45:00'),
        isEdited: true
      }
    ],
    attachments: [
      {
        id: 1,
        name: "wireframes_v1.pdf",
        type: "pdf",
        size: "2.4 MB",
        uploadedBy: "Sarah Johnson",
        uploadedAt: new Date('2025-08-15T10:30:00'),
        url: "#"
      },
      {
        id: 2,
        name: "design_mockup.png",
        type: "image",
        size: "1.8 MB",
        uploadedBy: "Mike Chen",
        uploadedAt: new Date('2025-08-15T14:15:00'),
        url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400"
      },
      {
        id: 3,
        name: "project_requirements.docx",
        type: "document",
        size: "856 KB",
        uploadedBy: "You",
        uploadedAt: new Date('2025-08-16T09:45:00'),
        url: "#"
      }
    ]
  });

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      handleAutoSave();
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [task]);

  const handleAutoSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const handleTaskUpdate = async (updatedTask) => {
    setTask(updatedTask);
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const handleDeleteTask = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/task-management');
  };

  const handleDuplicateTask = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const duplicatedTask = {
      ...task,
      id: `task-${Date.now()}`,
      title: `${task?.title} (Copy)`,
      status: 'todo',
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
      timeSessions: []
    };
    
    setTask(duplicatedTask);
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const formatLastSaved = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Saved just now';
    if (diffInMinutes < 60) return `Saved ${diffInMinutes}m ago`;
    return `Saved at ${date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader onAIToggle={() => setIsAIOpen(!isAIOpen)} isAIOpen={isAIOpen} />
      {/* Primary Navigation */}
      <PrimaryNavigation />
      {/* Main Content */}
      <main className={`pt-32 md:pt-28 pb-20 md:pb-8 transition-all duration-300 ${isAIOpen ? 'md:pr-80' : ''}`}>
        {/* Task Header */}
        <TaskHeader 
          task={task} 
          onTaskUpdate={handleTaskUpdate}
          onDelete={handleDeleteTask}
        />

        {/* Content Area */}
        <div className="px-4 lg:px-6 py-6">
          {/* Auto-save Indicator */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {isSaving ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Icon name="Check" size={16} className="text-green-600" />
                  <span>{formatLastSaved(lastSaved)}</span>
                </>
              )}
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDuplicateTask}
                className="micro-feedback"
              >
                <Icon name="Copy" size={16} className="mr-2" />
                Duplicate
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="micro-feedback"
              >
                <Icon name="Share2" size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Desktop Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <TaskDescription task={task} onTaskUpdate={handleTaskUpdate} />
              <TaskProperties task={task} onTaskUpdate={handleTaskUpdate} />
              <SubtasksList task={task} onTaskUpdate={handleTaskUpdate} />
              <TimeTracking task={task} onTaskUpdate={handleTaskUpdate} />
              <AttachmentsSection task={task} onTaskUpdate={handleTaskUpdate} />
              <CommentsSection task={task} onTaskUpdate={handleTaskUpdate} />
            </div>

            {/* Right Column - AI Insights and Related */}
            <div className="space-y-6">
              <AIInsightsPanel task={task} />
              
              {/* Related Tasks */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="Link" size={20} />
                  <span>Related Tasks</span>
                </h3>
                <div className="space-y-3">
                  {[
                    { id: 1, title: "Create user authentication system", status: "completed" },
                    { id: 2, title: "Design mobile responsive layout", status: "in-progress" },
                    { id: 3, title: "Implement data visualization charts", status: "todo" }
                  ]?.map((relatedTask, index) => (
                    <div 
                      key={relatedTask?.id} 
                      className="flex items-center space-x-3 p-3 bg-background border border-border rounded-lg hover:bg-muted/30 transition-colors cursor-pointer animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        relatedTask?.status === 'completed' ? 'bg-green-500' :
                        relatedTask?.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-sm text-foreground flex-1">{relatedTask?.title}</span>
                      <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Analytics */}
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                  <Icon name="BarChart3" size={20} />
                  <span>Task Analytics</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-foreground">67%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">2.5h</div>
                      <div className="text-xs text-muted-foreground">Time Spent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-foreground">5.5h</div>
                      <div className="text-xs text-muted-foreground">Remaining</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* AI Assistant Panel */}
      <AIAssistantPanel isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface rounded-lg p-6 max-w-md w-full animate-slide-up">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Task</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-foreground mb-6">
              Are you sure you want to delete "{task?.title}"? All associated data including comments, attachments, and time tracking will be permanently removed.
            </p>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                loading={isSaving}
                className="flex-1"
              >
                Delete Task
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetailPage;