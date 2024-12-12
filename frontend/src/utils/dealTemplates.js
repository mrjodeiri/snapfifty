// src/utils/dealTemplates.js
import { db } from '../config/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

export const DealTemplates = {
 async createTemplate(template) {
   const templateData = {
     ...template,
     createdAt: serverTimestamp(),
     updatedAt: serverTimestamp(),
     metadata: {
       usageCount: 0,
       lastUsed: null,
       creator: template.creator || 'system'
     }
   };

   return await addDoc(collection(db, 'dealTemplates'), templateData);
 },

 defaultTemplates: {
   electronics: {
     title: "{productName} - {discountPercentage}% Off",
     description: "Save big on this {productName}! Original price: ${originalPrice}, now only ${discountedPrice}. {additionalFeatures}",
     category: "electronics",
     metadata: {
       requiredFields: ['productName', 'originalPrice', 'discountedPrice', 'additionalFeatures'],
       recommendations: {
         imageCount: 3,
         minDescription: 100,
         suggestedTags: ['tech', 'gadgets', 'electronics']
       }
     }
   },
   fashion: {
     title: "{brand} {productType} - {discountPercentage}% Discount",
     description: "Stylish {brand} {productType} at an amazing price! Was ${originalPrice}, now ${discountedPrice}. {productDetails}",
     category: "fashion",
     metadata: {
       requiredFields: ['brand', 'productType', 'originalPrice', 'discountedPrice', 'productDetails'],
       recommendations: {
         imageCount: 4,
         minDescription: 80,
         suggestedTags: ['fashion', 'clothing', 'style']
       }
     }
   }
 },

 async generateDealFromTemplate(templateId, data) {
   const templateRef = doc(db, 'dealTemplates', templateId);
   const template = await this.getTemplate(templateId);
   
   if (!template) {
     throw new Error('Template not found');
   }

   const deal = this.populateTemplate(template, data);
   await this.validateDealFromTemplate(deal, template.metadata.requiredFields);
   
   // Update template usage statistics
   await updateDoc(templateRef, {
     'metadata.usageCount': increment(1),
     'metadata.lastUsed': serverTimestamp()
   });

   return deal;
 },

 populateTemplate(template, data) {
   let title = template.title;
   let description = template.description;

   // Replace placeholders with actual data
   Object.keys(data).forEach(key => {
     const placeholder = `{${key}}`;
     title = title.replace(placeholder, data[key]);
     description = description.replace(placeholder, data[key]);
   });

   return {
     title,
     description,
     category: template.category,
     originalPrice: data.originalPrice,
     discountedPrice: data.discountedPrice,
     storeUrl: data.storeUrl,
     imageUrl: data.imageUrl,
     isActive: true,
     createdAt: serverTimestamp(),
     updatedAt: serverTimestamp(),
     templateId: template.id
   };
 },

 async validateDealFromTemplate(deal, requiredFields) {
   const missing = requiredFields.filter(field => !deal[field] && deal[field] !== 0);
   
   if (missing.length > 0) {
     throw new Error(`Missing required fields: ${missing.join(', ')}`);
   }
   
   return true;
 },

 async getTemplate(templateId) {
   const templateRef = doc(db, 'dealTemplates', templateId);
   const templateDoc = await getDoc(templateRef);
   
   if (!templateDoc.exists()) {
     return null;
   }
   
   return {
     id: templateDoc.id,
     ...templateDoc.data()
   };
 },

 async getAllTemplates() {
   const templatesRef = collection(db, 'dealTemplates');
   const snapshot = await getDocs(templatesRef);
   
   return snapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data()
   }));
 },

 async updateTemplate(templateId, updates) {
   const templateRef = doc(db, 'dealTemplates', templateId);
   await updateDoc(templateRef, {
     ...updates,
     updatedAt: serverTimestamp()
   });
 },

 async deleteTemplate(templateId) {
   await deleteDoc(doc(db, 'dealTemplates', templateId));
 },

 async initializeDefaultTemplates() {
   const templatesRef = collection(db, 'dealTemplates');
   const snapshot = await getDocs(templatesRef);
   
   if (snapshot.empty) {
     for (const [category, template] of Object.entries(this.defaultTemplates)) {
       await this.createTemplate({
         ...template,
         isDefault: true
       });
     }
   }
 },

 generatePlaceholderData(template) {
   const placeholders = {};
   const regex = /{(\w+)}/g;
   let match;

   while ((match = regex.exec(template.title + template.description)) !== null) {
     placeholders[match[1]] = `[${match[1]}]`;
   }

   return placeholders;
 }
};