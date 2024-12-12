import React from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { Clock, User } from 'lucide-react';

const BlogList = () => {
  const { docs: blogs, loading, error } = useFirestore('blogs');

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map(blog => (
        <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={`/api/placeholder/400/200`}
            alt={blog.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-purple-600 font-medium">{blog.category}</span>
              <span className="text-sm text-gray-500 flex items-center">
                <Clock size={14} className="mr-1" />
                {blog.readTime}
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">{blog.summary}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-500">
                <User size={14} className="mr-1" />
                {blog.author}
              </div>
              <Link 
                to={`/blog/${blog.id}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;