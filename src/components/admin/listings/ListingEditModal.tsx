import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { X } from 'lucide-react';
import { BasicInfo } from '../../listing/BasicInfo';
import { LocationInfo } from '../../listing/LocationInfo';
import { BusinessHours } from '../../listing/BusinessHours';
import { ProductsServices } from '../../listing/ProductsServices';
import { ImageUpload } from '../../listing/ImageUpload';
import { ContactInfo } from '../../listing/ContactInfo';
import type { Business } from '../../../types/business';

interface ListingEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: Business;
  onSave: (data: Business) => void;
}

export const ListingEditModal: React.FC<ListingEditModalProps> = ({
  isOpen,
  onClose,
  business,
  onSave,
}) => {
  const methods = useForm<Business>({
    defaultValues: business,
  });

  if (!isOpen) return null;

  const handleSubmit = (data: Business) => {
    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Edit Business Listing</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="p-6 space-y-8">
            <BasicInfo />
            <LocationInfo />
            <ContactInfo />
            <BusinessHours />
            <ProductsServices />
            <ImageUpload />

            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};