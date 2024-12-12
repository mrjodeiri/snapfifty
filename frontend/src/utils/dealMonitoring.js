// src/utils/dealMonitoring.js
import { db } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { DealAnalytics } from './dealAnalytics';

export const DealMonitoring = {
 async monitorDealHealth(deal) {
   const metrics = await DealAnalytics.getPerformanceMetrics(deal.id);
   const health = this.calculateDealHealth(deal, metrics);
   
   await this.updateDealHealth(deal.id, health);
   
   if (health.score < 50) {
     await this.createAlert(deal.id, health);
   }
   
   return health;
 },

 calculateDealHealth(deal, metrics) {
   const now = new Date();
   const age = (now - deal.createdAt.toDate()) / (1000 * 60 * 60 * 24);
   
   const scores = {
     clicks: this.scoreClicks(metrics.totalClicks, age),
     conversion: this.scoreConversion(metrics.conversionRate),
     priceCompetitiveness: this.scorePriceCompetitiveness(deal),
     validity: this.scoreValidity(deal),
     trending: this.scoreTrending(metrics.clickHistory)
   };

   const score = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;

   return {
     score,
     scores,
     status: this.getHealthStatus(score),
     recommendations: this.generateRecommendations(scores)
   };
 },

 async updateDealHealth(dealId, health) {
   await updateDoc(doc(db, 'deals', dealId), {
     health,
     lastChecked: serverTimestamp()
   });
 },

 async createAlert(dealId, health) {
   await addDoc(collection(db, 'alerts'), {
     dealId,
     type: 'HEALTH_WARNING',
     severity: this.getAlertSeverity(health.score),
     message: this.generateAlertMessage(health),
     createdAt: serverTimestamp(),
     status: 'OPEN'
   });
 },

 getHealthStatus(score) {
   if (score >= 80) return 'EXCELLENT';
   if (score >= 60) return 'GOOD';
   if (score >= 40) return 'FAIR';
   return 'POOR';
 },

 getAlertSeverity(score) {
   if (score < 30) return 'HIGH';
   if (score < 40) return 'MEDIUM';
   return 'LOW';
 },

 scoreClicks(clicks, age) {
   const dailyClicks = clicks / age;
   if (dailyClicks > 100) return 100;
   return dailyClicks;
 },

 scoreConversion(rate) {
   return Math.min(rate * 100, 100);
 },

 scorePriceCompetitiveness(deal) {
   const discount = ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100;
   if (discount >= 70) return 100;
   if (discount >= 60) return 80;
   if (discount >= 50) return 60;
   return 40;
 },

 scoreValidity(deal) {
   if (!deal.validUntil) return 50;
   const daysUntilExpiry = (new Date(deal.validUntil) - new Date()) / (1000 * 60 * 60 * 24);
   if (daysUntilExpiry < 0) return 0;
   if (daysUntilExpiry > 30) return 100;
   return (daysUntilExpiry / 30) * 100;
 },

 scoreTrending(clickHistory) {
   if (!clickHistory.length) return 50;
   const recentClicks = clickHistory.slice(0, 24).length;
   const olderClicks = clickHistory.slice(24, 48).length;
   const trend = ((recentClicks - olderClicks) / olderClicks) * 100;
   return Math.max(0, Math.min(100, 50 + trend));
 },

 generateRecommendations(scores) {
   const recommendations = [];
   
   if (scores.clicks < 50) {
     recommendations.push({
       type: 'VISIBILITY',
       action: 'Increase deal visibility through featured placement'
     });
   }
   
   if (scores.conversion < 50) {
     recommendations.push({
       type: 'PRICING',
       action: 'Consider adjusting price point or improving deal terms'
     });
   }
   
   if (scores.validity < 50) {
     recommendations.push({
       type: 'EXPIRY',
       action: 'Update or extend deal validity period'
     });
   }

   return recommendations;
 },

 generateAlertMessage(health) {
   const messages = {
     POOR: 'Deal requires immediate attention. Multiple metrics below acceptable thresholds.',
     FAIR: 'Deal performance needs improvement. Some metrics require attention.',
     GOOD: 'Deal performing adequately but has room for improvement.',
     EXCELLENT: 'Deal performing exceptionally well across all metrics.'
   };
   
   return `${messages[health.status]} (Score: ${Math.round(health.score)})`;
 },

 async getSystemHealth() {
   const dealsRef = collection(db, 'deals');
   const snapshot = await getDocs(dealsRef);
   const deals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
   
   return {
     totalDeals: deals.length,
     activeDeals: deals.filter(d => d.isActive).length,
     averageHealth: deals.reduce((acc, deal) => acc + (deal.health?.score || 0), 0) / deals.length,
     healthDistribution: this.calculateHealthDistribution(deals),
     alerts: await this.getActiveAlerts()
   };
 },

 calculateHealthDistribution(deals) {
   return deals.reduce((acc, deal) => {
     const status = deal.health?.status || 'UNKNOWN';
     acc[status] = (acc[status] || 0) + 1;
     return acc;
   }, {});
 },

 async getActiveAlerts() {
   const alertsRef = collection(db, 'alerts');
   const q = query(alertsRef, where('status', '==', 'OPEN'));
   const snapshot = await getDocs(q);
   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
 }
};