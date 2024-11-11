import React from 'react';
import { Image, Type, AlignLeft } from 'lucide-react';
import type { HeroSection } from '../../../types/admin';

interface HeroEditorProps {
  config?: HeroSection;
  onChange: (config: HeroSection) => void;
}

export const HeroEditor: React.FC<HeroEditorProps> = ({ config, onChange }) => {
  const handleChange = (field: keyof HeroSection, value: string) => {
    onChange({
      ...config!,
      [field]: value,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Image URL
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              value={config?.backgroundImage}
              onChange={(e) => handleChange('backgroundImage', e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="https://unsplash.com/..."
            />
            {config?.backgroundImage && (
              <img
                src={config.backgroundImage}
                alt="Hero background preview"
                className="w-16 h-16 rounded object-cover"
              />
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Heading
          </label>
          <input
            type="text"
            value={config?.heading}
            onChange={(e) => handleChange('heading', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subheading
          </label>
          <input
            type="text"
            value={config?.subheading}
            onChange={(e) => handleChange('subheading', e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 pt-4">
          <div className="w-32 h-20 bg-gray-100 rounded flex items-center justify-center">
            <Image className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">Preview</h3>
            <p className="text-sm text-gray-500">
              Changes will be reflected on the landing page after saving
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};