import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Building2, Eye } from 'lucide-react';
import { BasicInfo } from '../components/listing/BasicInfo';
import { LocationInfo } from '../components/listing/LocationInfo';
import { BusinessHours } from '../components/listing/BusinessHours';
import { ProductsServices } from '../components/listing/ProductsServices';
import { ImageUpload } from '../components/listing/ImageUpload';
import { ContactInfo } from '../components/listing/ContactInfo';
import { PreviewModal } from '../components/listing/PreviewModal';
import type { Business, Category } from '../types/business';

type FormData = Omit<Business, 'id' | 'rating' | 'distance'>;

export const AddListing: React.FC = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      category: 'restaurants',
      description: '',
      address: '',
      coordinates: { lat: 40.7128, lng: -74.006 },
      image: '',
      coverPhoto: '',
      logo: '',
      products: [],
      businessHours: [
        { day: 'Monday', open: '09:00', close: '17:00', isClosed: false },
        { day: 'Tuesday', open: '09:00', close: '17:00', isClosed: false },
        { day: 'Wednesday', open: '09:00', close: '17:00', isClosed: false },
        { day: 'Thursday', open: '09:00', close: '17:00', isClosed: false },
        { day: 'Friday', open: '09:00', close: '17:00', isClosed: false },
        { day: 'Saturday', open: '10:00', close: '15:00', isClosed: false },
        { day: 'Sunday', open: '10:00', close: '15:00', isClosed: true },
      ],
      contact: {
        email: '',
        social: {},
      },
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="w-8 h-8 text-white" />
                <h1 className="text-2xl font-bold text-white">Add Your Business</h1>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
              >
                <Eye className="w-5 h-5" />
                Preview
              </button>
            </div>
          </div>

          {/* Form */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6 space-y-8">
              <BasicInfo />
              <LocationInfo />
              <ContactInfo />
              <BusinessHours />
              <ProductsServices />
              <ImageUpload />

              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Submit Listing
                </button>
              </div>
            </form>
          </FormProvider>

          <PreviewModal
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            data={methods.watch()}
          />
        </div>
      </div>
    </div>
  );
};