// src/utils/dealReporting.js
import { db } from '../config/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { DealAnalytics } from './dealAnalytics';

export const DealReporting = {
 async generatePerformanceReport(timeframe = '7d') {
   const deals = await DealAnalytics.getTopDeals(timeframe);
   const metrics = await this.calculateMetrics(deals);
   const trends = await this.analyzeTrends(deals, timeframe);
   
   const report = {
     timeframe,
     generatedAt: serverTimestamp(),
     metrics,
     trends,
     topPerformers: this.getTopPerformers(deals),
     recommendations: this.generateRecommendations(metrics, trends)
   };

   await this.saveReport(report);
   return report;
 },

 async calculateMetrics(deals) {
   return {
     totalDeals: deals.length,
     totalRevenue: this.calculateTotalRevenue(deals),
     averageDiscount: this.calculateAverageDiscount(deals),
     conversionRate: this.calculateConversionRate(deals),
     categoryBreakdown: this.getCategoryBreakdown(deals),
     profitMargins: this.calculateProfitMargins(deals)
   };
 },

 async analyzeTrends(deals, timeframe) {
   const previousDeals = await this.getPreviousPeriodDeals(timeframe);
   
   return {
     revenueGrowth: this.calculateGrowth(
       this.calculateTotalRevenue(deals),
       this.calculateTotalRevenue(previousDeals)
     ),
     conversionTrend: this.calculateGrowth(
       this.calculateConversionRate(deals),
       this.calculateConversionRate(previousDeals)
     ),
     categoryTrends: this.analyzeCategoryTrends(deals, previousDeals),
     performanceTrends: this.analyzePerformanceTrends(deals, previousDeals)
   };
 },

 getTopPerformers(deals) {
   return deals
     .sort((a, b) => b.revenue - a.revenue)
     .slice(0, 5)
     .map(deal => ({
       id: deal.id,
       title: deal.title,
       revenue: deal.revenue,
       conversion: deal.conversionRate,
       roi: ((deal.revenue - deal.cost) / deal.cost * 100).toFixed(2)
     }));
 },

 generateRecommendations(metrics, trends) {
   const recommendations = [];

   if (trends.revenueGrowth < 0) {
     recommendations.push({
       type: 'REVENUE',
       priority: 'HIGH',
       action: 'Review pricing strategy and deal terms'
     });
   }

   if (trends.conversionTrend < 0) {
     recommendations.push({
       type: 'CONVERSION',
       priority: 'HIGH',
       action: 'Optimize deal presentation and targeting'
     });
   }

   Object.entries(trends.categoryTrends).forEach(([category, trend]) => {
     if (trend < -10) {
       recommendations.push({
         type: 'CATEGORY',
         category,
         priority: 'MEDIUM',
         action: `Review and refresh ${category} deals`
       });
     }
   });

   return recommendations;
 },

 async saveReport(report) {
   await addDoc(collection(db, 'reports'), report);
 },

 calculateTotalRevenue(deals) {
   return deals.reduce((sum, deal) => sum + (deal.revenue || 0), 0);
 },

 calculateAverageDiscount(deals) {
   return deals.reduce((sum, deal) => {
     const discount = ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100;
     return sum + discount;
   }, 0) / deals.length;
 },

 calculateConversionRate(deals) {
   const totalClicks = deals.reduce((sum, deal) => sum + (deal.clicks || 0), 0);
   const totalConversions = deals.reduce((sum, deal) => sum + (deal.conversions || 0), 0);
   return (totalConversions / totalClicks * 100) || 0;
 },

 getCategoryBreakdown(deals) {
   return deals.reduce((acc, deal) => {
     if (!acc[deal.category]) {
       acc[deal.category] = {
         count: 0,
         revenue: 0,
         conversions: 0
       };
     }
     
     acc[deal.category].count++;
     acc[deal.category].revenue += deal.revenue || 0;
     acc[deal.category].conversions += deal.conversions || 0;
     
     return acc;
   }, {});
 },

 calculateProfitMargins(deals) {
   return deals.reduce((acc, deal) => {
     const margin = ((deal.revenue - deal.cost) / deal.revenue * 100) || 0;
     acc.total += margin;
     acc.min = Math.min(acc.min, margin);
     acc.max = Math.max(acc.max, margin);
     return acc;
   }, { total: 0, min: Infinity, max: -Infinity });
 },

 async getPreviousPeriodDeals(timeframe) {
   const days = parseInt(timeframe);
   const startDate = new Date();
   startDate.setDate(startDate.getDate() - (days * 2));
   const endDate = new Date();
   endDate.setDate(endDate.getDate() - days);

   const dealsRef = collection(db, 'deals');
   const q = query(
     dealsRef,
     where('createdAt', '>=', startDate),
     where('createdAt', '<=', endDate)
   );

   const snapshot = await getDocs(q);
   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
 },

 calculateGrowth(current, previous) {
   if (!previous) return 0;
   return ((current - previous) / previous * 100).toFixed(2);
 },

 analyzeCategoryTrends(currentDeals, previousDeals) {
   const currentByCategory = this.getCategoryBreakdown(currentDeals);
   const previousByCategory = this.getCategoryBreakdown(previousDeals);

   return Object.keys(currentByCategory).reduce((acc, category) => {
     const current = currentByCategory[category].revenue;
     const previous = previousByCategory[category]?.revenue || 0;
     acc[category] = this.calculateGrowth(current, previous);
     return acc;
   }, {});
 },

 analyzePerformanceTrends(currentDeals, previousDeals) {
   return {
     clicks: this.calculateGrowth(
       currentDeals.reduce((sum, deal) => sum + (deal.clicks || 0), 0),
       previousDeals.reduce((sum, deal) => sum + (deal.clicks || 0), 0)
     ),
     conversion: this.calculateGrowth(
       this.calculateConversionRate(currentDeals),
       this.calculateConversionRate(previousDeals)
     ),
     revenue: this.calculateGrowth(
       this.calculateTotalRevenue(currentDeals),
       this.calculateTotalRevenue(previousDeals)
     )
   };
 }
};