import type { AdminStats, BusinessApproval } from '../types/admin';
import { dummyBusinesses } from './dummyBusinesses';

export const dummyAdminStats: AdminStats = {
  totalUsers: 1247,
  activeBusinesses: dummyBusinesses.length,
  monthlyRevenue: 28750,
  pendingApprovals: 15,
  userGrowth: 12.5,
  businessGrowth: 8.3,
  revenueGrowth: 15.7,
};

export const dummyBusinessApprovals: BusinessApproval[] = [
  {
    id: 'approval-1',
    name: 'The Coffee House',
    category: 'restaurants',
    description: 'A cozy coffee shop serving artisanal coffee and pastries.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1581873372796-635b67ca2008?auto=format&fit=crop&w=400&h=400&q=80',
    address: '123 Main St, New York, NY',
    coordinates: { lat: 40.7128, lng: -74.006 },
    rating: 0,
    status: 'pending',
    submittedAt: new Date().toISOString(),
    submittedBy: {
      id: 'user-1',
      email: 'john@example.com',
      displayName: 'John Smith',
      role: 'business_owner',
    },
    products: [
      {
        id: 'product-1',
        name: 'Espresso',
        price: 3.50,
        description: 'Rich and bold espresso shot',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80',
      }
    ],
    businessHours: [
      { day: 'Monday', open: '07:00', close: '20:00', isClosed: false },
      { day: 'Tuesday', open: '07:00', close: '20:00', isClosed: false },
      { day: 'Wednesday', open: '07:00', close: '20:00', isClosed: false },
      { day: 'Thursday', open: '07:00', close: '20:00', isClosed: false },
      { day: 'Friday', open: '07:00', close: '22:00', isClosed: false },
      { day: 'Saturday', open: '08:00', close: '22:00', isClosed: false },
      { day: 'Sunday', open: '08:00', close: '18:00', isClosed: false },
    ],
    contact: {
      email: 'info@coffeehouse.com',
      phone: '(555) 123-4567',
      website: 'https://coffeehouse.com',
      social: {
        facebook: 'https://facebook.com/coffeehouse',
        instagram: 'https://instagram.com/coffeehouse',
      },
    },
  },
  {
    id: 'approval-2',
    name: 'Tech Haven',
    category: 'retail',
    description: 'Your one-stop shop for all things technology.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1534653299134-96a171b61581?auto=format&fit=crop&w=400&h=400&q=80',
    address: '456 Tech Ave, New York, NY',
    coordinates: { lat: 40.7128, lng: -74.006 },
    rating: 0,
    status: 'pending',
    submittedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    submittedBy: {
      id: 'user-2',
      email: 'sarah@example.com',
      displayName: 'Sarah Johnson',
      role: 'business_owner',
    },
    products: [
      {
        id: 'product-2',
        name: 'Smartphone Pro',
        price: 999.99,
        description: 'Latest flagship smartphone',
        image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80',
      }
    ],
    businessHours: [
      { day: 'Monday', open: '09:00', close: '21:00', isClosed: false },
      { day: 'Tuesday', open: '09:00', close: '21:00', isClosed: false },
      { day: 'Wednesday', open: '09:00', close: '21:00', isClosed: false },
      { day: 'Thursday', open: '09:00', close: '21:00', isClosed: false },
      { day: 'Friday', open: '09:00', close: '22:00', isClosed: false },
      { day: 'Saturday', open: '10:00', close: '22:00', isClosed: false },
      { day: 'Sunday', open: '11:00', close: '18:00', isClosed: false },
    ],
    contact: {
      email: 'info@techhaven.com',
      phone: '(555) 987-6543',
      website: 'https://techhaven.com',
      social: {
        facebook: 'https://facebook.com/techhaven',
        twitter: 'https://twitter.com/techhaven',
      },
    },
  },
  {
    id: 'approval-3',
    name: 'Fitness First',
    category: 'retail',
    description: 'Premium fitness equipment and sportswear.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80',
    coverPhoto: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&h=400&q=80',
    address: '789 Fitness Blvd, New York, NY',
    coordinates: { lat: 40.7148, lng: -74.008 },
    rating: 0,
    status: 'pending',
    submittedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    submittedBy: {
      id: 'user-3',
      email: 'mike@example.com',
      displayName: 'Mike Wilson',
      role: 'business_owner',
    },
    products: [
      {
        id: 'product-3',
        name: 'Premium Yoga Mat',
        price: 79.99,
        description: 'Professional-grade yoga mat',
        image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&q=80',
      }
    ],
    businessHours: [
      { day: 'Monday', open: '06:00', close: '22:00', isClosed: false },
      { day: 'Tuesday', open: '06:00', close: '22:00', isClosed: false },
      { day: 'Wednesday', open: '06:00', close: '22:00', isClosed: false },
      { day: 'Thursday', open: '06:00', close: '22:00', isClosed: false },
      { day: 'Friday', open: '06:00', close: '22:00', isClosed: false },
      { day: 'Saturday', open: '08:00', close: '20:00', isClosed: false },
      { day: 'Sunday', open: '08:00', close: '20:00', isClosed: false },
    ],
    contact: {
      email: 'info@fitnessfirst.com',
      phone: '(555) 555-1234',
      website: 'https://fitnessfirst.com',
      social: {
        instagram: 'https://instagram.com/fitnessfirst',
        facebook: 'https://facebook.com/fitnessfirst',
      },
    },
  },
];

export const dummyRecentActivity = [
  {
    id: '1',
    type: 'business_created' as const,
    message: 'New business "The Coffee House" was created',
    timestamp: new Date().toISOString(),
    user: {
      name: 'John Smith',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith',
    },
  },
  {
    id: '2',
    type: 'user_registered' as const,
    message: 'New user Sarah Johnson registered',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson',
    },
  },
  {
    id: '3',
    type: 'business_approved' as const,
    message: 'Business "City Gym" was approved',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: {
      name: 'Admin User',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User',
    },
  },
  {
    id: '4',
    type: 'business_rejected' as const,
    message: 'Business "Fake Store" was rejected',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    user: {
      name: 'Admin User',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User',
    },
  },
  {
    id: '5',
    type: 'user_registered' as const,
    message: 'New user Mike Wilson registered',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    user: {
      name: 'Mike Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Wilson',
    },
  },
];