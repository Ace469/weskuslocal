import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Image, Upload } from 'lucide-react';

export const ImageUpload: React.FC = () => {
  const { register, watch, setValue } = useFormContext();
  const logo = watch('logo');
  const coverPhoto = watch('coverPhoto');
  const image = watch('image');

  const handleImageUpload = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(field, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Image className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-900">Images</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Logo
          </label>
          <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-indigo-500">
            {logo ? (
              <img src={logo} alt="Logo preview" className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Upload logo</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload('logo')}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Cover Photo Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Photo
          </label>
          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-indigo-500">
            {coverPhoto ? (
              <img src={coverPhoto} alt="Cover preview" className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Upload cover photo</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload('coverPhoto')}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Additional Photos */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Photos
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-indigo-500">
              {image ? (
                <img src={image} alt="Additional preview" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">Add photo</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload('image')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};