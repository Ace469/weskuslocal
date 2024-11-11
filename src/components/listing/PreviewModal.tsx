import React from 'react';
import { X, MapPin, Phone, Mail, Globe, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import type { Business } from '../../types/business';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Partial<Business>;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, data }) => {
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
            src={data.coverPhoto || 'https://via.placeholder.com/1200x400'}
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
              src={data.logo || 'https://via.placeholder.com/128'}
              alt="Logo"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>

        <div className="p-8 pt-20">
          {/* Basic Info */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.name}</h1>
            <p className="text-gray-600">{data.description}</p>
          </div>

          {/* Contact & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
              {data.contact?.email && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span>{data.contact.email}</span>
                </div>
              )}
              {data.contact?.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>{data.contact.phone}</span>
                </div>
              )}
              {data.contact?.website && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-5 h-5" />
                  <a href={data.contact.website} className="text-indigo-600 hover:underline">
                    {data.contact.website}
                  </a>
                </div>
              )}
              {data.address && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{data.address}</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Business Hours</h2>
              {data.businessHours?.map((hour) => (
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
          {data.products && data.products.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Products & Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.products.map((product, index) => (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg">
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
          {data.contact?.social && Object.entries(data.contact.social).some(([_, url]) => url) && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Connect With Us</h2>
              <div className="flex gap-4">
                {Object.entries(data.contact.social).map(([platform, url]) => {
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