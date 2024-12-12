// src/components/admin/Settings.js
import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Settings = () => {
 const [settings, setSettings] = useState({
   minDiscount: 50,
   affiliateEnabled: true,
   autoPublish: false,
   notificationsEnabled: true,
   categories: [],
   maxDealsPerPage: 20
 });

 useEffect(() => {
   loadSettings();
 }, []);

 const loadSettings = async () => {
   const settingsDoc = await getDoc(doc(db, 'settings', 'general'));
   if (settingsDoc.exists()) {
     setSettings(settingsDoc.data());
   }
 };

 const saveSettings = async () => {
   await updateDoc(doc(db, 'settings', 'general'), settings);
 };

 return (
   <div className="max-w-4xl mx-auto p-6">
     <div className="bg-white rounded-lg shadow p-6">
       <h2 className="text-xl font-bold mb-6">Site Settings</h2>
       
       <div className="space-y-6">
         <div>
           <label className="block text-sm font-medium mb-2">
             Minimum Discount Percentage
           </label>
           <input
             type="number"
             value={settings.minDiscount}
             onChange={(e) => setSettings({...settings, minDiscount: Number(e.target.value)})}
             className="w-full p-2 border rounded"
           />
         </div>

         <div>
           <label className="block text-sm font-medium mb-2">
             Deals Per Page
           </label>
           <input
             type="number"
             value={settings.maxDealsPerPage}
             onChange={(e) => setSettings({...settings, maxDealsPerPage: Number(e.target.value)})}
             className="w-full p-2 border rounded"
           />
         </div>

         <div>
           <label className="flex items-center">
             <input
               type="checkbox"
               checked={settings.affiliateEnabled}
               onChange={(e) => setSettings({...settings, affiliateEnabled: e.target.checked})}
               className="mr-2"
             />
             Enable Affiliate Links
           </label>
         </div>

         <div>
           <label className="flex items-center">
             <input
               type="checkbox"
               checked={settings.autoPublish}
               onChange={(e) => setSettings({...settings, autoPublish: e.target.checked})}
               className="mr-2"
             />
             Auto-publish New Deals
           </label>
         </div>

         <div>
           <label className="flex items-center">
             <input
               type="checkbox"
               checked={settings.notificationsEnabled}
               onChange={(e) => setSettings({...settings, notificationsEnabled: e.target.checked})}
               className="mr-2"
             />
             Enable Push Notifications
           </label>
         </div>

         <div>
           <label className="block text-sm font-medium mb-2">
             Categories
           </label>
           <div className="flex flex-wrap gap-2">
             {settings.categories.map((category, index) => (
               <div key={index} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                 <span>{category}</span>
                 <button
                   onClick={() => {
                     const newCategories = settings.categories.filter((_, i) => i !== index);
                     setSettings({...settings, categories: newCategories});
                   }}
                   className="ml-2 text-red-500"
                 >
                   ×
                 </button>
               </div>
             ))}
             <input
               type="text"
               placeholder="Add category..."
               onKeyDown={(e) => {
                 if (e.key === 'Enter' && e.target.value) {
                   setSettings({
                     ...settings,
                     categories: [...settings.categories, e.target.value]
                   });
                   e.target.value = '';
                 }
               }}
               className="border rounded px-2 py-1"
             />
           </div>
         </div>

         <button
           onClick={saveSettings}
           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
         >
           Save Settings
         </button>
       </div>
     </div>
   </div>
 );
};

export default Settings;