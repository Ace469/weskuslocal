import React, { useState } from 'react';
import { BusinessCard } from './BusinessCard';
import type { Business } from '../types/business';

interface SearchResultsProps {
  businesses: Business[];
  isLoading: boolean;
  onBusinessHover?: (businessId: string | null) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ 
  businesses = [], 
  isLoading,
  onBusinessHover 
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-t-xl" />
            <div className="bg-white p-5 rounded-b-xl">
              <div className="h-6 bg-gray-200 rounded mb-4" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!Array.isArray(businesses) || businesses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No businesses found matching your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {businesses.map((business) => (
        <BusinessCard 
          key={business.id} 
          business={business}
          onHover={(isHovered) => onBusinessHover?.(isHovered ? business.id : null)}
        />
      ))}
    </div>
  );
};