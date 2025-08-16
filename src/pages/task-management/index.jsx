import React, { useState, useEffect } from 'react';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import AIAssistantPanel from '../../components/ui/AIAssistantPanel';
import TaskDetailModal from '../../components/ui/TaskDetailModal';

// Import page-specific components
import TaskCard from './components/TaskCard';
import TaskFilters from './components/TaskFilters';
import TaskTabs from './components/TaskTabs';
import QuickAddTask from './components/QuickAddTask';
import BulkActions from './components/BulkActions';

const TaskManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
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

  // Mock task data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete website redesign mockups",
      description: "Create high-fidelity mockups for the new company website including homepage, about page, and contact page. Focus on modern design principles and mobile responsiveness.",
      priority: "high",
      status: "in-progress",
      dueDate: "2025-08-17",
      tags: ["design", "website", "mockups"],
      assignee: "Sarah Johnson",
      estimatedTime: "4 hours",
      completed: false,
      project: "website-redesign",
      createdAt: "2025-08-14T10:00:00Z",
      aiSuggestion: "Consider breaking this into smaller tasks: wireframes, color scheme, and final mockups."
    },
    {
      id: 2,
      title: "Review quarterly performance metrics",
      description: "Analyze team performance data for Q3 and prepare summary report for management review.",
      priority: "urgent",
      status: "todo",
      dueDate: "2025-08-16",
      tags: ["analytics", "report", "quarterly"],
      assignee: "me",
      estimatedTime: "2 hours",
      completed: false,
      project: "team-training",
      createdAt: "2025-08-15T14:30:00Z",
      aiSuggestion: "This task is overdue. Consider prioritizing it immediately."
    },
    {
      id: 3,
      title: "Update client presentation slides",
      description: "Revise presentation materials for the upcoming client meeting, including latest project updates and timeline adjustments.",
      priority: "medium",
      status: "review",
      dueDate: "2025-08-18",
      tags: ["presentation", "client", "meeting"],
      assignee: "John Smith",
      estimatedTime: "1.5 hours",
      completed: false,
      project: "marketing-campaign",
      createdAt: "2025-08-13T09:15:00Z"
    },
    {
      id: 4,
      title: "Set up development environment for new project",
      description: "Configure local development setup, install dependencies, and create initial project structure for the mobile app development.",
      priority: "medium",
      status: "completed",
      dueDate: "2025-08-15",
      tags: ["development", "setup", "mobile"],
      assignee: "Mike Chen",
      estimatedTime: "3 hours",
      completed: true,
      project: "mobile-app",
      createdAt: "2025-08-12T16:45:00Z"
    },
    {
      id: 5,
      title: "Schedule team standup meetings",
      description: "Organize weekly standup meetings for the development team and send calendar invites to all team members.",
      priority: "low",
      status: "todo",
      dueDate: "2025-08-19",
      tags: ["meeting", "team", "standup"],
      assignee: "me",
      estimatedTime: "30 minutes",
      completed: false,
      project: "team-training",
      createdAt: "2025-08-14T11:20:00Z"
    },
    {
      id: 6,
      title: "Conduct user testing for mobile app prototype",
      description: "Organize and conduct user testing sessions with 5-8 participants to gather feedback on the mobile app prototype. Document findings and recommendations.",
      priority: "high",
      status: "todo",
      dueDate: "2025-08-20",
      tags: ["testing", "mobile", "user-research"],
      assignee: "Sarah Johnson",
      estimatedTime: "6 hours",
      completed: false,
      project: "mobile-app",
      createdAt: "2025-08-15T13:10:00Z",
      aiSuggestion: "Consider scheduling this after the development environment setup is complete."
    }
  ]);

  // Calculate task counts
  const taskCounts = {
    all: tasks?.length,
    today: tasks?.filter(task => {
      const today = new Date()?.toDateString();
      return task?.dueDate && new Date(task.dueDate)?.toDateString() === today;
    })?.length,
    upcoming: tasks?.filter(task => {
      const today = new Date();
      const taskDate = new Date(task.dueDate);
      return taskDate > today && task?.status !== 'completed';
    })?.length,
    completed: tasks?.filter(task => task?.completed || task?.status === 'completed')?.length,
    urgent: tasks?.filter(task => task?.priority === 'urgent' && !task?.completed)?.length,
    overdue: tasks?.filter(task => {
      const today = new Date();
      const taskDate = new Date(task.dueDate);
      return taskDate < today && task?.status !== 'completed';
    })?.length
  };

  // Filter and sort tasks
  const getFilteredTasks = () => {
    let filteredTasks = [...tasks];

    // Tab filtering
    switch (activeTab) {
      case 'today':
        const today = new Date()?.toDateString();
        filteredTasks = filteredTasks?.filter(task => 
          task?.dueDate && new Date(task.dueDate)?.toDateString() === today
        );
        break;
      case 'upcoming':
        const now = new Date();
        filteredTasks = filteredTasks?.filter(task => {
          const taskDate = new Date(task.dueDate);
          return taskDate > now && task?.status !== 'completed';
        });
        break;
      case 'completed':
        filteredTasks = filteredTasks?.filter(task => 
          task?.completed || task?.status === 'completed'
        );
        break;
    }

    // Apply filters
    if (filters?.search) {
      filteredTasks = filteredTasks?.filter(task =>
        task?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        task?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        task?.tags?.some(tag => tag?.toLowerCase()?.includes(filters?.search?.toLowerCase()))
      );
    }

    if (filters?.priority) {
      filteredTasks = filteredTasks?.filter(task => task?.priority === filters?.priority);
    }

    if (filters?.status) {
      filteredTasks = filteredTasks?.filter(task => task?.status === filters?.status);
    }

    if (filters?.project) {
      filteredTasks = filteredTasks?.filter(task => task?.project === filters?.project);
    }

    if (filters?.assignee) {
      filteredTasks = filteredTasks?.filter(task => task?.assignee === filters?.assignee);
    }

    if (filters?.showOverdue) {
      const today = new Date();
      filteredTasks = filteredTasks?.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate < today && task?.status !== 'completed';
      });
    }

    if (!filters?.showCompleted) {
      filteredTasks = filteredTasks?.filter(task => !task?.completed && task?.status !== 'completed');
    }

    // Sort tasks
    filteredTasks?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'updated':
          return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'ai-suggested':
          // AI-suggested ordering: urgent first, then by due date, then by priority
          if (a?.priority === 'urgent' && b?.priority !== 'urgent') return -1;
          if (b?.priority === 'urgent' && a?.priority !== 'urgent') return 1;
          if (a?.dueDate && b?.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate);
          }
          return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
        default: // dueDate
          if (!a?.dueDate && !b?.dueDate) return 0;
          if (!a?.dueDate) return 1;
          if (!b?.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
      }
    });

    return filteredTasks;
  };

  let filteredTasks = getFilteredTasks();

  // Load tasks
  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    loadTasks();
  }, []);

  // Task actions
  const handleAddTask = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (task) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev?.filter(t => t?.id !== task?.id));
      setSelectedTasks(prev => prev?.filter(id => id !== task?.id));
    }
  };

  const handleToggleComplete = (taskId, completed) => {
    setTasks(prev => prev?.map(task => 
      task?.id === taskId 
        ? { ...task, completed, status: completed ? 'completed' : 'todo' }
        : task
    ));
  };

  const handleDuplicateTask = (task) => {
    const duplicatedTask = {
      ...task,
      id: Date.now(),
      title: `${task?.title} (Copy)`,
      completed: false,
      status: 'todo',
      createdAt: new Date()?.toISOString()
    };
    setTasks(prev => [duplicatedTask, ...prev]);
  };

  const handleShareTask = (task) => {
    // Simulate sharing functionality
    console.log('Sharing task:', task?.title);
    alert(`Task "${task?.title}" has been shared!`);
  };

  const handleSaveTask = (updatedTask) => {
    setTasks(prev => prev?.map(task => 
      task?.id === updatedTask?.id ? updatedTask : task
    ));
  };

  const handleTaskSelection = (taskId, selected) => {
    if (selected) {
      setSelectedTasks(prev => [...prev, taskId]);
    } else {
      setSelectedTasks(prev => prev?.filter(id => id !== taskId));
    }
  };

  const handleSelectAllTasks = (selected) => {
    if (selected) {
      setSelectedTasks(filteredTasks?.map(task => task?.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleBulkAction = (action, taskIds) => {
    switch (action) {
      case 'mark-complete':
        setTasks(prev => prev?.map(task => 
          taskIds?.includes(task?.id) 
            ? { ...task, completed: true, status: 'completed' }
            : task
        ));
        break;
      case 'mark-incomplete':
        setTasks(prev => prev?.map(task => 
          taskIds?.includes(task?.id) 
            ? { ...task, completed: false, status: 'todo' }
            : task
        ));
        break;
      case 'set-priority-high':
        setTasks(prev => prev?.map(task => 
          taskIds?.includes(task?.id) 
            ? { ...task, priority: 'high' }
            : task
        ));
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${taskIds?.length} task(s)?`)) {
          setTasks(prev => prev?.filter(task => !taskIds?.includes(task?.id)));
        }
        break;
      default:
        console.log('Bulk action:', action, taskIds);
    }
    setSelectedTasks([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Global Header */}
      <GlobalHeader 
        onAIToggle={() => setIsAIOpen(!isAIOpen)}
        isAIOpen={isAIOpen}
      />
      {/* Primary Navigation */}
      <PrimaryNavigation />
      {/* Main Content */}
      <main className="pt-32 md:pt-28 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Task Management</h1>
                <p className="text-muted-foreground">
                  Organize and track your tasks with AI-powered assistance
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="md:hidden"
                >
                  <Icon name="Filter" size={16} className="mr-1" />
                  Filters
                </Button>
                
                <Button
                  onClick={() => {
                    setSelectedTask(null);
                    setIsTaskModalOpen(true);
                  }}
                  className="micro-feedback"
                >
                  <Icon name="Plus" size={16} className="mr-1" />
                  <span className="hidden sm:inline">New Task</span>
                </Button>
              </div>
            </div>

            {/* Task Tabs */}
            <TaskTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              taskCounts={taskCounts}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <TaskFilters
                filters={filters}
                onFiltersChange={setFilters}
                isOpen={isFiltersOpen}
                onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
                className="sticky top-32"
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Quick Add Task */}
              <QuickAddTask onAddTask={handleAddTask} />

              {/* Bulk Actions */}
              <BulkActions
                selectedTasks={selectedTasks}
                onBulkAction={handleBulkAction}
                onClearSelection={() => setSelectedTasks([])}
              />

              {/* Task List */}
              <div className="space-y-4">
                {/* List Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedTasks?.length === filteredTasks?.length && filteredTasks?.length > 0}
                        onChange={(e) => handleSelectAllTasks(e?.target?.checked)}
                        className="rounded border-border focus:ring-primary"
                      />
                      <span className="text-sm text-muted-foreground">
                        {filteredTasks?.length} task{filteredTasks?.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Icon name="ArrowUpDown" size={14} className="mr-1" />
                      Sort
                    </Button>
                  </div>
                </div>

                {/* Loading State */}
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3]?.map((i) => (
                      <div key={i} className="bg-card border border-border rounded-lg p-4 animate-pulse">
                        <div className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-muted rounded"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-muted rounded w-3/4"></div>
                            <div className="h-3 bg-muted rounded w-1/2"></div>
                            <div className="flex space-x-2">
                              <div className="h-6 bg-muted rounded w-16"></div>
                              <div className="h-6 bg-muted rounded w-20"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : filteredTasks?.length === 0 ? (
                  /* Empty State */
                  (<div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckSquare" size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">No tasks found</h3>
                    <p className="text-muted-foreground mb-4">
                      {filters?.search || filters?.priority || filters?.status
                        ? "Try adjusting your filters to see more tasks." :"Create your first task to get started with task management."
                      }
                    </p>
                    <Button
                      onClick={() => {
                        setSelectedTask(null);
                        setIsTaskModalOpen(true);
                      }}
                    >
                      <Icon name="Plus" size={16} className="mr-1" />
                      Create Task
                    </Button>
                  </div>)
                ) : (
                  /* Task Cards */
                  (<div className="space-y-3">
                    {filteredTasks?.map((task) => (
                      <div key={task?.id} className="flex items-start space-x-3">
                        <div className="pt-4">
                          <input
                            type="checkbox"
                            checked={selectedTasks?.includes(task?.id)}
                            onChange={(e) => handleTaskSelection(task?.id, e?.target?.checked)}
                            className="rounded border-border focus:ring-primary"
                          />
                        </div>
                        <div className="flex-1">
                          <TaskCard
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                            onToggleComplete={handleToggleComplete}
                            onDuplicate={handleDuplicateTask}
                            onShare={handleShareTask}
                            className="cursor-pointer hover:shadow-elevated"
                            onClick={() => {
                              // Navigate to task detail page
                              window.location.href = `/task-detail?id=${task?.id}`;
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>)
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* AI Assistant Panel */}
      <AIAssistantPanel
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />
      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onSave={handleSaveTask}
      />
    </div>
  );
};

export default TaskManagement;