import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, TrendingUp, MapPin } from 'lucide-react';
import { dummyBusinesses } from '../../data/dummyBusinesses';

export const TopBusinesses: React.FC = () => {
  const { data: businesses } = useQuery({
    queryKey: ['top-businesses'],
    queryFn: () => Promise.resolve(
      dummyBusinesses
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5)
    ),
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Top Rated Businesses</h2>
        <div className="flex items-center gap-2 text-sm text-indigo-600">
          <TrendingUp className="w-4 h-4" />
          <span>This Month</span>
        </div>
      </div>

      <div className="space-y-4">
        {businesses?.map((business) => (
          <div
            key={business.id}
            className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <img
              src={business.logo}
              alt={business.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{business.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{business.address}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-50 rounded-lg">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium text-yellow-700">{business.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};