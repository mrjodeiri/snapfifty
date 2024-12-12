// src/components/admin/deals/DealStats.js
import React from 'react';
import { X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DealStats = ({ isOpen, onClose, deals }) => {
 if (!isOpen) return null;

 const stats = {
   totalDeals: deals.length,
   activeDeals: deals.filter(d => d.isActive).length,
   averageDiscount: deals.reduce((acc, deal) => {
     return acc + ((deal.originalPrice - deal.discountedPrice) / deal.originalPrice * 100);
   }, 0) / deals.length,
   totalSavings: deals.reduce((acc, deal) => {
     return acc + (deal.originalPrice - deal.discountedPrice);
   }, 0),
   categoryBreakdown: deals.reduce((acc, deal) => {
     acc[deal.category] = (acc[deal.category] || 0) + 1;
     return acc;
   }, {})
 };

 const chartData = Object.entries(stats.categoryBreakdown).map(([category, count]) => ({
   name: category,
   deals: count
 }));

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
       <div className="flex justify-between items-center mb-6">
         <h3 className="text-lg font-semibold">Deal Statistics</h3>
         <button onClick={onClose}>
           <X size={20} />
         </button>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
         <StatCard
           title="Total Deals"
           value={stats.totalDeals}
         />
         <StatCard
           title="Active Deals"
           value={stats.activeDeals}
           subtitle={`${Math.round(stats.activeDeals/stats.totalDeals*100)}%`}
         />
         <StatCard
           title="Avg. Discount"
           value={`${Math.round(stats.averageDiscount)}%`}
         />
         <StatCard
           title="Total Savings"
           value={`$${Math.round(stats.totalSavings).toLocaleString()}`}
         />
       </div>

       <div className="mb-8">
         <h4 className="text-lg font-semibold mb-4">Deals by Category</h4>
         <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={chartData}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="name" />
               <YAxis />
               <Tooltip />
               <Line 
                 type="monotone" 
                 dataKey="deals" 
                 stroke="#3B82F6" 
                 strokeWidth={2}
               />
             </LineChart>
           </ResponsiveContainer>
         </div>
       </div>

       <div>
         <h4 className="text-lg font-semibold mb-4">Category Breakdown</h4>
         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
           {Object.entries(stats.categoryBreakdown).map(([category, count]) => (
             <div 
               key={category}
               className="bg-gray-50 p-4 rounded-lg"
             >
               <div className="font-medium capitalize">{category}</div>
               <div className="text-2xl font-bold">{count}</div>
               <div className="text-sm text-gray-500">
                 {Math.round(count/stats.totalDeals*100)}% of total
               </div>
             </div>
           ))}
         </div>
       </div>
     </div>
   </div>
 );
};

const StatCard = ({ title, value, subtitle }) => (
 <div className="bg-gray-50 p-4 rounded-lg">
   <div className="text-sm text-gray-500 mb-1">{title}</div>
   <div className="text-2xl font-bold">{value}</div>
   {subtitle && <div className="text-sm text-gray-500">{subtitle}</div>}
 </div>
);

export default DealStats;