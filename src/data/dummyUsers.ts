import type { User } from '../types/auth';

export const dummyUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@localbiz.com',
    displayName: 'Admin User',
    photoURL: 'https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=fff',
    role: 'admin',
  },
  {
    id: 'user-1',
    email: 'john@example.com',
    displayName: 'John Smith',
    photoURL: 'https://ui-avatars.com/api/?name=John+Smith',
    role: 'business_owner',
  },
  {
    id: 'user-2',
    email: 'sarah@example.com',
    displayName: 'Sarah Johnson',
    photoURL: 'https://ui-avatars.com/api/?name=Sarah+Johnson',
    role: 'business_owner',
  },
  {
    id: 'user-3',
    email: 'mike@example.com',
    displayName: 'Mike Wilson',
    photoURL: 'https://ui-avatars.com/api/?name=Mike+Wilson',
    role: 'user',
  },
  {
    id: 'user-4',
    email: 'emma@example.com',
    displayName: 'Emma Davis',
    photoURL: 'https://ui-avatars.com/api/?name=Emma+Davis',
    role: 'user',
  },
];