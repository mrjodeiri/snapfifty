// Update Navigation.js
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, BarChart2, Settings, Users, Activity } from 'lucide-react';

const Navigation = () => {
 const location = useLocation();

 const navItems = [
   { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard /> },
   { path: '/admin/blogs', label: 'Blogs', icon: <FileText /> },
   { path: '/admin/analytics', label: 'Analytics', icon: <BarChart2 /> },
   { path: '/admin/users', label: 'Users', icon: <Users /> },
   { path: '/admin/activity', label: 'Activity Logs', icon: <Activity /> },
   { path: '/admin/settings', label: 'Settings', icon: <Settings /> }
 ];

 return (
   <nav className="bg-gray-800 text-white w-64 min-h-screen px-4 py-6">
     <div className="mb-8">
       <Link to="/" className="text-xl font-bold">SnapFifty Admin</Link>
     </div>
     <div className="space-y-2">
       {navItems.map(item => (
         <Link
           key={item.path}
           to={item.path}
           className={`flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700 ${
             location.pathname === item.path ? 'bg-gray-700' : ''
           }`}
         >
           <span>{item.icon}</span>
           <span>{item.label}</span>
         </Link>
       ))}
     </div>
   </nav>
 );
};

export default Navigation;