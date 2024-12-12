// src/utils/dealAnalytics.js
import { db } from '../config/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

export const DealAnalytics = {
 async getPerformanceMetrics(dealId) {
   const dealRef = collection(db, 'deal_metrics', dealId, 'clicks');
   const q = query(dealRef, orderBy('timestamp', 'desc'));
   const snapshot = await getDocs(q);
   
   return {
     totalClicks: snapshot.size,
     clickHistory: snapshot.docs.map(doc => ({
       timestamp: doc.data().timestamp.toDate(),
       source: doc.data().source
     }))
   };
 },

 async getTopDeals(timeframe = '7d', limit = 10) {
   const startDate = new Date();
   startDate.setDate(startDate.getDate() - parseInt(timeframe));

   const dealsRef = collection(db, 'deals');
   const q = query(
     dealsRef,
     where('createdAt', '>=', startDate),
     orderBy('clicks', 'desc'),
     limit(limit)
   );

   const snapshot = await getDocs(q);
   return snapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data(),
     conversionRate: (doc.data().conversions / doc.data().clicks * 100).toFixed(2)
   }));
 },

 async getCategoryPerformance() {
   const dealsRef = collection(db, 'deals');
   const snapshot = await getDocs(dealsRef);
   
   return snapshot.docs.reduce((acc, doc) => {
     const data = doc.data();
     if (!acc[data.category]) {
       acc[data.category] = {
         totalDeals: 0,
         totalClicks: 0,
         averageDiscount: 0,
         totalRevenue: 0
       };
     }
     
     acc[data.category].totalDeals++;
     acc[data.category].totalClicks += data.clicks || 0;
     acc[data.category].totalRevenue += data.revenue || 0;
     acc[data.category].averageDiscount += 
       ((data.originalPrice - data.discountedPrice) / data.originalPrice * 100);
     
     return acc;
   }, {});
 },

 calculateMetrics(deal) {
   const discount = ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice * 100);
   const roi = (deal.revenue / (deal.marketingCost || 1)) * 100;
   const conversionRate = (deal.conversions / deal.clicks * 100) || 0;

   return {
     discount,
     roi,
     conversionRate,
     profitMargin: ((deal.revenue - (deal.marketingCost || 0)) / deal.revenue * 100) || 0,
     clickThroughRate: (deal.clicks / deal.impressions * 100) || 0
   };
 },

 generateReport(deals, timeframe) {
   const metrics = deals.reduce((acc, deal) => {
     const dealMetrics = this.calculateMetrics(deal);
     acc.totalRevenue += deal.revenue || 0;
     acc.totalClicks += deal.clicks || 0;
     acc.averageDiscount += dealMetrics.discount;
     acc.averageConversion += dealMetrics.conversionRate;
     return acc;
   }, {
     totalRevenue: 0,
     totalClicks: 0,
     averageDiscount: 0,
     averageConversion: 0
   });

   metrics.averageDiscount /= deals.length;
   metrics.averageConversion /= deals.length;

   return {
     timeframe,
     metrics,
     deals: deals.map(deal => ({
       id: deal.id,
       title: deal.title,
       metrics: this.calculateMetrics(deal)
     }))
   };
 }
};

export const trackDealEvent = async (dealId, eventType, data = {}) => {
 const eventRef = collection(db, 'deal_metrics', dealId, eventType);
 await addDoc(eventRef, {
   ...data,
   timestamp: serverTimestamp()
 });
};