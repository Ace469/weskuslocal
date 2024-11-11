import axios from 'axios';
import { dummyAdminStats, dummyBusinessApprovals } from '../data/dummyAdminData';
import type { Business } from '../types/business';
import type { User } from '../types/auth';
import type { LandingConfig, AdminStats } from '../types/admin';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export interface BusinessApproval extends Business {
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  submittedBy: User;
}

export const getAdminStats = async (): Promise<AdminStats> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyAdminStats;
};

export const getBusinessApprovals = async (): Promise<BusinessApproval[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return dummyBusinessApprovals;
};

export const updateBusinessStatus = async (
  businessId: string,
  status: 'approved' | 'rejected',
  reason?: string
) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
};

export const getLandingConfig = async (): Promise<LandingConfig> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    hero: {
      backgroundImage: 'https://source.unsplash.com/1600x900/?city,business',
      heading: 'Discover Local Businesses',
      subheading: 'Find the best local businesses in your area',
    },
    categories: [
      {
        id: '1',
        name: 'Restaurants',
        image: 'https://source.unsplash.com/800x600/?restaurant',
        featured: true,
      },
      {
        id: '2',
        name: 'Retail',
        image: 'https://source.unsplash.com/800x600/?retail,store',
        featured: true,
      },
    ],
    promotionalBanners: [
      {
        id: '1',
        title: 'Summer Sale',
        description: 'Get up to 50% off at local stores',
        image: 'https://source.unsplash.com/800x400/?summer,sale',
        link: '/promotions/summer-sale',
        active: true,
      },
    ],
  };
};

export const updateLandingConfig = async (config: LandingConfig): Promise<LandingConfig> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return config;
};