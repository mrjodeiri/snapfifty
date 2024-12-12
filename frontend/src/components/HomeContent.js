import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, User } from 'lucide-react';
import { format } from 'date-fns';

const HomeContent = () => {
  const [deals, setDeals] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredContent, setFilteredContent] = useState({ deals: [], posts: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [contentType, setContentType] = useState('all'); // 'all', 'deals', 'blogs'

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/deals');
        const data = await response.json();
        setDeals(data);
      } catch (error) {
        console.error('Error fetching deals:', error);
      }
    };

    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/blog');
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchDeals();
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    let filteredDeals = deals;
    let filteredPosts = blogPosts;

    // Apply category filter
    if (selectedCategory !== 'all') {
      filteredDeals = filteredDeals.filter(deal => deal.category === selectedCategory);
      filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredDeals = filteredDeals.filter(deal =>
        deal.title.toLowerCase().includes(term) ||
        deal.description.toLowerCase().includes(term)
      );
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(term) ||
        post.summary.toLowerCase().includes(term)
      );
    }

    // Apply content type filter
    if (contentType === 'deals') {
      filteredPosts = [];
    } else if (contentType === 'blogs') {
      filteredDeals = [];
    }

    setFilteredContent({ deals: filteredDeals, posts: filteredPosts });
  }, [searchTerm, selectedCategory, contentType, deals, blogPosts]);

  const DealCard = ({ deal }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={`/api/placeholder/400/200`}
        alt={deal.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 font-medium">{deal.category}</span>
          <span className="text-sm text-green-600 font-bold">50% OFF</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">{deal.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{deal.description}</p>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-400 line-through">${deal.originalPrice}</span>
            <span className="text-2xl font-bold text-green-600 ml-2">
              ${deal.discountedPrice}
            </span>
          </div>
          <a
            href={deal.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Deal
          </a>
        </div>
      </div>
    </div>
  );

  const BlogCard = ({ post }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={`/api/placeholder/400/200`}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-purple-600 font-medium">{post.category}</span>
          <span className="text-sm text-gray-500 flex items-center">
            <Clock size={14} className="mr-1" />
            {post.readTime}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.summary}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <User size={14} className="mr-1" />
            {post.author}
          </div>
          <a
            href={`/blog/${post.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">SnapFifty</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search deals and articles..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <Filter size={20} className="text-gray-600" />
              <select
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="home">Home</option>
                <option value="beauty">Beauty</option>
              </select>
            </div>
            
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
            >
              <option value="all">All Content</option>
              <option value="deals">Deals Only</option>
              <option value="blogs">Blogs Only</option>
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.deals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
          {filteredContent.posts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeContent;