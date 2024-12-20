import React from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const NotificationList = () => {
  const { notifications, markAsRead, clearNotification } = useNotifications();

  return (
    <ScrollArea className="h-[300px] w-[350px] rounded-md border p-4">
      {notifications.length === 0 ? (
        <div className="text-center text-sm text-gray-500">
          No notifications
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start justify-between space-x-4 rounded-lg p-3 ${
                notification.read ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-sm text-gray-500">{notification.message}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => clearNotification(notification.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default NotificationList;