// src/components/admin/UserModal.js
import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { X } from 'lucide-react';

const UserModal = ({ isOpen, onClose }) => {
 const [userData, setUserData] = useState({
   email: '',
   role: 'user',
   isActive: true
 });

 const handleSubmit = async (e) => {
   e.preventDefault();
   await addDoc(collection(db, 'users'), {
     ...userData,
     createdAt: new Date()
   });
   onClose();
 };

 if (!isOpen) return null;

 return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
     <div className="bg-white rounded-lg p-6 w-full max-w-md">
       <div className="flex justify-between items-center mb-4">
         <h3 className="text-lg font-semibold">Add New User</h3>
         <button onClick={onClose}>
           <X size={20} />
         </button>
       </div>

       <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label className="block text-sm font-medium mb-1">Email</label>
           <input
             type="email"
             value={userData.email}
             onChange={(e) => setUserData({...userData, email: e.target.value})}
             className="w-full border rounded p-2"
             required
           />
         </div>

         <div>
           <label className="block text-sm font-medium mb-1">Role</label>
           <select
             value={userData.role}
             onChange={(e) => setUserData({...userData, role: e.target.value})}
             className="w-full border rounded p-2"
           >
             <option value="user">User</option>
             <option value="admin">Admin</option>
             <option value="moderator">Moderator</option>
           </select>
         </div>

         <div className="flex items-center">
           <input
             type="checkbox"
             checked={userData.isActive}
             onChange={(e) => setUserData({...userData, isActive: e.target.checked})}
             className="mr-2"
           />
           <label>Active User</label>
         </div>

         <button
           type="submit"
           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
         >
           Add User
         </button>
       </form>
     </div>
   </div>
 );
};

export default UserModal;