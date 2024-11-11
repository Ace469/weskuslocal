import React from 'react';
import { X, MapPin, Phone, Mail, Globe, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import type { Business } from '../../../types/business';

interface ListingPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  business: Business;
}

export const ListingPreviewModal: React.FC<ListingPreviewModalProps> = ({ isOpen, onClose, business }) => {
  if (!isOpen) return null;

  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative h-64">
          <img
            src={business.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute -bottom-16 left-8">
            <img
              src={business.logo}
              alt="Logo"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        <div className="p-8 pt-20">
          {/* Basic Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
            <p className="text-gray-600">{business.description}</p>
          </div>

          {/* Contact & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
              {business.contact?.email && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span>{business.contact.email}</span>
                </div>
              )}
              {business.contact?.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>{business.contact.phone}</span>
                </div>
              )}
              {business.contact?.website && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-5 h-5" />
                  <a href={business.contact.website} className="text-indigo-600 hover:underline">
                    {business.contact.website}
                  </a>
                </div>
              )}
              {business.address && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{business.address}</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Business Hours</h2>
              {business.businessHours?.map((hour) => (
                <div key={hour.day} className="flex items-center justify-between text-gray-600">
                  <span className="font-medium">{hour.day}</span>
                  {hour.isClosed ? (
                    <span className="text-red-600">Closed</span>
                  ) : (
                    <span>{hour.open} - {hour.close}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Products & Services */}
          {business.products && business.products.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Products & Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {business.products.map((product, index) => (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-gray-600 text-sm">{product.description}</p>
                      <p className="text-indigo-600 font-medium mt-1">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {business.contact?.social && Object.entries(business.contact.social).some(([_, url]) => url) && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Connect With Us</h2>
              <div className="flex gap-4">
                {Object.entries(business.contact.social).map(([platform, url]) => {
                  if (!url) return null;
                  const Icon = socialIcons[platform as keyof typeof socialIcons];
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};