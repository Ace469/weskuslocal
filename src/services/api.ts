import axios from 'axios';
import { dummyBusinesses } from '../data/dummyBusinesses';
import type { Business, Category } from '../types/business';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const filterBusinesses = (params: {
  lat: number;
  lng: number;
  radius: number;
  category?: Category;
  query?: string;
}) => {
  let filtered = [...dummyBusinesses];

  if (params.category) {
    filtered = filtered.filter(business => business.category === params.category);
  }

  if (params.query) {
    const query = params.query.toLowerCase();
    filtered = filtered.filter(business => 
      business.name.toLowerCase().includes(query) ||
      business.description.toLowerCase().includes(query)
    );
  }

  // Calculate distances based on provided coordinates
  filtered = filtered.map(business => ({
    ...business,
    distance: Number((Math.random() * params.radius).toFixed(1)), // Simplified distance calculation
  }));

  // Sort by distance
  filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));

  return filtered;
};

export const searchBusinesses = async (params: {
  lat: number;
  lng: number;
  radius: number;
  category?: Category;
  query?: string;
}): Promise<Business[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return filterBusinesses(params);
};

export const getBusinessById = async (id: string): Promise<Business> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  const business = dummyBusinesses.find(b => b.id === id);
  if (!business) {
    throw new Error('Business not found');
  }
  return business;
};

export const getNearbyBusinesses = async (params: {
  lat: number;
  lng: number;
  radius: number;
}): Promise<Business[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return filterBusinesses(params);
};