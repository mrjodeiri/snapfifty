// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { 
 signInWithEmailAndPassword,
 signOut,
 onAuthStateChanged 
} from 'firebase/auth';

export const useAuth = () => {
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, user => {
     setUser(user);
     setLoading(false);
   });
   return unsubscribe;
 }, []);

 const login = async (email, password) => {
   return signInWithEmailAndPassword(auth, email, password);
 };

 const logout = () => signOut(auth);

 return { user, loading, login, logout };
};

// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
 const { user, loading } = useAuth();

 if (loading) return <div>Loading...</div>;
 if (!user) return <Navigate to="/login" />;

 return children;
};

// src/components/admin/Login.js
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const { login } = useAuth();
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     await login(email, password);
     navigate('/admin');
   } catch (error) {
     setError('Invalid credentials');
   }
 };

 return (
   <div className="min-h-screen bg-gray-100 flex items-center justify-center">
     <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
       <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
       {error && (
         <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
           {error}
         </div>
       )}
       <form onSubmit={handleSubmit} className="space-y-4">
         <input
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           placeholder="Email"
           className="w-full p-2 border rounded"
         />
         <input
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           placeholder="Password"
           className="w-full p-2 border rounded"
         />
         <button
           type="submit"
           className="w-full bg-blue-600 text-white p-2 rounded"
         >
           Login
         </button>
       </form>
     </div>
   </div>
 );
};

// Update App.js
function App() {
 return (
   <AuthProvider>
     <Router>
       <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/blog/:id" element={<BlogDetail />} />
         <Route path="/login" element={<Login />} />
         <Route path="/admin" element={
           <ProtectedRoute>
             <AdminLayout />
           </ProtectedRoute>
         }>
           <Route path="blogs" element={<BlogManager />} />
           <Route path="blogs/new" element={<BlogEditor />} />
         </Route>
       </Routes>
     </Router>
   </AuthProvider>
 );
}