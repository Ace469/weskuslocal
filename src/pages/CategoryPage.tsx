import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, MapPin, Search } from 'lucide-react';
import { searchBusinesses } from '../services/api';
import { SearchResults } from '../components/SearchResults';
import { Map } from '../components/Map';
import { useLocationStore } from '../store/useLocationStore';
import type { Category } from '../types/business';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: Category }>();
  const { coordinates, radius } = useLocationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredBusinessId, setHoveredBusinessId] = useState<string | null>(null);

  const { data: businesses = [], isLoading } = useQuery({
    queryKey: ['businesses', category, coordinates, radius, searchQuery],
    queryFn: () => searchBusinesses({
      lat: coordinates.lat || 40.7128,
      lng: coordinates.lng || -74.006,
      radius,
      category: category as Category,
      query: searchQuery,
    }),
    enabled: !!category,
  });

  const categoryName = category?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${categoryName}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={() => {}} // Add location modal here
              className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Change Location
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Results */}
          <div className="lg:col-span-2">
            <SearchResults 
              businesses={businesses} 
              isLoading={isLoading}
              onBusinessHover={setHoveredBusinessId}
            />
          </div>

          {/* Map */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
                <h2 className="text-lg font-semibold mb-2">Location</h2>
                <p className="text-gray-600 text-sm">
                  Showing results within {radius}km of your location
                </p>
              </div>
              <div className="h-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
                <Map 
                  businesses={businesses}
                  hoveredBusinessId={hoveredBusinessId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};