import { Routes, Route } from "react-router";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ListPage from "../pages/ListPage";
import TaskDetailsPage from "../pages/TaskDetailsPage";
import SettingsPage from "../pages/SettingsPage";
import NotFoundPage from "../pages/NotFoundPage";
// import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/lists/:listId" element={
        // <ProtectedRoute>
        <ListPage />
        // </ProtectedRoute>
      }
      />
      <Route
        path="/tasks/:taskId"
        element={
          // <ProtectedRoute>
          <TaskDetailsPage />
          // </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          // <ProtectedRoute>
          <SettingsPage />
          // </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}