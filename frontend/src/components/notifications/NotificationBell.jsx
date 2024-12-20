import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { requestNotificationPermission } from '@/lib/notification';
import { useAuth } from '@/hooks/useAuth';

const NotificationBell = () => {
  const { user } = useAuth();

  const handleEnableNotifications = async () => {
    if (!user) return;

    const token = await requestNotificationPermission();
    if (token) {
      await updateUserToken(user.uid, token);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleEnableNotifications}
      className="relative"
    >
      <Bell className="h-5 w-5" />
    </Button>
  );
};

export default NotificationBell;