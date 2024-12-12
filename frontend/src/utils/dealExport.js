// src/utils/dealExport.js
import { db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const DealExport = {
 async exportDeals(format, filters = {}) {
   const deals = await this.fetchDeals(filters);
   return this.formatDeals(deals, format);
 },

 async fetchDeals(filters) {
   let q = collection(db, 'deals');
   
   if (filters.dateRange) {
     q = query(q, 
       where('createdAt', '>=', filters.dateRange.start),
       where('createdAt', '<=', filters.dateRange.end)
     );
   }
   
   const snapshot = await getDocs(q);
   return snapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data()
   }));
 },

 formatDeals(deals, format) {
   switch (format) {
     case 'csv':
       return this.toCSV(deals);
     case 'excel':
       return this.toExcel(deals);
     case 'json':
       return this.toJSON(deals);
     default:
       throw new Error('Unsupported format');
   }
 },

 toCSV(deals) {
   const headers = [
     'ID',
     'Title',
     'Description',
     'Category',
     'Original Price',
     'Discounted Price',
     'Discount %',
     'Store URL',
     'Created At',
     'Valid Until',
     'Status',
     'Clicks',
     'Conversions',
     'Revenue'
   ].join(',');

   const rows = deals.map(deal => [
     deal.id,
     `"${deal.title.replace(/"/g, '""')}"`,
     `"${deal.description.replace(/"/g, '""')}"`,
     deal.category,
     deal.originalPrice,
     deal.discountedPrice,
     ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice * 100).toFixed(2),
     deal.storeUrl,
     deal.createdAt.toDate().toISOString(),
     deal.validUntil || '',
     deal.isActive ? 'Active' : 'Inactive',
     deal.clicks || 0,
     deal.conversions || 0,
     deal.revenue || 0
   ].join(','));

   return [headers, ...rows].join('\n');
 },

 toExcel(deals) {
   const XLSX = require('xlsx');
   const worksheet = XLSX.utils.json_to_sheet(deals.map(deal => ({
     ID: deal.id,
     Title: deal.title,
     Description: deal.description,
     Category: deal.category,
     'Original Price': deal.originalPrice,
     'Discounted Price': deal.discountedPrice,
     'Discount %': ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice * 100).toFixed(2),
     'Store URL': deal.storeUrl,
     'Created At': deal.createdAt.toDate().toISOString(),
     'Valid Until': deal.validUntil || '',
     Status: deal.isActive ? 'Active' : 'Inactive',
     Clicks: deal.clicks || 0,
     Conversions: deal.conversions || 0,
     Revenue: deal.revenue || 0
   })));

   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet, 'Deals');
   
   return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
 },

 toJSON(deals) {
   return JSON.stringify(deals, null, 2);
 },

 generateFileName(format) {
   const date = new Date().toISOString().split('T')[0];
   return `deals-export-${date}.${format}`;
 },

 getMimeType(format) {
   const mimeTypes = {
     csv: 'text/csv',
     excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
     json: 'application/json'
   };
   return mimeTypes[format];
 }
};