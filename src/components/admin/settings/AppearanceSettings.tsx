import React from 'react';
import { useForm } from 'react-hook-form';
import { Palette, Image } from 'lucide-react';

interface AppearanceSettingsForm {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  logo: string;
  favicon: string;
  darkMode: boolean;
}

export const AppearanceSettings: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<AppearanceSettingsForm>({
    defaultValues: {
      primaryColor: '#4F46E5',
      secondaryColor: '#1F2937',
      accentColor: '#10B981',
      fontFamily: 'inter',
      logo: '',
      favicon: '',
      darkMode: false,
    },
  });

  const onSubmit = (data: AppearanceSettingsForm) => {
    console.log('Saving appearance settings:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Appearance Settings</h2>
        
        <div className="space-y-6">
          {/* Colors */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Brand Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Primary Color</label>
                <input
                  type="color"
                  {...register('primaryColor')}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Secondary Color</label>
                <input
                  type="color"
                  {...register('secondaryColor')}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Accent Color</label>
                <input
                  type="color"
                  {...register('accentColor')}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Typography</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Font Family</label>
              <select
                {...register('fontFamily')}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              >
                <option value="inter">Inter</option>
                <option value="roboto">Roboto</option>
                <option value="opensans">Open Sans</option>
                <option value="poppins">Poppins</option>
              </select>
            </div>
          </div>

          {/* Logo & Favicon */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Branding</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="flex-1 px-4 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Favicon</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="flex-1 px-4 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Theme Mode */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Theme</h3>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('darkMode')}
                className="rounded text-indigo-600"
              />
              <span className="text-sm text-gray-600">Enable Dark Mode</span>
            </label>
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