import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Package, Plus, Trash2, Upload, X } from 'lucide-react';

export const ProductsServices: React.FC = () => {
  const { register, control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });

  const handleImageUpload = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue(`products.${index}.image`, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setValue(`products.${index}.image`, undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Products & Services</h2>
        </div>
        <button
          type="button"
          onClick={() => append({ name: '', price: 0, description: '', image: undefined })}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => {
          const image = watch(`products.${index}.image`);
          
          return (
            <div key={field.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex gap-4">
                {/* Image Upload */}
                <div className="w-32 flex-shrink-0">
                  <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-indigo-500">
                    {image ? (
                      <div className="relative group">
                        <img 
                          src={image} 
                          alt="Product" 
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Upload className="w-6 h-6 text-gray-400" />
                        <p className="mt-1 text-xs text-gray-500">Add photo</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload(index)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      {...register(`products.${index}.name`)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register(`products.${index}.price`)}
                        className="w-full pl-7 pr-3 py-2 border rounded-lg"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      {...register(`products.${index}.description`)}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Brief description"
                    />
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-gray-400 hover:text-red-600 self-start"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}

        {fields.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">
              No products or services added yet
            </p>
            <button
              type="button"
              onClick={() => append({ name: '', price: 0, description: '', image: undefined })}
              className="mt-4 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700"
            >
              Add your first item
            </button>
          </div>
        )}
      </div>
    </div>
  );
};