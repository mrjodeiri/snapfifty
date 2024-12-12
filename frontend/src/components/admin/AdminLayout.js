// src/components/admin/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { useAuth } from '../../hooks/useAuth';

const AdminLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 bg-gray-100 min-h-screen">
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <button 
            onClick={logout}
            className="text-gray-600 hover:text-gray-800"
          >
            Logout
          </button>
        </header>
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;