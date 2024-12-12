// src/utils/dealSearch.js
import { db } from '../config/firebase';
import { collection, query, where, getDocs, orderBy, limit, startAfter } from 'firebase/firestore';

export const DealSearch = {
 async searchDeals(searchParams) {
   const {
     term = '',
     category = '',
     minPrice = 0,
     maxPrice = Infinity,
     minDiscount = 50,
     sortBy = 'newest',
     page = 1,
     limit: pageSize = 20,
     lastDoc = null
   } = searchParams;

   let baseQuery = collection(db, 'deals');
   
   // Build query constraints
   let constraints = [];

   // Active deals only
   constraints.push(where('isActive', '==', true));

   // Category filter
   if (category) {
     constraints.push(where('category', '==', category));
   }

   // Price range
   if (minPrice > 0) {
     constraints.push(where('discountedPrice', '>=', minPrice));
   }
   if (maxPrice < Infinity) {
     constraints.push(where('discountedPrice', '<=', maxPrice));
   }

   // Discount percentage
   if (minDiscount > 0) {
     constraints.push(where('discountPercentage', '>=', minDiscount));
   }

   // Sort order
   switch(sortBy) {
     case 'newest':
       constraints.push(orderBy('createdAt', 'desc'));
       break;
     case 'price-low':
       constraints.push(orderBy('discountedPrice', 'asc'));
       break;
     case 'price-high':
       constraints.push(orderBy('discountedPrice', 'desc'));
       break;
     case 'discount':
       constraints.push(orderBy('discountPercentage', 'desc'));
       break;
     case 'popularity':
       constraints.push(orderBy('clicks', 'desc'));
       break;
   }

   // Pagination
   if (lastDoc) {
     constraints.push(startAfter(lastDoc));
   }
   constraints.push(limit(pageSize));

   // Execute query
   let q = query(baseQuery, ...constraints);
   const snapshot = await getDocs(q);

   // Text search (client-side since Firestore doesn't support full-text search)
   let results = snapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data()
   }));

   if (term) {
     const searchTerms = term.toLowerCase().split(' ');
     results = results.filter(deal => {
       const searchableText = `${deal.title} ${deal.description} ${deal.category}`.toLowerCase();
       return searchTerms.every(term => searchableText.includes(term));
     });
   }

   return {
     deals: results,
     lastDoc: snapshot.docs[snapshot.docs.length - 1],
     hasMore: results.length === pageSize
   };
 },

 async getPopularSearches() {
   const searchesRef = collection(db, 'searchMetrics');
   const q = query(searchesRef, orderBy('count', 'desc'), limit(10));
   const snapshot = await getDocs(q);
   
   return snapshot.docs.map(doc => ({
     term: doc.id,
     count: doc.data().count
   }));
 },

 async getSuggestedSearches(term) {
   const suggestionsRef = collection(db, 'searchSuggestions');
   const q = query(
     suggestionsRef,
     where('keywords', 'array-contains', term.toLowerCase()),
     limit(5)
   );
   
   const snapshot = await getDocs(q);
   return snapshot.docs.map(doc => doc.data().suggestion);
 },

 generateSearchAggregations(deals) {
   return {
     categories: this.aggregateCategories(deals),
     priceRanges: this.aggregatePriceRanges(deals),
     discountRanges: this.aggregateDiscountRanges(deals)
   };
 },

 aggregateCategories(deals) {
   return deals.reduce((acc, deal) => {
     acc[deal.category] = (acc[deal.category] || 0) + 1;
     return acc;
   }, {});
 },

 aggregatePriceRanges(deals) {
   const ranges = {
     '0-50': 0,
     '51-100': 0,
     '101-200': 0,
     '201-500': 0,
     '500+': 0
   };

   deals.forEach(deal => {
     const price = deal.discountedPrice;
     if (price <= 50) ranges['0-50']++;
     else if (price <= 100) ranges['51-100']++;
     else if (price <= 200) ranges['101-200']++;
     else if (price <= 500) ranges['201-500']++;
     else ranges['500+']++;
   });

   return ranges;
 },

 aggregateDiscountRanges(deals) {
   const ranges = {
     '50-60': 0,
     '61-70': 0,
     '71-80': 0,
     '81-90': 0,
     '90+': 0
   };

   deals.forEach(deal => {
     const discount = ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100;
     if (discount <= 60) ranges['50-60']++;
     else if (discount <= 70) ranges['61-70']++;
     else if (discount <= 80) ranges['71-80']++;
     else if (discount <= 90) ranges['81-90']++;
     else ranges['90+']++;
   });

   return ranges;
 },

 formatSearchResults(results, aggregations) {
   return {
     total: results.length,
     aggregations,
     deals: results.map(deal => ({
       id: deal.id,
       title: deal.title,
       description: deal.description,
       category: deal.category,
       originalPrice: deal.originalPrice,
       discountedPrice: deal.discountedPrice,
       discountPercentage: ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice * 100),
       storeUrl: deal.storeUrl,
       imageUrl: deal.imageUrl,
       createdAt: deal.createdAt.toDate()
     }))
   };
 }
};