import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, Users, Building2, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { StatCard } from '../../components/admin/StatCard';
import { RecentActivity } from '../../components/admin/RecentActivity';
import { BusinessApprovals } from '../../components/admin/BusinessApprovals';
import { RevenueChart } from '../../components/admin/RevenueChart';
import { TopBusinesses } from '../../components/admin/TopBusinesses';
import { getAdminStats } from '../../services/admin';

export const AdminDashboard: React.FC = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: getAdminStats,
  });

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={Users}
            trend={stats?.userGrowth || 0}
            description="Total registered users"
          />
          <StatCard
            title="Active Businesses"
            value={stats?.activeBusinesses || 0}
            icon={Building2}
            trend={stats?.businessGrowth || 0}
            description="Listed businesses"
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${stats?.monthlyRevenue.toLocaleString()}` || '$0'}
            icon={DollarSign}
            trend={stats?.revenueGrowth || 0}
            description="Revenue this month"
            variant="success"
          />
          <StatCard
            title="Pending Approvals"
            value={stats?.pendingApprovals || 0}
            icon={AlertCircle}
            description="Awaiting review"
            variant="warning"
          />
        </div>

        {/* Charts & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <TopBusinesses />
        </div>

        {/* Recent Activity & Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BusinessApprovals />
          <RecentActivity />
        </div>
      </div>
    </AdminLayout>
  );
};