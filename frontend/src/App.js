// Update App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './components/HomePage';
import BlogDetail from './components/BlogDetail';
import Login from './components/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import BlogManager from './components/admin/BlogManager';
import BlogEditor from './components/admin/BlogEditor';
import AnalyticsDashboard from './components/admin/AnalyticsDashboard';
import Settings from './components/admin/Settings';
import UserManagement from './components/admin/UserManagement';
import ActivityLogs from './components/admin/ActivityLogs';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
 return (
   <AuthProvider>
     <Router>
       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/blog/:id" element={<BlogDetail />} />
         <Route path="/login" element={<Login />} />
         <Route path="/admin" element={
           <ProtectedRoute>
             <AdminLayout />
           </ProtectedRoute>
         }>
           <Route index element={<Dashboard />} />
           <Route path="blogs" element={<BlogManager />} />
           <Route path="blogs/new" element={<BlogEditor />} />
           <Route path="analytics" element={<AnalyticsDashboard />} />
           <Route path="settings" element={<Settings />} />
           <Route path="users" element={<UserManagement />} />
           <Route path="activity" element={<ActivityLogs />} />
         </Route>
       </Routes>
     </Router>
   </AuthProvider>
 );
}

export default App;