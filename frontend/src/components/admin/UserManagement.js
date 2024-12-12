// Update UserManagement.js
import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { UserPlus, User, Shield, Trash2 } from 'lucide-react';
import UserModal from './UserModal';

const UserManagement = () => {
 const [users, setUsers] = useState([]);
 const [isModalOpen, setIsModalOpen] = useState(false);

 useEffect(() => {
   fetchUsers();
 }, []);

 const fetchUsers = async () => {
   const querySnapshot = await getDocs(collection(db, 'users'));
   setUsers(querySnapshot.docs.map(doc => ({
     id: doc.id,
     ...doc.data()
   })));
 };

 const updateUserRole = async (userId, role) => {
   await updateDoc(doc(db, 'users', userId), { role });
   fetchUsers();
 };

 const deleteUser = async (userId) => {
   if (window.confirm('Are you sure you want to delete this user?')) {
     await deleteDoc(doc(db, 'users', userId));
     fetchUsers();
   }
 };

 return (
   <div className="max-w-6xl mx-auto p-6">
     <div className="bg-white rounded-lg shadow p-6">
       <div className="flex justify-between items-center mb-6">
         <h2 className="text-xl font-bold">User Management</h2>
         <button
           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
           onClick={() => setIsModalOpen(true)}
         >
           <UserPlus size={20} className="mr-2" />
           Add User
         </button>
       </div>

       <table className="w-full">
         <thead className="bg-gray-50">
           <tr>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
           </tr>
         </thead>
         <tbody className="divide-y divide-gray-200">
           {users.map(user => (
             <tr key={user.id}>
               <td className="px-6 py-4">
                 <div className="flex items-center">
                   <User size={20} className="mr-2 text-gray-400" />
                   <div>
                     <div className="font-medium">{user.email}</div>
                     <div className="text-sm text-gray-500">ID: {user.id}</div>
                   </div>
                 </div>
               </td>
               <td className="px-6 py-4">
                 <select
                   value={user.role}
                   onChange={(e) => updateUserRole(user.id, e.target.value)}
                   className="border rounded px-2 py-1"
                 >
                   <option value="user">User</option>
                   <option value="admin">Admin</option>
                   <option value="moderator">Moderator</option>
                 </select>
               </td>
               <td className="px-6 py-4">
                 <span className={`px-2 py-1 rounded-full text-sm ${
                   user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                 }`}>
                   {user.isActive ? 'Active' : 'Inactive'}
                 </span>
               </td>
               <td className="px-6 py-4">
                 <button
                   onClick={() => deleteUser(user.id)}
                   className="text-red-600 hover:text-red-800"
                 >
                   <Trash2 size={20} />
                 </button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>

     <UserModal 
       isOpen={isModalOpen} 
       onClose={() => {
         setIsModalOpen(false);
         fetchUsers();
       }}
     />
   </div>
 );
};

export default UserManagement;