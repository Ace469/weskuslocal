import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Image, Layout, Plus } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { HeroEditor } from '../../components/admin/landing/HeroEditor';
import { CategoryEditor } from '../../components/admin/landing/CategoryEditor';
import { BannerEditor } from '../../components/admin/landing/BannerEditor';
import { getLandingConfig, updateLandingConfig } from '../../services/admin';
import type { LandingConfig } from '../../types/admin';

export const LandingCustomization: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: config, isLoading } = useQuery({
    queryKey: ['landing-config'],
    queryFn: getLandingConfig,
  });

  const updateMutation = useMutation({
    mutationFn: updateLandingConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['landing-config'] });
    },
  });

  if (isLoading) return null;

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Landing Page Customization</h1>
          <button
            onClick={() => updateMutation.mutate(config!)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>

        <div className="space-y-6">
          <HeroEditor
            config={config?.hero}
            onChange={(hero) =>
              updateMutation.mutate({ ...config!, hero })
            }
          />

          <CategoryEditor
            categories={config?.categories || []}
            onChange={(categories) =>
              updateMutation.mutate({ ...config!, categories })
            }
          />

          <BannerEditor
            banners={config?.promotionalBanners || []}
            onChange={(promotionalBanners) =>
              updateMutation.mutate({ ...config!, promotionalBanners })
            }
          />
        </div>
      </div>
    </AdminLayout>
  );
};