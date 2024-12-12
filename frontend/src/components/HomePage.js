// @ts-nocheck
import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { Search, Filter, Clock, User, AlertCircle, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [deals, setDeals] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Loading State Component
  const LoadingState = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-lg text-gray-600">Loading amazing deals...</p>
      </div>
    </div>
  );

  // Error State Component
  const ErrorState = ({ message }) => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-red-50 p-8 rounded-lg flex flex-col items-center gap-4 max-w-md">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-semibold text-red-700">Oops! Something went wrong</h2>
        <p className="text-red-600 text-center">{message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch deals
        const dealsResponse = await fetch('http://localhost:8080/api/deals');
        if (!dealsResponse.ok) {
          throw new Error(`Failed to fetch deals: ${dealsResponse.statusText}`);
        }
        const dealsData = await dealsResponse.json();
        
        // Fetch blogs
        const blogsResponse = await fetch('http://localhost:8080/api/blog');
        if (!blogsResponse.ok) {
          throw new Error(`Failed to fetch blogs: ${blogsResponse.statusText}`);
        }
        const blogsData = await blogsResponse.json();

        setDeals(dealsData);
        setFilteredDeals(dealsData);
        setBlogs(blogsData);
        setFilteredBlogs(blogsData);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
        // Set sample data as fallback
        setDeals([{
          id: "1",
          title: "Sample Electronics Deal",
          description: "50% off on latest gadgets",
          category: "electronics",
          originalPrice: 1000.0,
          discountedPrice: 500.0,
          storeUrl: "#"
        }]);
        setBlogs([{
          id: "1",
          title: "Best Money-Saving Tips",
          summary: "Discover the most effective strategies...",
          author: "Sarah Johnson",
          category: "Finance",
          readTime: "5 min read"
        }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredD = deals;
    let filteredB = blogs;
    
    if (selectedCategory !== 'all') {
      filteredD = filteredD.filter(deal => deal.category.toLowerCase() === selectedCategory.toLowerCase());
      filteredB = filteredB.filter(blog => blog.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredD = filteredD.filter(deal =>
        deal.title.toLowerCase().includes(term) ||
        deal.description.toLowerCase().includes(term)
      );
      filteredB = filteredB.filter(blog =>
        blog.title.toLowerCase().includes(term) ||
        blog.summary.toLowerCase().includes(term)
      );
    }
    
    setFilteredDeals(filteredD);
    setFilteredBlogs(filteredB);
  }, [searchTerm, selectedCategory, deals, blogs]);

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

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
              <option value="finance">Finance</option>
              <option value="shopping">Shopping</option>
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Deals */}
          {filteredDeals.map(deal => (
            <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={`/api/placeholder/400/200`}
                alt={deal.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600 font-medium">Deal</span>
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
          ))}

          {/* Blog Posts */}
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
                  <button
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;