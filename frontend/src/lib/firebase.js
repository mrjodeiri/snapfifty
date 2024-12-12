// src/lib/firebase.js (updated)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

// src/lib/notification.js
import { db, messaging } from './firebase';
import { collection, addDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { getToken } from 'firebase/messaging';

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      });
      return token;
    }
    return null;
  } catch (error) {
    console.error('Notification permission error:', error);
    return null;
  }
};

export const setupNotificationHandlers = () => {
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: '/logo.png'
    });
  });
};

export const subscribeToPriceAlerts = async (dealId, userId, targetPrice) => {
  try {
    await addDoc(collection(db, 'price_alerts'), {
      dealId,
      userId,
      targetPrice,
      createdAt: new Date(),
      isActive: true
    });
    return true;
  } catch (error) {
    console.error('Error subscribing to price alerts:', error);
    return false;
  }
};

export const unsubscribeFromPriceAlerts = async (dealId, userId) => {
  try {
    const alertsRef = collection(db, 'price_alerts');
    const alertsQuery = query(
      alertsRef,
      where('dealId', '==', dealId),
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(alertsQuery);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    
    return true;
  } catch (error) {
    console.error('Error unsubscribing from price alerts:', error);
    return false;
  }
};

// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: self.FIREBASE_API_KEY,
  authDomain: self.FIREBASE_AUTH_DOMAIN,
  projectId: self.FIREBASE_PROJECT_ID,
  storageBucket: self.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: self.FIREBASE_MESSAGING_SENDER_ID,
  appId: self.FIREBASE_APP_ID
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});