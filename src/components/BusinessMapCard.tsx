import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import type { Business } from '../types/business';

interface BusinessMapCardProps {
  business: Business;
}

export const BusinessMapCard: React.FC<BusinessMapCardProps> = ({ business }) => {
  return (
    <Link 
      to={`/business/${business.id}`}
      className="block w-64 no-underline"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="relative">
          <img 
            src={business.image} 
            alt={business.name}
            className="w-full h-32 object-cover"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-gray-700">{business.rating}</span>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-base font-semibold text-gray-900 mb-1">{business.name}</h3>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{business.address}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};