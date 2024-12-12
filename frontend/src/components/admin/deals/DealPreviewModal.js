// src/components/admin/deals/DealPreviewModal.js
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { X, ExternalLink, Tag, Clock, DollarSign } from 'lucide-react';

const DealPreviewModal = ({ isOpen, onClose, deal }) => {
 if (!isOpen || !deal) return null;

 const discountPercentage = Math.round(
   ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice) * 100
 );

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden">
       {/* Header */}
       <div className="p-4 border-b flex justify-between items-center">
         <h3 className="text-lg font-semibold">Deal Preview</h3>
         <button onClick={onClose}>
           <X size={20} />
         </button>
       </div>

       {/* Content */}
       <div className="p-6">
         <div className="mb-6">
           <img
             src={deal.imageUrl || '/api/placeholder/800/400'}
             alt={deal.title}
             className="w-full h-64 object-cover rounded-lg"
           />
         </div>

         <div className="space-y-4">
           {/* Title and Status */}
           <div className="flex justify-between items-start">
             <h2 className="text-2xl font-bold">{deal.title}</h2>
             <span className={`px-3 py-1 rounded-full text-sm ${
               deal.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
             }`}>
               {deal.isActive ? 'Active' : 'Inactive'}
             </span>
           </div>

           {/* Price Info */}
           <div className="flex items-center space-x-4">
             <div className="flex items-center">
               <DollarSign size={20} className="text-gray-500 mr-1" />
               <span className="text-3xl font-bold text-blue-600">
                 ${deal.discountedPrice}
               </span>
               <span className="ml-2 text-lg text-gray-500 line-through">
                 ${deal.originalPrice}
               </span>
             </div>
             <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
               {discountPercentage}% OFF
             </span>
           </div>

           {/* Meta Info */}
           <div className="flex space-x-4 text-sm text-gray-500">
             <div className="flex items-center">
               <Tag size={16} className="mr-1" />
               {deal.category}
             </div>
             <div className="flex items-center">
               <Clock size={16} className="mr-1" />
               Added {formatDistanceToNow(deal.createdAt?.toDate(), { addSuffix: true })}
             </div>
           </div>

           {/* Description */}
           <div>
             <h3 className="font-semibold mb-2">Description</h3>
             <p className="text-gray-600">{deal.description}</p>
           </div>

           {/* Store Link */}
           
             href={deal.storeUrl}
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center text-blue-600 hover:text-blue-800"
           >
             <ExternalLink size={16} className="mr-1" />
             View on Store
           </a>
         </div>
       </div>

       {/* Footer */}
       <div className="p-4 bg-gray-50 border-t">
         <div className="text-sm text-gray-500">
           Last updated: {formatDistanceToNow(deal.updatedAt?.toDate(), { addSuffix: true })}
         </div>
       </div>
     </div>
   </div>
 );
};

export default DealPreviewModal;