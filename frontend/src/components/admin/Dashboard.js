// src/components/admin/Dashboard.js
import React from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { BarChart2, FileText, Users } from 'lucide-react';

const Dashboard = () => {
 const { docs: blogs } = useFirestore('blogs');
 const { docs: deals } = useFirestore('deals');

 const stats = {
   totalBlogs: blogs.length,
   publishedBlogs: blogs.filter(b => b.isPublished).length,
   totalDeals: deals.length,
   activeDeals: deals.filter(d => d.isActive).length,
 };

 return (
   <div className="max-w-7xl mx-auto px-4 py-6">
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
       <StatCard
         title="Active Deals"
         value={stats.activeDeals}
         total={stats.totalDeals}
         icon={<BarChart2 />}
       />
       <StatCard
         title="Published Blogs"
         value={stats.publishedBlogs}
         total={stats.totalBlogs}
         icon={<FileText />}
       />
       <StatCard
         title="Conversion Rate"
         value="12.5%"
         icon={<Users />}
       />
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <RecentBlogs blogs={blogs.slice(0, 5)} />
       <TopDeals deals={deals.slice(0, 5)} />
     </div>
   </div>
 );
};

const StatCard = ({ title, value, total, icon }) => (
 <div className="bg-white p-6 rounded-lg shadow">
   <div className="flex items-center justify-between mb-4">
     <h3 className="text-gray-500">{title}</h3>
     <span className="text-blue-600">{icon}</span>
   </div>
   <div className="text-3xl font-bold">{value}</div>
   {total && (
     <div className="text-sm text-gray-500">
       of {total} total
     </div>
   )}
 </div>
);

const RecentBlogs = ({ blogs }) => (
 <div className="bg-white p-6 rounded-lg shadow">
   <h3 className="text-lg font-semibold mb-4">Recent Blog Posts</h3>
   <div className="space-y-4">
     {blogs.map(blog => (
       <div key={blog.id} className="flex justify-between items-center">
         <div>
           <div className="font-medium">{blog.title}</div>
           <div className="text-sm text-gray-500">{blog.author}</div>
         </div>
         <span className={`px-2 py-1 rounded text-sm ${
           blog.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
         }`}>
           {blog.isPublished ? 'Published' : 'Draft'}
         </span>
       </div>
     ))}
   </div>
 </div>
);

const TopDeals = ({ deals }) => (
 <div className="bg-white p-6 rounded-lg shadow">
   <h3 className="text-lg font-semibold mb-4">Top Performing Deals</h3>
   <div className="space-y-4">
     {deals.map(deal => (
       <div key={deal.id} className="flex justify-between items-center">
         <div>
           <div className="font-medium">{deal.title}</div>
           <div className="text-sm text-gray-500">{deal.category}</div>
         </div>
         <div className="text-green-600 font-medium">
           {Math.round((deal.originalPrice - deal.discountedPrice) / deal.originalPrice * 100)}% OFF
         </div>
       </div>
     ))}
   </div>
 </div>
);

export default Dashboard;