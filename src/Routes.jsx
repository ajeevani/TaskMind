import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import TaskManagement from './pages/task-management';
import Dashboard from './pages/dashboard';
import TaskDetailPage from './pages/task-detail';
import ProfileSettings from './pages/profile-settings';
import AIAssistantChat from './pages/ai-assistant-chat';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIAssistantChat />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/task-management" element={<TaskManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task-detail" element={<TaskDetailPage />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/ai-assistant-chat" element={<AIAssistantChat />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
