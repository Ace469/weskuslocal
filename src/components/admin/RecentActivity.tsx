import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, UserPlus, Building2, CheckCircle, XCircle } from 'lucide-react';
import { dummyRecentActivity } from '../../data/dummyAdminData';

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'business_created':
      return Building2;
    case 'user_registered':
      return UserPlus;
    case 'business_approved':
      return CheckCircle;
    case 'business_rejected':
      return XCircle;
    default:
      return Activity;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'business_created':
      return 'text-blue-600 bg-blue-50';
    case 'user_registered':
      return 'text-green-600 bg-green-50';
    case 'business_approved':
      return 'text-indigo-600 bg-indigo-50';
    case 'business_rejected':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export const RecentActivity: React.FC = () => {
  const { data: activities } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: () => Promise.resolve(dummyRecentActivity),
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
      
      {!activities || activities.length === 0 ? (
        <div className="text-center py-6">
          <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const colorClass = getActivityColor(activity.type);

            return (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {activity.user.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};