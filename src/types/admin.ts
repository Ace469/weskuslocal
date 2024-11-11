export interface HeroSection {
  backgroundImage: string;
  heading: string;
  subheading: string;
}

export interface CategoryConfig {
  id: string;
  name: string;
  image: string;
  featured: boolean;
}

export interface PromotionalBanner {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  active: boolean;
}

export interface LandingConfig {
  hero: HeroSection;
  categories: CategoryConfig[];
  promotionalBanners: PromotionalBanner[];
}

export interface AdminStats {
  totalUsers: number;
  activeBusinesses: number;
  monthlyRevenue: number;
  pendingApprovals: number;
  userGrowth: number;
  businessGrowth: number;
  revenueGrowth: number;
}