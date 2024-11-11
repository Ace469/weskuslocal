import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Store, Home, UtensilsCrossed, Car } from 'lucide-react';
import type { Category } from '../../types/business';

const categories: { value: Category; label: string; icon: any }[] = [
  { value: 'restaurants', label: 'Restaurant', icon: UtensilsCrossed },
  { value: 'retail', label: 'Retail', icon: Store },
  { value: 'real-estate', label: 'Real Estate', icon: Home },
  { value: 'auto-sales', label: 'Auto Sales', icon: Car },
];

export const BasicInfo: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Name
          </label>
          <input
            type="text"
            {...register('name', { required: 'Business name is required' })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your business name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map(({ value, label, icon: Icon }) => (
              <label
                key={value}
                className="relative flex flex-col items-center gap-2 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  {...register('category')}
                  value={value}
                  className="sr-only"
                />
                <Icon className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">{label}</span>
                <span className="absolute inset-0 rounded-lg ring-2 ring-transparent peer-checked:ring-indigo-600" />
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your business..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message as string}</p>
          )}
        </div>
      </div>
    </div>
  );
};