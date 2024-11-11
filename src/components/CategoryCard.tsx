import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Home, Car, UtensilsCrossed } from 'lucide-react';
import type { Category } from '../types/business';

interface CategoryCardProps {
  category: Category;
  count: number;
  onClick?: () => void;
  isSelected?: boolean;
}

const getCategoryIcon = (category: Category) => {
  switch (category) {
    case 'restaurants':
      return UtensilsCrossed;
    case 'retail':
      return Store;
    case 'real-estate':
      return Home;
    case 'auto-sales':
      return Car;
  }
};

const getCategoryName = (category: Category) => {
  return category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  count, 
  onClick,
  isSelected 
}) => {
  const Icon = getCategoryIcon(category);
  
  return (
    <Link 
      to={`/category/${category}`}
      className={`block w-full bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl hover:-translate-y-1 ${
        isSelected ? 'ring-2 ring-indigo-600' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${
          isSelected ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'
        }`}>
          <Icon className="w-8 h-8" />
        </div>
        <span className="text-sm font-medium text-gray-500">{count} businesses</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 text-left">
        {getCategoryName(category)}
      </h3>
    </Link>
  );
};