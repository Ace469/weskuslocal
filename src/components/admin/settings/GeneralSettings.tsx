import React from 'react';
import { useForm } from 'react-hook-form';
import { Globe, MapPin } from 'lucide-react';

interface GeneralSettingsForm {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  timezone: string;
  defaultLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  defaultRadius: number;
}

export const GeneralSettings: React.FC = () => {
  const { register, handleSubmit } = useForm<GeneralSettingsForm>({
    defaultValues: {
      siteName: 'LocalBiz',
      siteDescription: 'Discover and connect with local businesses in your area',
      contactEmail: 'contact@localbiz.com',
      timezone: 'America/New_York',
      defaultLocation: {
        lat: 40.7128,
        lng: -74.006,
        address: 'New York, NY, USA',
      },
      defaultRadius: 20,
    },
  });

  const onSubmit = (data: GeneralSettingsForm) => {
    console.log('Saving general settings:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site Name
            </label>
            <input
              type="text"
              {...register('siteName')}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site Description
            </label>
            <textarea
              {...register('siteDescription')}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              {...register('contactEmail')}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Timezone
            </label>
            <select
              {...register('timezone')}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Default Search Radius (km)
            </label>
            <input
              type="number"
              {...register('defaultRadius')}
              min={1}
              max={100}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};