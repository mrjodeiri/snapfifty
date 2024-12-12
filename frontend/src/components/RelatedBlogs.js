// src/components/RelatedBlogs.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';

const RelatedBlogs = ({ currentBlogId, category }) => {
 const { docs: blogs } = useFirestore('blogs');
 
 const relatedBlogs = blogs
   .filter(blog => blog.id !== currentBlogId && blog.category === category)
   .slice(0, 3);

 return (
   <div className="bg-white rounded-lg shadow-md p-8">
     <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
     <div className="grid md:grid-cols-3 gap-6">
       {relatedBlogs.map(blog => (
         <Link 
           to={`/blog/${blog.id}`} 
           key={blog.id}
           className="group"
         >
           <div className="bg-gray-50 rounded-lg overflow-hidden">
             <img
               src={`/api/placeholder/400/200`}
               alt={blog.title}
               className="w-full h-40 object-cover"
             />
             <div className="p-4">
               <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                 {blog.title}
               </h3>
             </div>
           </div>
         </Link>
       ))}
     </div>
   </div>
 );
};

export default RelatedBlogs;