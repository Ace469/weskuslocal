import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, MapPin, Star, Edit, Trash2, Eye } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { ListingPreviewModal } from '../../components/admin/listings/ListingPreviewModal';
import { ListingEditModal } from '../../components/admin/listings/ListingEditModal';
import { dummyBusinesses } from '../../data/dummyBusinesses';
import type { Business, Category } from '../../types/business';

const categories: Category[] = ['restaurants', 'retail', 'real-estate', 'auto-sales'];

export const AdminBusinesses: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'newest'>('newest');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: businesses } = useQuery({
    queryKey: ['admin-businesses', search, selectedCategory, sortBy],
    queryFn: () => {
      let filtered = [...dummyBusinesses];

      if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(
          business => 
            business.name.toLowerCase().includes(searchLower) ||
            business.description.toLowerCase().includes(searchLower)
        );
      }

      if (selectedCategory !== 'all') {
        filtered = filtered.filter(business => business.category === selectedCategory);
      }

      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return parseInt(b.id) - parseInt(a.id);
          default:
            return 0;
        }
      });

      return filtered;
    },
  });

  const handleDelete = (id: string) => {
    console.log('Delete business:', id);
    // Implement delete functionality
  };

  const handleEdit = (business: Business) => {
    setSelectedBusiness(business);
    setIsEditOpen(true);
  };

  const handleView = (business: Business) => {
    setSelectedBusiness(business);
    setIsPreviewOpen(true);
  };

  const handleSave = (updatedBusiness: Business) => {
    console.log('Save business:', updatedBusiness);
    // Implement save functionality
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Business Listings</h1>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Add New Business
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search businesses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category | 'all')}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'rating' | 'newest')}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="newest">Newest First</option>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Business Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {businesses?.map((business) => (
                  <tr key={business.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={business.logo}
                          alt={business.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{business.name}</div>
                          <div className="text-sm text-gray-500">{business.contact?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {business.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {business.address}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1">{business.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleView(business)}
                          className="p-1 text-gray-400 hover:text-indigo-600"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(business)}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(business.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Preview Modal */}
        {selectedBusiness && (
          <ListingPreviewModal
            isOpen={isPreviewOpen}
            onClose={() => {
              setIsPreviewOpen(false);
              setSelectedBusiness(null);
            }}
            business={selectedBusiness}
          />
        )}

        {/* Edit Modal */}
        {selectedBusiness && (
          <ListingEditModal
            isOpen={isEditOpen}
            onClose={() => {
              setIsEditOpen(false);
              setSelectedBusiness(null);
            }}
            business={selectedBusiness}
            onSave={handleSave}
          />
        )}
      </div>
    </AdminLayout>
  );
};