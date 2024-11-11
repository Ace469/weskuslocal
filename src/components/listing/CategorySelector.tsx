import React from 'react';
import { Store, Home, Car, UtensilsCrossed } from 'lucide-react';
import type { Category } from '../../types/business';

interface CategorySelectorProps {
  value?: Category;
  onChange: (category: Category) => void;
}

const categories: { type: Category; icon: any; label: string }[] = [
  { type: 'restaurants', icon: UtensilsCrossed, label: 'Restaurant' },
  { type: 'retail', icon: Store, label: 'Retail' },
  { type: 'real-estate', icon: Home, label: 'Real Estate' },
  { type: 'auto-sales', icon: Car, label: 'Auto Sales' },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map(({ type, icon: Icon, label }) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
            value === type
              ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
              : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50'
          }`}
        >
          <Icon className="w-8 h-8 mb-2" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};