// Update existing components to include activity tracking:

// src/hooks/useActivityLogger.js
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useActivityLogger = () => {
 const logActivity = async (action, details, userId = null) => {
   await addDoc(collection(db, 'activity_logs'), {
     action,
     details,
     userId,
     timestamp: serverTimestamp()
   });
 };
 return { logActivity };
};

// Update UserManagement.js actions
const UserManagement = () => {
 const { logActivity } = useActivityLogger();

 const updateUserRole = async (userId, role) => {
   await updateDoc(doc(db, 'users', userId), { role });
   await logActivity('UPDATE_USER_ROLE', `Changed user ${userId} role to ${role}`);
   fetchUsers();
 };

 const deleteUser = async (userId) => {
   if (window.confirm('Are you sure?')) {
     await deleteDoc(doc(db, 'users', userId));
     await logActivity('DELETE_USER', `Deleted user ${userId}`);
     fetchUsers();
   }
 };
};

// Update BlogEditor.js
const BlogEditor = () => {
 const { logActivity } = useActivityLogger();

 const handleSubmit = async (e) => {
   e.preventDefault();
   const docRef = await addDoc(collection(db, 'blogs'), blogData);
   await logActivity('CREATE_BLOG', `Created blog post: ${blogData.title}`);
 };
};