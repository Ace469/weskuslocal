import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { useLocationStore } from '../store/useLocationStore';
import { SearchLocationModal } from './SearchLocationModal';

interface LocationSearchProps {
  onSearch: (query: string) => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { coordinates, radius, setCoordinates, setRadius } = useLocationStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsModalOpen(true);
        }
      );
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for businesses..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Enter Location
            </button>
            <button
              type="button"
              onClick={handleGetLocation}
              className="flex-1 md:flex-none flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Use My Location
            </button>
          </div>
        </form>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Radius: {radius}km
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <SearchLocationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLocationSelect={setCoordinates}
      />
    </>
  );
};