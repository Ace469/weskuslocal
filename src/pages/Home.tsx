import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Building2, Briefcase, CalendarDays, Car } from 'lucide-react';
import { LocationSearch } from '../components/LocationSearch';
import { CategoryCard } from '../components/CategoryCard';
import { SearchResults } from '../components/SearchResults';
import { Map } from '../components/Map';
import { useLocationStore } from '../store/useLocationStore';
import { searchBusinesses } from '../services/api';
import { dummyBusinesses } from '../data/dummyBusinesses';
import type { Business, Category } from '../types/business';

const categories: { type: Category; icon: any; image: string }[] = [
  { type: 'restaurants', icon: Building2, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80' },
  { type: 'retail', icon: Briefcase, image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80' },
  { type: 'real-estate', icon: CalendarDays, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80' },
  { type: 'auto-sales', icon: Car, image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80' },
];

export const Home: React.FC = () => {
  const { coordinates, radius } = useLocationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [hoveredBusinessId, setHoveredBusinessId] = useState<string | null>(null);

  const { data: businesses = [], isLoading } = useQuery({
    queryKey: ['businesses', coordinates, radius, searchQuery, selectedCategory],
    queryFn: () => searchBusinesses({
      lat: coordinates.lat || 40.7128,
      lng: coordinates.lng || -74.006,
      radius,
      query: searchQuery,
      category: selectedCategory || undefined,
    }),
  });

  const categoryCount = (type: Category) => {
    return dummyBusinesses.filter(b => b.category === type).length;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1596443686812-2f45229eebc3?auto=format&fit=crop&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Discover Local Businesses
            </h1>
            <p className="text-xl text-gray-200 mb-12 max-w-2xl">
              Find the best local businesses in your area
            </p>

            {/* Search Component */}
            <LocationSearch onSearch={setSearchQuery} />
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 text-center mb-12">Find what you're looking for</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.type}
                category={category.type}
                count={categoryCount(category.type)}
                onClick={() => setSelectedCategory(category.type)}
                isSelected={selectedCategory === category.type}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {selectedCategory 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Businesses`
                : 'Featured Businesses'}
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear Filter
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SearchResults 
                businesses={businesses} 
                isLoading={isLoading}
                onBusinessHover={setHoveredBusinessId}
              />
            </div>
            <div className="h-[600px] lg:sticky lg:top-4">
              <Map 
                businesses={businesses}
                hoveredBusinessId={hoveredBusinessId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};