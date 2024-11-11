import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { PromotionalBanner } from '../../../types/admin';

interface BannerEditorProps {
  banners: PromotionalBanner[];
  onChange: (banners: PromotionalBanner[]) => void;
}

export const BannerEditor: React.FC<BannerEditorProps> = ({ banners, onChange }) => {
  const handleAdd = () => {
    onChange([
      ...banners,
      {
        id: Date.now().toString(),
        title: '',
        description: '',
        image: '',
        link: '',
        active: true,
      },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(banners.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof PromotionalBanner, value: any) => {
    const newBanners = banners.map((banner, i) =>
      i === index ? { ...banner, [field]: value } : banner
    );
    onChange(newBanners);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Promotional Banners</h2>
        <button
          onClick={handleAdd}
          className="flex items-center px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Banner
        </button>
      </div>

      <div className="space-y-6">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className="border rounded-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Banner #{index + 1}</h3>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={banner.active}
                    onChange={(e) =>
                      handleChange(index, 'active', e.target.checked)
                    }
                    className="rounded text-indigo-600"
                  />
                  <span className="text-sm text-gray-600">Active</span>
                </label>
                <button
                  onClick={() => handleRemove(index)}
                  className="p-2 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={banner.title}
                  onChange={(e) =>
                    handleChange(index, 'title', e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={banner.image}
                  onChange={(e) =>
                    handleChange(index, 'image', e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={banner.description}
                  onChange={(e) =>
                    handleChange(index, 'description', e.target.value)
                  }
                  rows={2}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link URL
                </label>
                <input
                  type="text"
                  value={banner.link}
                  onChange={(e) =>
                    handleChange(index, 'link', e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};