// src/utils/dealAutomation.js
import { db } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { DealAnalytics } from './dealAnalytics';

export const DealAutomation = {
 async checkExpiredDeals() {
   const now = new Date();
   const dealsRef = collection(db, 'deals');
   const q = query(
     dealsRef,
     where('validUntil', '<=', now),
     where('isActive', '==', true)
   );

   const snapshot = await getDocs(q);
   const batch = writeBatch(db);

   snapshot.docs.forEach(dealDoc => {
     batch.update(dealDoc.ref, { 
       isActive: false,
       updatedAt: serverTimestamp()
     });
   });

   await batch.commit();
   return snapshot.size;
 },

 async verifyPrices(deal) {
   const amazonPrice = await this.fetchAmazonPrice(deal.storeUrl);
   const threshold = 0.1; // 10% price difference threshold

   if (Math.abs(amazonPrice - deal.discountedPrice) / deal.discountedPrice > threshold) {
     await updateDoc(doc(db, 'deals', deal.id), {
       discountedPrice: amazonPrice,
       updatedAt: serverTimestamp(),
       priceHistory: arrayUnion({
         price: amazonPrice,
         date: serverTimestamp()
       })
     });
     return true;
   }
   return false;
 },

 async optimizeDealPlacements() {
   const deals = await DealAnalytics.getTopDeals('24h');
   const categories = await DealAnalytics.getCategoryPerformance();
   
   return deals.map(deal => ({
     id: deal.id,
     recommendedPosition: this.calculateOptimalPosition(deal, categories[deal.category]),
     recommendedCategory: this.suggestCategory(deal, categories)
   }));
 },

 calculateOptimalPosition(deal, categoryStats) {
   const score = (
     (deal.clicks || 0) * 0.4 +
     (deal.conversionRate || 0) * 0.3 +
     ((deal.revenue || 0) / categoryStats.averageRevenue) * 0.3
   );
   return score > 0.8 ? 'featured' : score > 0.5 ? 'primary' : 'secondary';
 },

 suggestCategory(deal, categories) {
   const dealMetrics = DealAnalytics.calculateMetrics(deal);
   let bestCategory = deal.category;
   let bestScore = 0;

   Object.entries(categories).forEach(([category, stats]) => {
     const score = (
       (stats.averageConversion || 0) * 0.4 +
       (stats.averageRevenue || 0) * 0.3 +
       (stats.totalClicks || 0) * 0.3
     );
     if (score > bestScore) {
       bestScore = score;
       bestCategory = category;
     }
   });

   return bestCategory !== deal.category ? bestCategory : null;
 },

 async generateDealsReport() {
   const dealsRef = collection(db, 'deals');
   const snapshot = await getDocs(dealsRef);
   const deals = snapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data()
   }));

   const report = {
     timestamp: new Date(),
     summary: {
       totalDeals: deals.length,
       activeDeals: deals.filter(d => d.isActive).length,
       averageDiscount: this.calculateAverageDiscount(deals),
       topCategories: this.getTopCategories(deals)
     },
     recommendations: await this.generateRecommendations(deals),
     actions: this.suggestActions(deals)
   };

   await addDoc(collection(db, 'reports'), report);
   return report;
 },

 calculateAverageDiscount(deals) {
   return deals.reduce((acc, deal) => {
     return acc + ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice * 100);
   }, 0) / deals.length;
 },

 getTopCategories(deals) {
   const categories = deals.reduce((acc, deal) => {
     acc[deal.category] = (acc[deal.category] || 0) + 1;
     return acc;
   }, {});

   return Object.entries(categories)
     .sort(([,a], [,b]) => b - a)
     .slice(0, 5)
     .map(([category, count]) => ({
       category,
       count,
       percentage: (count / deals.length * 100).toFixed(1)
     }));
 },

 async generateRecommendations(deals) {
   const analytics = deals.map(deal => ({
     ...deal,
     metrics: DealAnalytics.calculateMetrics(deal)
   }));

   return {
     pricingOptimizations: this.suggestPriceOptimizations(analytics),
     categoryShifts: this.suggestCategoryChanges(analytics),
     timingRecommendations: this.suggestTimingChanges(analytics)
   };
 },

 suggestActions(deals) {
   return {
     immediate: deals
       .filter(d => this.needsImmediateAction(d))
       .map(d => ({
         dealId: d.id,
         action: this.determineAction(d),
         priority: this.calculatePriority(d)
       })),
     scheduled: deals
       .filter(d => this.needsScheduledAction(d))
       .map(d => ({
         dealId: d.id,
         action: this.determineAction(d),
         scheduledFor: this.suggestScheduleTime(d)
       }))
   };
 },

 needsImmediateAction(deal) {
   return (
     !deal.isActive ||
     this.isPriceOutdated(deal) ||
     this.isPerformancePoor(deal)
   );
 },

 needsScheduledAction(deal) {
   return (
     this.isExpiringSoon(deal) ||
     this.needsRefresh(deal)
   );
 }
};