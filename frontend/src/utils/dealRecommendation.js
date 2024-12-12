// src/utils/dealRecommendation.js
import { db } from '../config/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

export const DealRecommendation = {
 async getRecommendations(userId, currentDealId = null) {
   const userPreferences = await this.getUserPreferences(userId);
   const userHistory = await this.getUserHistory(userId);
   
   return {
     personalizedDeals: await this.getPersonalizedDeals(userPreferences, userHistory),
     similarDeals: currentDealId ? await this.getSimilarDeals(currentDealId) : [],
     trendingDeals: await this.getTrendingDeals(),
     categoryRecommendations: await this.getCategoryBasedRecommendations(userHistory)
   };
 },

 async getUserPreferences(userId) {
   if (!userId) return null;
   
   const userRef = doc(db, 'users', userId);
   const userDoc = await getDoc(userRef);
   
   return userDoc.exists() ? userDoc.data().preferences : null;
 },

 async getUserHistory(userId) {
   if (!userId) return [];

   const historyRef = collection(db, 'userHistory');
   const q = query(
     historyRef,
     where('userId', '==', userId),
     orderBy('timestamp', 'desc'),
     limit(50)
   );
   
   const snapshot = await getDocs(q);
   return snapshot.docs.map(doc => doc.data());
 },

 async getPersonalizedDeals(preferences, history) {
   if (!preferences && !history.length) return [];

   const preferredCategories = this.extractPreferredCategories(preferences, history);
   const priceRange = this.calculatePreferredPriceRange(history);
   
   const dealsRef = collection(db, 'deals');
   const q = query(
     dealsRef,
     where('category', 'in', preferredCategories),
     where('discountedPrice', '>=', priceRange.min),
     where('discountedPrice', '<=', priceRange.max),
     where('isActive', '==', true),
     orderBy('discountPercentage', 'desc'),
     limit(10)
   );

   const snapshot = await getDocs(q);
   return snapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data()
   }));
 },

 async getSimilarDeals(dealId) {
   const dealRef = doc(db, 'deals', dealId);
   const dealDoc = await getDoc(dealRef);
   
   if (!dealDoc.exists()) return [];
   
   const deal = dealDoc.data();
   const dealsRef = collection(db, 'deals');
   const q = query(
     dealsRef,
     where('category', '==', deal.category),
     where('id', '!=', dealId),
     where('isActive', '==', true),
     orderBy('discountPercentage', 'desc'),
     limit(6)
   );

   const snapshot = await getDocs(q);
   return snapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data(),
     similarity: this.calculateSimilarity(deal, doc.data())
   })).sort((a, b) => b.similarity - a.similarity);
 },

 async getTrendingDeals() {
   const dealsRef = collection(db, 'deals');
   const q = query(
     dealsRef,
     where('isActive', '==', true),
     orderBy('clicks', 'desc'),
     limit(10)
   );

   const snapshot = await getDocs(q);
   return snapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data()
   }));
 },

 async getCategoryBasedRecommendations(history) {
   const categories = this.extractPreferredCategories(null, history);
   const recommendations = {};

   for (const category of categories) {
     const dealsRef = collection(db, 'deals');
     const q = query(
       dealsRef,
       where('category', '==', category),
       where('isActive', '==', true),
       orderBy('discountPercentage', 'desc'),
       limit(4)
     );

     const snapshot = await getDocs(q);
     recommendations[category] = snapshot.docs.map(doc => ({
       id: doc.id,
       ...doc.data()
     }));
   }

   return recommendations;
 },

 calculateSimilarity(deal1, deal2) {
   const features = {
     category: deal1.category === deal2.category ? 1 : 0,
     priceRange: this.calculatePriceRangeSimilarity(deal1.discountedPrice, deal2.discountedPrice),
     discountRange: this.calculateDiscountRangeSimilarity(
       deal1.originalPrice - deal1.discountedPrice,
       deal2.originalPrice - deal2.discountedPrice
     )
   };

   return (features.category * 0.4) + 
          (features.priceRange * 0.3) + 
          (features.discountRange * 0.3);
 },

 extractPreferredCategories(preferences, history) {
   const categories = new Map();

   if (preferences?.preferredCategories) {
     preferences.preferredCategories.forEach(cat => 
       categories.set(cat, (categories.get(cat) || 0) + 2)
     );
   }

   if (history.length) {
     history.forEach(item => 
       categories.set(item.category, (categories.get(item.category) || 0) + 1)
     );
   }

   return Array.from(categories.entries())
     .sort((a, b) => b[1] - a[1])
     .slice(0, 5)
     .map(([category]) => category);
 },

 calculatePreferredPriceRange(history) {
   if (!history.length) {
     return { min: 0, max: Infinity };
   }

   const prices = history.map(item => item.price);
   const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
   const stdDev = Math.sqrt(
     prices.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / prices.length
   );

   return {
     min: Math.max(0, avg - stdDev),
     max: avg + stdDev
   };
 },

 calculatePriceRangeSimilarity(price1, price2) {
   const maxDiff = Math.max(price1, price2) * 0.5;
   const actualDiff = Math.abs(price1 - price2);
   return Math.max(0, 1 - (actualDiff / maxDiff));
 },

 calculateDiscountRangeSimilarity(discount1, discount2) {
   const maxDiff = Math.max(discount1, discount2) * 0.5;
   const actualDiff = Math.abs(discount1 - discount2);
   return Math.max(0, 1 - (actualDiff / maxDiff));
 }
};