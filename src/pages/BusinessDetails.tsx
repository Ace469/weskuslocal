import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MapPin, Phone, Mail, Clock, ArrowLeft, Star } from 'lucide-react';
import { getBusinessById } from '../services/api';
import { Map } from '../components/Map';

export const BusinessDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: business, isLoading } = useQuery({
    queryKey: ['business', id],
    queryFn: () => getBusinessById(id!),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!business) return <div>Business not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[400px]">
        <img 
          src={business.coverPhoto} 
          alt={business.name}
          className="w-full h-full object-cover"
        />
        <Link
          to="/"
          className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="absolute -bottom-16 left-8">
          <img
            src={business.logo}
            alt={`${business.name} logo`}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Business Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
                <div className="flex items-center bg-indigo-50 px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-2 font-semibold">{business.rating}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {business.address}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  Open Now
                </div>
              </div>

              <p className="text-gray-600 mb-6">{business.description}</p>

              <div className="flex gap-4">
                <a
                  href={`tel:+1234567890`}
                  className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
                <a
                  href={`mailto:contact@${business.name}.com`}
                  className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </a>
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Products & Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {business.products.map((product) => (
                  <div key={product.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                      <p className="text-indigo-600 font-semibold">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="h-[300px] rounded-lg overflow-hidden">
                <Map
                  businesses={[business]}
                  center={business.coordinates}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};