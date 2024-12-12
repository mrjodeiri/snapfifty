// src/components/admin/deals/DealModal.js
import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { X } from 'lucide-react';
import { useActivityLogger } from '../../../hooks/useActivityLogger';

const DealModal = ({ isOpen, onClose, editDeal = null }) => {
 const { logActivity } = useActivityLogger();
 const [dealData, setDealData] = useState({
   title: '',
   description: '',
   category: '',
   originalPrice: '',
   discountedPrice: '',
   storeUrl: '',
   imageUrl: '',
   isActive: true,
   isPending: false,
   validUntil: ''
 });

 useEffect(() => {
   if (editDeal) {
     setDealData(editDeal);
   }
 }, [editDeal]);

 const validateDeal = () => {
   const discountPercentage = 
     ((dealData.originalPrice - dealData.discountedPrice) / dealData.originalPrice) * 100;
   
   if (discountPercentage < 50) {
     throw new Error('Discount must be 50% or more');
   }
   if (!dealData.title || !dealData.description) {
     throw new Error('Title and description are required');
   }
   if (!dealData.storeUrl.startsWith('http')) {
     throw new Error('Valid store URL is required');
   }
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     validateDeal();
     
     if (editDeal) {
       await updateDoc(doc(db, 'deals', editDeal.id), {
         ...dealData,
         originalPrice: Number(dealData.originalPrice),
         discountedPrice: Number(dealData.discountedPrice),
         updatedAt: serverTimestamp()
       });
       await logActivity('UPDATE_DEAL', `Updated deal: ${dealData.title}`);
     } else {
       await addDoc(collection(db, 'deals'), {
         ...dealData,
         originalPrice: Number(dealData.originalPrice),
         discountedPrice: Number(dealData.discountedPrice),
         createdAt: serverTimestamp(),
         updatedAt: serverTimestamp()
       });
       await logActivity('CREATE_DEAL', `Created new deal: ${dealData.title}`);
     }
     onClose();
   } catch (error) {
     alert(error.message);
   }
 };

 if (!isOpen) return null;

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
       <div className="flex justify-between items-center mb-4">
         <h3 className="text-lg font-semibold">
           {editDeal ? 'Edit Deal' : 'Add New Deal'}
         </h3>
         <button onClick={onClose}>
           <X size={20} />
         </button>
       </div>

       <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label className="block text-sm font-medium mb-1">Title</label>
           <input
             type="text"
             value={dealData.title}
             onChange={(e) => setDealData({...dealData, title: e.target.value})}
             className="w-full border rounded p-2"
             required
           />
         </div>

         <div>
           <label className="block text-sm font-medium mb-1">Description</label>
           <textarea
             value={dealData.description}
             onChange={(e) => setDealData({...dealData, description: e.target.value})}
             className="w-full border rounded p-2 h-24"
             required
           />
         </div>

         <div>
           <label className="block text-sm font-medium mb-1">Category</label>
           <select
             value={dealData.category}
             onChange={(e) => setDealData({...dealData, category: e.target.value})}
             className="w-full border rounded p-2"
             required
           >
             <option value="">Select Category</option>
             <option value="electronics">Electronics</option>
             <option value="fashion">Fashion</option>
             <option value="home">Home & Kitchen</option>
             <option value="beauty">Beauty</option>
             <option value="sports">Sports</option>
           </select>
         </div>

         <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-medium mb-1">Original Price</label>
             <input
               type="number"
               value={dealData.originalPrice}
               onChange={(e) => setDealData({...dealData, originalPrice: e.target.value})}
               className="w-full border rounded p-2"
               required
               min="0"
               step="0.01"
             />
           </div>
           <div>
             <label className="block text-sm font-medium mb-1">Discounted Price</label>
             <input
               type="number"
               value={dealData.discountedPrice}
               onChange={(e) => setDealData({...dealData, discountedPrice: e.target.value})}
               className="w-full border rounded p-2"
               required
               min="0"
               step="0.01"
             />
           </div>
         </div>

         <div>
           <label className="block text-sm font-medium mb-1">Store URL</label>
           <input
             type="url"
             value={dealData.storeUrl}
             onChange={(e) => setDealData({...dealData, storeUrl: e.target.value})}
             className="w-full border rounded p-2"
             required
           />
         </div>

         <div>
           <label className="block text-sm font-medium mb-1">Image URL</label>
           <input
             type="url"
             value={dealData.imageUrl}
             onChange={(e) => setDealData({...dealData, imageUrl: e.target.value})}
             className="w-full border rounded p-2"
           />
         </div>

         <div>
           <label className="block text-sm font-medium mb-1">Valid Until</label>
           <input
             type="datetime-local"
             value={dealData.validUntil}
             onChange={(e) => setDealData({...dealData, validUntil: e.target.value})}
             className="w-full border rounded p-2"
           />
         </div>

         <div className="flex items-center space-x-4">
           <label className="flex items-center">
             <input
               type="checkbox"
               checked={dealData.isActive}
               onChange={(e) => setDealData({...dealData, isActive: e.target.checked})}
               className="mr-2"
             />
             Active
           </label>
           <label className="flex items-center">
             <input
               type="checkbox"
               checked={dealData.isPending}
               onChange={(e) => setDealData({...dealData, isPending: e.target.checked})}
               className="mr-2"
             />
             Pending Review
           </label>
         </div>

         <button
           type="submit"
           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
         >
           {editDeal ? 'Update Deal' : 'Add Deal'}
         </button>
       </form>
     </div>
   </div>
 );
};

export default DealModal;