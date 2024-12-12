// src/components/BlogDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';
import { Clock, User, Share2, ArrowLeft, Star } from 'lucide-react';

const BlogDetail = () => {
 const { id } = useParams();
 const { docs: blogs, loading } = useFirestore('blogs');
 const [relatedBlogs, setRelatedBlogs] = useState([]);

 const blog = blogs.find(b => b.id === id);

 useEffect(() => {
   if (blog) {
     const related = blogs
       .filter(b => b.id !== id && b.category === blog.category)
       .slice(0, 3);
     setRelatedBlogs(related);
   }
 }, [blog, blogs, id]);

 if (loading) {
   return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
       <div className="text-2xl text-blue-600">Loading...</div>
     </div>
   );
 }

 if (!blog) {
   return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
       <div className="bg-white p-8 rounded-lg shadow-md text-center">
         <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
         <Link to="/" className="text-blue-600 hover:text-blue-800">
           Return to Homepage
         </Link>
       </div>
     </div>
   );
 }

 const handleShare = () => {
   if (navigator.share) {
     navigator.share({
       title: blog.title,
       text: blog.summary,
       url: window.location.href
     });
   }
 };

 return (
   <div className="min-h-screen bg-gray-100">
     <div className="max-w-4xl mx-auto px-4 py-8">
       {/* Back Button */}
       <Link to="/" className="flex items-center text-gray-600 mb-8 hover:text-blue-600">
         <ArrowLeft size={20} className="mr-2" />
         Back to Home
       </Link>

       {/* Blog Header */}
       <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
         <img
           src={`/api/placeholder/800/400`}
           alt={blog.title}
           className="w-full h-64 object-cover"
         />
         
         <div className="p-8">
           <div className="flex items-center justify-between mb-4">
             <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
               {blog.category}
             </span>
             <button 
               onClick={handleShare}
               className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
             >
               <Share2 size={20} />
             </button>
           </div>

           <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>

           <div className="flex items-center text-gray-600 mb-8">
             <div className="flex items-center mr-6">
               <User size={16} className="mr-2" />
               <span>{blog.author}</span>
             </div>
             <div className="flex items-center mr-6">
               <Clock size={16} className="mr-2" />
               <span>{blog.readTime}</span>
             </div>
             <div className="flex items-center">
               <Star size={16} className="mr-2 text-yellow-400" />
               <span>Featured Post</span>
             </div>
           </div>

           {/* Blog Content */}
           <div className="prose max-w-none">
             {blog.content}
           </div>
         </div>
       </div>

       {/* Related Posts */}
       {relatedBlogs.length > 0 && (
         <div className="bg-white rounded-lg shadow-md p-8">
           <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
           <div className="grid md:grid-cols-3 gap-6">
             {relatedBlogs.map(relatedBlog => (
               <Link 
                 to={`/blog/${relatedBlog.id}`} 
                 key={relatedBlog.id}
                 className="group"
               >
                 <div className="bg-gray-50 rounded-lg overflow-hidden">
                   <img
                     src={`/api/placeholder/400/200`}
                     alt={relatedBlog.title}
                     className="w-full h-40 object-cover"
                   />
                   <div className="p-4">
                     <span className="text-sm text-purple-600 mb-2 block">
                       {relatedBlog.category}
                     </span>
                     <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                       {relatedBlog.title}
                     </h3>
                     <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                       {relatedBlog.summary}
                     </p>
                   </div>
                 </div>
               </Link>
             ))}
           </div>
         </div>
       )}
     </div>
   </div>
 );
};

export default BlogDetail;