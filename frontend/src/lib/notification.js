import { db } from './firebase';
import { doc, setDoc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getMessaging, getToken } from 'firebase/messaging';

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const messaging = getMessaging();
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

export const subscribeToPriceAlerts = async (dealId, userId, targetPrice) => {
  try {
    await addDoc(collection(db, 'price_alerts'), {
      dealId,
      userId,
      targetPrice,
      createdAt: serverTimestamp(),
      isActive: true
    });
    return true;
  } catch (error) {
    console.error('Error subscribing to price alerts:', error);
    return false;
  }
};

export const updateUserToken = async (userId, token) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      fcmToken: token,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating user token:', error);
    return false;
  }
};

export const createNotification = async (userId, notification) => {
  try {
    await addDoc(collection(db, 'notifications'), {
      userId,
      ...notification,
      read: false,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error creating notification:', error);
    return false;
  }
};