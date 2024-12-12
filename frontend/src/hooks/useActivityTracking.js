// src/hooks/useActivityTracking.js
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useActivityTracking = () => {
  const logActivity = async (userId, action, details) => {
    await addDoc(collection(db, 'activity_logs'), {
      userId,
      action,
      details,
      timestamp: new Date(),
      ip: window.sessionStorage.getItem('userIp')  // Set this on login
    });
  };

  return { logActivity };
};

// src/components/admin/ActivityLogs.js
import React from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { formatDistanceToNow } from 'date-fns';

const ActivityLogs = () => {
  const { docs: logs } = useFirestore('activity_logs');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-6">Activity Logs</h2>
        <div className="space-y-4">
          {logs.map(log => (
            <div key={log.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="font-medium">{log.action}</span>
                <p className="text-sm text-gray-500">{log.details}</p>
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