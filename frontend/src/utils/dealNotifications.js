// src/utils/dealNotifications.js
import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

export const DealNotifications = {
 async createNotification(type, data) {
   await addDoc(collection(db, 'notifications'), {
     type,
     data,
     createdAt: serverTimestamp(),
     status: 'PENDING',
     retries: 0
   });
 },

 notificationTypes: {
   DEAL_EXPIRING: {
     template: 'Deal "{title}" expires in {timeLeft}',
     priority: 'HIGH',
     channels: ['email', 'push']
   },
   PRICE_CHANGE: {
     template: 'Price changed for "{title}" from ${oldPrice} to ${newPrice}',
     priority: 'MEDIUM',
     channels: ['push']
   },
   PERFORMANCE_ALERT: {
     template: 'Deal "{title}" performance below threshold',
     priority: 'HIGH',
     channels: ['email']
   }
 },

 async processNotificationQueue() {
   const notificationsRef = collection(db, 'notifications');
   const q = query(
     notificationsRef,
     where('status', '==', 'PENDING'),
     where('retries', '<', 3)
   );

   const snapshot = await getDocs(q);
   
   for (const doc of snapshot.docs) {
     const notification = { id: doc.id, ...doc.data() };
     await this.sendNotification(notification);
   }
 },

 async sendNotification(notification) {
   try {
     const template = this.notificationTypes[notification.type].template;
     const message = this.formatMessage(template, notification.data);
     const channels = this.notificationTypes[notification.type].channels;

     for (const channel of channels) {
       await this.sendToChannel(channel, message, notification);
     }

     await this.markNotificationSent(notification.id);
   } catch (error) {
     await this.handleNotificationError(notification.id, error);
   }
 },

 formatMessage(template, data) {
   return template.replace(/{(\w+)}/g, (match, key) => data[key] || match);
 },

 async sendToChannel(channel, message, notification) {
   switch(channel) {
     case 'email':
       await this.sendEmail(message, notification);
       break;
     case 'push':
       await this.sendPushNotification(message, notification);
       break;
   }
 },

 async markNotificationSent(notificationId) {
   await updateDoc(doc(db, 'notifications', notificationId), {
     status: 'SENT',
     sentAt: serverTimestamp()
   });
 },

 async handleNotificationError(notificationId, error) {
   const notificationRef = doc(db, 'notifications', notificationId);
   await updateDoc(notificationRef, {
     retries: increment(1),
     lastError: error.message,
     lastAttempt: serverTimestamp()
   });
 },

 async subscribeToDealUpdates(userId, dealId) {
   await addDoc(collection(db, 'subscriptions'), {
     userId,
     dealId,
     createdAt: serverTimestamp(),
     notifications: {
       priceDrops: true,
       expiration: true,
       similarDeals: true
     }
   });
 },

 async getSubscribers(dealId) {
   const q = query(
     collection(db, 'subscriptions'),
     where('dealId', '==', dealId)
   );
   const snapshot = await getDocs(q);
   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
 },

 async sendEmail(message, notification) {
   // Email sending implementation
 },

 async sendPushNotification(message, notification) {
   // Push notification implementation
 }
};