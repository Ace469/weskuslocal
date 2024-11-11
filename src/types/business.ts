export type Category = 'restaurants' | 'retail' | 'real-estate' | 'auto-sales';

export interface BusinessHour {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  website?: string;
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  description: string;
  image: string;
  coverPhoto: string;
  logo: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  rating: number;
  distance?: number;
  products: Product[];
  businessHours: BusinessHour[];
  contact: ContactInfo;
}

export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}