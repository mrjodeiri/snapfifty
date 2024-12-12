// src/utils/dealImport.js
import { db } from '../config/firebase';
import { collection, addDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { validateDeal } from './dealValidation';

export const DealImport = {
 async importDeals(file, options = { validateOnly: false }) {
   const data = await this.parseFile(file);
   const results = await this.processDeals(data, options);
   
   if (!options.validateOnly && results.valid) {
     await this.saveBatch(results.deals);
   }

   return results;
 },

 async parseFile(file) {
   const extension = file.name.split('.').pop().toLowerCase();
   
   switch (extension) {
     case 'csv':
       return this.parseCSV(file);
     case 'xlsx':
       return this.parseExcel(file);
     case 'json':
       return this.parseJSON(file);
     default:
       throw new Error('Unsupported file format');
   }
 },

 async parseCSV(file) {
   const text = await file.text();
   const rows = text.split('\n');
   const headers = rows[0].split(',').map(h => h.trim());
   
   return rows.slice(1).map(row => {
     const values = row.split(',');
     return headers.reduce((obj, header, index) => {
       obj[this.normalizeHeader(header)] = this.parseValue(values[index]);
       return obj;
     }, {});
   });
 },

 async parseExcel(file) {
   const XLSX = require('xlsx');
   const buffer = await file.arrayBuffer();
   const workbook = XLSX.read(buffer);
   const worksheet = workbook.Sheets[workbook.SheetNames[0]];
   
   return XLSX.utils.sheet_to_json(worksheet).map(row => 
     Object.keys(row).reduce((obj, key) => {
       obj[this.normalizeHeader(key)] = this.parseValue(row[key]);
       return obj;
     }, {})
   );
 },

 async parseJSON(file) {
   const text = await file.text();
   return JSON.parse(text);
 },

 normalizeHeader(header) {
   return header
     .toLowerCase()
     .replace(/[^a-z0-9]/g, '')
     .replace(/price$/, 'Price')
     .replace(/url$/, 'Url');
 },

 parseValue(value) {
   if (!value) return null;
   if (typeof value === 'string') {
     value = value.trim();
     if (value.match(/^\d+(\.\d+)?$/)) {
       return parseFloat(value);
     }
   }
   return value;
 },

 async processDeals(data, options) {
   const results = {
     total: data.length,
     valid: true,
     processed: 0,
     errors: [],
     warnings: [],
     deals: []
   };

   for (const row of data) {
     try {
       const deal = this.formatDeal(row);
       const validation = await validateDeal(deal);

       if (validation.errors.length > 0) {
         results.errors.push({
           row: results.processed + 1,
           errors: validation.errors
         });
         results.valid = false;
       }

       if (validation.warnings.length > 0) {
         results.warnings.push({
           row: results.processed + 1,
           warnings: validation.warnings
         });
       }

       if (validation.errors.length === 0) {
         results.deals.push(deal);
       }

       results.processed++;
     } catch (error) {
       results.errors.push({
         row: results.processed + 1,
         errors: [error.message]
       });
       results.valid = false;
       results.processed++;
     }
   }

   return results;
 },

 formatDeal(row) {
   return {
     title: row.title,
     description: row.description,
     category: row.category,
     originalPrice: parseFloat(row.originalPrice),
     discountedPrice: parseFloat(row.discountedPrice),
     storeUrl: row.storeUrl,
     imageUrl: row.imageUrl || null,
     isActive: true,
     createdAt: serverTimestamp(),
     updatedAt: serverTimestamp()
   };
 },

 async saveBatch(deals) {
   const batch = writeBatch(db);
   const dealsRef = collection(db, 'deals');

   deals.forEach(deal => {
     const docRef = addDoc(dealsRef, deal);
     batch.set(docRef, deal);
   });

   await batch.commit();
   return deals.length;
 },

 validateHeaders(headers) {
   const required = ['title', 'description', 'category', 'originalPrice', 'discountedPrice', 'storeUrl'];
   const missing = required.filter(field => !headers.includes(field));
   
   if (missing.length > 0) {
     throw new Error(`Missing required fields: ${missing.join(', ')}`);
   }
 },

 generateImportReport(results) {
   return {
     timestamp: new Date(),
     summary: {
       totalProcessed: results.processed,
       successfulImports: results.deals.length,
       failedImports: results.errors.length,
       warningCount: results.warnings.length
     },
     errors: results.errors,
     warnings: results.warnings
   };
 }
};