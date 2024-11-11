import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface SearchLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (lat: number, lng: number) => void;
}

export const SearchLocationModal: React.FC<SearchLocationModalProps> = ({
  isOpen,
  onClose,
  onLocationSelect,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!isOpen || !inputRef.current) return;

    const options = {
      types: ['(cities)'],
      fields: ['geometry.location', 'formatted_address'],
    };

    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();
      if (place?.geometry?.location) {
        onLocationSelect(
          place.geometry.location.lat(),
          place.geometry.location.lng()
        );
        onClose();
      }
    });

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isOpen, onLocationSelect, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Enter Location</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter city or address..."
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          autoFocus
        />
        <p className="mt-2 text-sm text-gray-500">
          Start typing to see location suggestions
        </p>
      </div>
    </div>
  );
};