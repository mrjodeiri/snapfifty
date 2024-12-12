// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import NotificationList from '@/components/notifications/NotificationList';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            SnapFifty
          </Link>

          <div className="flex items-center space-x-4">
            {user && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[380px] p-0" align="end">
                  <NotificationList />
                </PopoverContent>
              </Popover>
            )}
            {/* Other navbar items */}
          </div>
        </div>
      </div>
    </nav>
);
};

export default Navbar;

// src/components/layout/Layout.jsx
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;

// src/hooks/useNotifications.js
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/hooks/useAuth';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const notificationsRef = collection(db, 'notifications');
    const notificationsQuery = query(
      notificationsRef,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const newNotifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, [user]);

  const markAsRead = async (notificationId) => {
    try {
      await db.collection('notifications').doc(notificationId).update({
        read: true
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const clearNotification = async (notificationId) => {
    try {
      await db.collection('notifications').doc(notificationId).delete();
    } catch (error) {
      console.error('Error clearing notification:', error);
    }
  };

  return {
    notifications,
    markAsRead,
    clearNotification
  };
};

// src/pages/_app.js
import { Layout } from '@/components/layout/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;