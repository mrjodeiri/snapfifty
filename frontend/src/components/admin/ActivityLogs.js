// Update ActivityLogs.js
import React, { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { formatDistanceToNow } from 'date-fns';
import { Filter, Download } from 'lucide-react';

const ActivityLogs = () => {
 const { docs: logs } = useFirestore('activity_logs');
 const [filters, setFilters] = useState({
   action: '',
   dateRange: '7days',
   userId: ''
 });

 const filteredLogs = logs.filter(log => {
   const date = log.timestamp.toDate();
   const now = new Date();
   const diffDays = (now - date) / (1000 * 60 * 60 * 24);

   return (
     (!filters.action || log.action.includes(filters.action)) &&
     (!filters.userId || log.userId === filters.userId) &&
     (filters.dateRange === 'all' || 
      (filters.dateRange === '7days' && diffDays <= 7) ||
      (filters.dateRange === '30days' && diffDays <= 30))
   );
 });

 const exportLogs = () => {
   const csv = [
     ['Timestamp', 'Action', 'Details', 'User ID'].join(','),
     ...filteredLogs.map(log => [
       log.timestamp.toDate().toISOString(),
       log.action,
       log.details,
       log.userId
     ].join(','))
   ].join('\n');

   const blob = new Blob([csv], { type: 'text/csv' });
   const url = window.URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.setAttribute('hidden', '');
   a.setAttribute('href', url);
   a.setAttribute('download', 'activity_logs.csv');
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
 };

 return (
   <div className="max-w-6xl mx-auto p-6">
     <div className="bg-white rounded-lg shadow p-6">
       <div className="flex justify-between items-center mb-6">
         <h2 className="text-xl font-bold">Activity Logs</h2>
         <div className="flex gap-4">
           <button
             onClick={exportLogs}
             className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
           >
             <Download size={16} className="mr-2" />
             Export
           </button>
         </div>
       </div>

       <div className="flex gap-4 mb-6">
         <select
           value={filters.action}
           onChange={(e) => setFilters({...filters, action: e.target.value})}
           className="border rounded px-3 py-2"
         >
           <option value="">All Actions</option>
           <option value="CREATE">Create</option>
           <option value="UPDATE">Update</option>
           <option value="DELETE">Delete</option>
         </select>

         <select
           value={filters.dateRange}
           onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
           className="border rounded px-3 py-2"
         >
           <option value="7days">Last 7 Days</option>
           <option value="30days">Last 30 Days</option>
           <option value="all">All Time</option>
         </select>
       </div>

       <div className="space-y-4">
         {filteredLogs.map(log => (
           <div key={log.id} className="flex items-center justify-between border-b pb-4">
             <div>
               <span className="font-medium">{log.action}</span>
               <p className="text-sm text-gray-500">{log.details}</p>
               {log.userId && (
                 <span className="text-xs text-gray-400">User: {log.userId}</span>
               )}
             </div>
             <div className="text-sm text-gray-500">
               {formatDistanceToNow(log.timestamp.toDate(), { addSuffix: true })}
             </div>
           </div>
         ))}
       </div>
     </div>
   </div>
 );
};

export default ActivityLogs;