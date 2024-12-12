// src/utils/userPreferences.js
import { db } from '../config/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, query, where, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';

export const UserPreferences = {
 async getUserPreferences(userId) {
   const userRef = doc(db, 'users', userId);
   const userDoc = await getDoc(userRef);
   
   if (!userDoc.exists()) {
     // Create default preferences if user doesn't have any
     await this.initializePreferences(userId);
     return await this.getDefaultPreferences();
   }
   
   return userDoc.data().preferences;
 },

 async initializePreferences(userId) {
   const userRef = doc(db, 'users', userId);
   const defaultPrefs = await this.getDefaultPreferences();
   
   await setDoc(userRef, {
     preferences: defaultPrefs,
     createdAt: serverTimestamp(),
     updatedAt: serverTimestamp()
   }, { merge: true });
 },

 async getDefaultPreferences() {
   return {
     categories: [],
     priceRange: {
       min: 0,
       max: Infinity
     },
     minDiscountPercentage: 50,
     notifications: {
       email: true,
       push: true,
       deals: true,
       priceDrops: true
     },
     dealAlerts: []
   };
 },

 async updatePreferences(userId, updates) {
   const userRef = doc(db, 'users', userId);
   await updateDoc(userRef, {
     'preferences': updates,
     'updatedAt': serverTimestamp()
   });
   
   // Log preference change
   await this.logPreferenceChange(userId, updates);
 },

 async logPreferenceChange(userId, changes) {
   await addDoc(collection(db, 'userActivity'), {
     userId,
     type: 'PREFERENCE_UPDATE',
     changes,
     timestamp: serverTimestamp()
   });
 },

 async trackUserActivity(userId, activity) {
   await addDoc(collection(db, 'userActivity'), {
     userId,
     ...activity,
     timestamp: serverTimestamp()
   });
 },

 async getUserHistory(userId, options = {}) {
   const {
     limit: resultLimit = 50,
     activityTypes = ['VIEW', 'CLICK', 'PURCHASE']
   } = options;

   const historyRef = collection(db, 'userActivity');
   const q = query(
     historyRef,
     where('userId', '==', userId),
     where('type', 'in', activityTypes),
     orderBy('timestamp', 'desc'),
     limit(resultLimit)
   );

   const snapshot = await getDocs(q);
   return snapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data()
   }));
 },

 async getUserStats(userId) {
   const history = await this.getUserHistory(userId, { limit: 1000 });
   
   return {
     totalViews: history.filter(h => h.type === 'VIEW').length,
     totalClicks: history.filter(h => h.type === 'CLICK').length,
     totalPurchases: history.filter(h => h.type === 'PURCHASE').length,
     categories: this.aggregateCategories(history),
     priceRanges: this.aggregatePriceRanges(history),
     activityByTime: this.aggregateActivityByTime(history)
   };
 },

 aggregateCategories(history) {
   return history.reduce((acc, activity) => {
     if (activity.category) {
       acc[activity.category] = (acc[activity.category] || 0) + 1;
     }
     return acc;
   }, {});
 },

 aggregatePriceRanges(history) {
   return history.reduce((acc, activity) => {
     if (activity.price) {
       const range = this.getPriceRange(activity.price);
       acc[range] = (acc[range] || 0) + 1;
     }
     return acc;
   }, {});
 },

 getPriceRange(price) {
   if (price <= 50) return '0-50';
   if (price <= 100) return '51-100';
   if (price <= 200) return '101-200';
   if (price <= 500) return '201-500';
   return '500+';
 },

 aggregateActivityByTime(history) {
   return history.reduce((acc, activity) => {
     const hour = new Date(activity.timestamp.toDate()).getHours();
     acc[hour] = (acc[hour] || 0) + 1;
     return acc;
   }, {});
 },

 async setDealAlert(userId, alert) {
   const userRef = doc(db, 'users', userId);
   await updateDoc(userRef, {
     'preferences.dealAlerts': arrayUnion(alert)
   });
 },

 async removeDealAlert(userId, alertId) {
   const userRef = doc(db, 'users', userId);
   const userDoc = await getDoc(userRef);
   const alerts = userDoc.data().preferences.dealAlerts.filter(
     alert => alert.id !== alertId
   );
   
   await updateDoc(userRef, {
     'preferences.dealAlerts': alerts
   });
 },

 async checkDealAlerts(userId) {
   const preferences = await this.getUserPreferences(userId);
   const alerts = preferences.dealAlerts || [];
   const matchingDeals = [];

   for (const alert of alerts) {
     const dealsRef = collection(db, 'deals');
     const q = query(
       dealsRef,
       where('category', '==', alert.category),
       where('discountedPrice', '<=', alert.maxPrice),
       where('isActive', '==', true)
     );

     const snapshot = await getDocs(q);
     matchingDeals.push(...snapshot.docs.map(doc => ({
       id: doc.id,
       ...doc.data(),
       alertId: alert.id
     })));
   }

   return matchingDeals;
 }
};