import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, XCircle, Clock, MapPin, Mail, Phone, Eye, Edit } from 'lucide-react';
import { getBusinessApprovals, updateBusinessStatus } from '../../services/admin';
import { ListingPreviewModal } from './listings/ListingPreviewModal';
import { ListingEditModal } from './listings/ListingEditModal';
import type { BusinessApproval } from '../../services/admin';
import type { Business } from '../../types/business';

export const BusinessApprovals: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  const { data: approvals, isLoading } = useQuery({
    queryKey: ['business-approvals'],
    queryFn: getBusinessApprovals,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'approved' | 'rejected' }) =>
      updateBusinessStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-approvals'] });
      queryClient.invalidateQueries({ queryKey: ['admin-stats'] });
    },
  });

  const handlePreview = (business: Business) => {
    setSelectedBusiness(business);
    setIsPreviewOpen(true);
  };

  const handleEdit = (business: Business) => {
    setSelectedBusiness(business);
    setIsEditOpen(true);
  };

  const handleSave = (updatedBusiness: Business) => {
    console.log('Save business:', updatedBusiness);
    // Implement save functionality
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Approvals</h2>
      <div className="space-y-6">
        {approvals?.map((business: BusinessApproval) => (
          <div
            key={business.id}
            className="border rounded-lg overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start gap-4">
                <img
                  src={business.logo}
                  alt={business.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{business.name}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePreview(business)}
                        className="px-3 py-1.5 text-gray-600 hover:text-indigo-600 flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <button
                        onClick={() => handleEdit(business)}
                        className="px-3 py-1.5 text-gray-600 hover:text-blue-600 flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({ id: business.id, status: 'approved' })
                        }
                        className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 flex items-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({ id: business.id, status: 'rejected' })
                        }
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-1">{business.description}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {business.address}
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {business.contact.email}
                    </div>
                    {business.contact.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {business.contact.phone}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-sm">
              <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center gap-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${business.submittedBy.displayName}`}
                    alt={business.submittedBy.displayName}
                    className="w-5 h-5 rounded-full"
                  />
                  <span>Submitted by {business.submittedBy.displayName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <time dateTime={business.submittedAt}>
                    {new Date(business.submittedAt).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {approvals?.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No pending approvals</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {selectedBusiness && (
        <ListingPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setSelectedBusiness(null);
          }}
          business={selectedBusiness}
        />
      )}

      {/* Edit Modal */}
      {selectedBusiness && (
        <ListingEditModal
          isOpen={isEditOpen}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedBusiness(null);
          }}
          business={selectedBusiness}
          onSave={handleSave}
        />
      )}
    </div>
  );
};