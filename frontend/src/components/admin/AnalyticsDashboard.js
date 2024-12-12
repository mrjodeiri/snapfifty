// src/components/admin/AnalyticsDashboard.js
import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, MousePointer, Users } from 'lucide-react';

const AnalyticsDashboard = () => {
 const [analyticsData, setAnalyticsData] = useState({
   dealClicks: [],
   revenue: [],
   topDeals: []
 });

 useEffect(() => {
   const fetchAnalytics = async () => {
     const dealsRef = collection(db, 'deals');
     const dealsQuery = query(dealsRef, orderBy('clicks', 'desc'), limit(5));
     const dealsSnapshot = await getDocs(dealsQuery);
     
     const topDeals = dealsSnapshot.docs.map(doc => ({
       id: doc.id,
       ...doc.data()
     }));

     setAnalyticsData({
       dealClicks: generateClicksData(),
       revenue: generateRevenueData(),
       topDeals
     });
   };

   fetchAnalytics();
 }, []);

 return (
   <div className="max-w-7xl mx-auto p-6">
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
       <MetricCard
         title="Total Clicks"
         value="1,234"
         change="+12.3%"
         icon={<MousePointer />}
       />
       <MetricCard
         title="Revenue"
         value="$5,678"
         change="+8.4%"
         icon={<DollarSign />}
       />
       <MetricCard
         title="Conversion Rate"
         value="3.2%"
         change="+1.5%"
         icon={<TrendingUp />}
       />
       <MetricCard
         title="Active Users"
         value="892"
         change="+15.7%"
         icon={<Users />}
       />
     </div>

     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <ChartCard
         title="Deal Clicks"
         data={analyticsData.dealClicks}
         dataKey="clicks"
       />
       <ChartCard
         title="Revenue"
         data={analyticsData.revenue}
         dataKey="amount"
       />
     </div>

     <div className="mt-8">
       <TopDealsTable deals={analyticsData.topDeals} />
     </div>
   </div>
 );
};

const MetricCard = ({ title, value, change, icon }) => (
 <div className="bg-white p-6 rounded-lg shadow">
   <div className="flex justify-between items-center mb-4">
     <h3 className="text-gray-500">{title}</h3>
     <span className="text-blue-600">{icon}</span>
   </div>
   <div className="text-3xl font-bold mb-2">{value}</div>
   <div className={`text-sm ${
     change.startsWith('+') ? 'text-green-600' : 'text-red-600'
   }`}>
     {change} from last month
   </div>
 </div>
);

const ChartCard = ({ title, data, dataKey }) => (
 <div className="bg-white p-6 rounded-lg shadow">
   <h3 className="text-lg font-semibold mb-4">{title}</h3>
   <div className="h-64">
     <ResponsiveContainer width="100%" height="100%">
       <LineChart data={data}>
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="name" />
         <YAxis />
         <Tooltip />
         <Line type="monotone" dataKey={dataKey} stroke="#3B82F6" />
       </LineChart>
     </ResponsiveContainer>
   </div>
 </div>
);

const TopDealsTable = ({ deals }) => (
 <div className="bg-white rounded-lg shadow overflow-hidden">
   <h3 className="text-lg font-semibold p-6">Top Performing Deals</h3>
   <table className="w-full">
     <thead className="bg-gray-50">
       <tr>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deal</th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clicks</th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Conversion</th>
       </tr>
     </thead>
     <tbody className="divide-y divide-gray-200">
       {deals.map(deal => (
         <tr key={deal.id}>
           <td className="px-6 py-4">{deal.title}</td>
           <td className="px-6 py-4">{deal.clicks}</td>
           <td className="px-6 py-4">${(deal.clicks * 0.5).toFixed(2)}</td>
           <td className="px-6 py-4">{((deal.clicks * 0.03) * 100).toFixed(1)}%</td>
         </tr>
       ))}
     </tbody>
   </table>
 </div>
);

// Helper functions for demo data
const generateClicksData = () => {
 const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
 return days.map(day => ({
   name: day,
   clicks: Math.floor(Math.random() * 100) + 50
 }));
};

const generateRevenueData = () => {
 const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
 return days.map(day => ({
   name: day,
   amount: Math.floor(Math.random() * 1000) + 500
 }));
};

export default AnalyticsDashboard;