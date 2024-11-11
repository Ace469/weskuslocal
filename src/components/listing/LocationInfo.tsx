import React from 'react';
import { useFormContext } from 'react-hook-form';
import { MapPin } from 'lucide-react';
import { Map } from '../Map';

export const LocationInfo: React.FC = () => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const coordinates = watch('coordinates');

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setValue('coordinates', {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-900">Location</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            {...register('address', { required: 'Address is required' })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your business address"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">{errors.address.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pin Location on Map
          </label>
          <div className="h-[300px] rounded-lg overflow-hidden">
            <Map
              businesses={[]}
              center={coordinates}
              onClick={handleMapClick}
              showPin
            />
          </div>
        </div>
      </div>
    </div>
  );
};