// src/components/admin/deals/DealManagement.js
import React, { useState } from 'react';
import { useFirestore } from '../../../hooks/useFirestore';
import { useActivityLogger } from '../../../hooks/useActivityLogger';
import { db } from '../../../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { Filter, Plus, Trash2, Edit2, Eye, BarChart } from 'lucide-react';
import DealModal from './DealModal';
import DealPreviewModal from './DealPreviewModal';
import DealStats from './DealStats';

const DealManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const { docs: deals } = useFirestore('deals');
  const { logActivity } = useActivityLogger();
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [...new Set(deals.map(deal => deal.category))];

  const filteredDeals = deals
    .filter(deal => {
      const statusMatch = filter === 'all' ? true : 
        filter === 'active' ? deal.isActive :
        filter === 'expired' ? !deal.isActive :
        filter === 'pending' ? deal.isPending : true;

      const categoryMatch = categoryFilter === 'all' ? true : 
        deal.category === categoryFilter;

      return statusMatch && categoryMatch;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return b.createdAt?.toDate() - a.createdAt?.toDate();
        case 'discount':
          return ((b.originalPrice - b.discountedPrice) / b.originalPrice) - 
                 ((a.originalPrice - a.discountedPrice) / a.originalPrice);
        case 'price':
          return a.discountedPrice - b.discountedPrice;
        default:
          return 0;
      }
    });

  const handleEdit = (deal) => {
    setSelectedDeal(deal);
    setIsModalOpen(true);
  };

  const handlePreview = (deal) => {
    setSelectedDeal(deal);
    setIsPreviewOpen(true);
  };

  const handleDelete = async (deal) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await deleteDoc(doc(db, 'deals', deal.id));
        await logActivity('DELETE_DEAL', `Deleted deal: ${deal.title}`);
      } catch (error) {
        console.error('Error deleting deal:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Deal Management</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setIsStatsOpen(true)}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg flex items-center hover:bg-gray-200"
            >
              <BarChart size={20} className="mr-2" />
              Stats
            </button>
            <button
              onClick={() => {
                setSelectedDeal(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add Deal
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="newest">Newest First</option>
            <option value="discount">Highest Discount</option>
            <option value="price">Lowest Price</option>
          </select>
        </div>

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Deal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Discount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDeals.map(deal => (
              <tr key={deal.id}>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium">{deal.title}</div>
                    <div className="text-sm text-gray-500">{deal.category}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <span className="line-through text-gray-500">
                      ${deal.originalPrice}
                    </span>
                    <span className="ml-2 font-medium">
                      ${deal.discountedPrice}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-green-600 font-medium">
                    {Math.round((deal.originalPrice - deal.discountedPrice) / deal.originalPrice * 100)}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    deal.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {deal.isActive ? 'Active' : 'Expired'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handlePreview(deal)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(deal)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(deal)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <DealModal 
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDeal(null);
          }}
          editDeal={selectedDeal}
        />
        
        <DealPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setSelectedDeal(null);
          }}
          deal={selectedDeal}
        />

        <DealStats
          isOpen={isStatsOpen}
          onClose={() => setIsStatsOpen(false)}
          deals={deals}
        />
      </div>
    </div>
  );
};

export default DealManagement;