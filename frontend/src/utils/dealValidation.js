// src/utils/dealValidation.js
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const validateDeal = async (deal) => {
 const errors = [];
 const warnings = [];

 // Required fields
 const requiredFields = ['title', 'description', 'category', 'originalPrice', 'discountedPrice', 'storeUrl'];
 requiredFields.forEach(field => {
   if (!deal[field]) errors.push(`${field} is required`);
 });

 // Price validation
 if (deal.originalPrice && deal.discountedPrice) {
   const discount = (deal.originalPrice - deal.discountedPrice) / deal.originalPrice * 100;
   if (discount < 50) {
     errors.push('Discount must be 50% or greater');
   }
   if (discount > 90) {
     warnings.push('Unusually high discount - requires verification');
   }
 }

 // URL validation
 if (deal.storeUrl && !isValidUrl(deal.storeUrl)) {
   errors.push('Invalid store URL');
 }

 // Check for duplicates
 const duplicates = await checkDuplicates(deal);
 if (duplicates.length > 0) {
   warnings.push(`Similar deals found: ${duplicates.map(d => d.id).join(', ')}`);
 }

 return { errors, warnings };
};

const isValidUrl = (url) => {
 try {
   new URL(url);
   return true;
 } catch {
   return false;
 }
};

const checkDuplicates = async (deal) => {
 const dealsRef = collection(db, 'deals');
 const q = query(
   dealsRef,
   where('storeUrl', '==', deal.storeUrl)
 );
 
 const snapshot = await getDocs(q);
 return snapshot.docs
   .map(doc => ({ id: doc.id, ...doc.data() }))
   .filter(d => d.id !== deal.id);
};

export const validatePriceHistory = (priceHistory) => {
 if (!Array.isArray(priceHistory)) return false;
 
 return priceHistory.every(price => (
   typeof price.date === 'string' &&
   typeof price.price === 'number' &&
   price.price >= 0
 ));
};

export const calculateDiscount = (originalPrice, discountedPrice) => {
 if (typeof originalPrice !== 'number' || typeof discountedPrice !== 'number') {
   return 0;
 }
 return ((originalPrice - discountedPrice) / originalPrice * 100).toFixed(1);
};

export const validateDealDates = (deal) => {
 const now = new Date();
 const validUntil = new Date(deal.validUntil);
 
 if (validUntil < now) {
   return {
     isValid: false,
     message: 'Deal has expired'
   };
 }
 
 return { isValid: true };
};