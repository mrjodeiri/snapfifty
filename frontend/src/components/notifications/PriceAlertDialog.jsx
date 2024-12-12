// src/components/notifications/PriceAlertDialog.jsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bell } from 'lucide-react';
import { subscribeToPriceAlerts } from '@/lib/notification';
import { useAuth } from '@/hooks/useAuth';

const PriceAlertDialog = ({ deal, isOpen, onClose }) => {
  const [targetPrice, setTargetPrice] = useState(deal.discountedPrice);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please sign in to set price alerts');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const success = await subscribeToPriceAlerts(deal.id, user.uid, targetPrice);
      if (success) {
        onClose();
      } else {
        setError('Failed to set price alert. Please try again.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Set Price Alert
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="targetPrice">Alert me when price drops to:</Label>
              <Input
                id="targetPrice"
                type="number"
                step="0.01"
                value={targetPrice}
                onChange={(e) => setTargetPrice(parseFloat(e.target.value))}
                min={0}
                max={deal.originalPrice}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Setting Alert...' : 'Set Alert'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PriceAlertDialog;

// src/components/notifications/NotificationBell.jsx
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
      // Update user's FCM token in Firestore
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

// src/components/notifications/NotificationList.jsx
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