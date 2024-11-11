import React from 'react';
import { useForm } from 'react-hook-form';
import { Bell } from 'lucide-react';

interface NotificationSettingsForm {
  emailNotifications: {
    newBusinesses: boolean;
    newReviews: boolean;
    newUsers: boolean;
    reports: boolean;
  };
  pushNotifications: {
    enabled: boolean;
    newBusinesses: boolean;
    newReviews: boolean;
    newUsers: boolean;
    reports: boolean;
  };
  notificationDigest: 'instant' | 'daily' | 'weekly';
}

export const NotificationSettings: React.FC = () => {
  const { register, handleSubmit } = useForm<NotificationSettingsForm>({
    defaultValues: {
      emailNotifications: {
        newBusinesses: true,
        newReviews: true,
        newUsers: false,
        reports: true,
      },
      pushNotifications: {
        enabled: true,
        newBusinesses: true,
        newReviews: true,
        newUsers: false,
        reports: true,
      },
      notificationDigest: 'daily',
    },
  });

  const onSubmit = (data: NotificationSettingsForm) => {
    console.log('Saving notification settings:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h2>
        
        <div className="space-y-6">
          {/* Email Notifications */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Email Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('emailNotifications.newBusinesses')}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm text-gray-600">New business listings</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('emailNotifications.newReviews')}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm text-gray-600">New reviews</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('emailNotifications.newUsers')}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm text-gray-600">New user registrations</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('emailNotifications.reports')}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm text-gray-600">Content reports</span>
              </label>
            </div>
          </div>

          {/* Push Notifications */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Push Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('pushNotifications.enabled')}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm text-gray-600">Enable push notifications</span>
              </label>
              <div className="ml-6 space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('pushNotifications.newBusinesses')}
                    className="rounded text-indigo-600"
                  />
                  <span className="text-sm text-gray-600">New business listings</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('pushNotifications.newReviews')}
                    className="rounded text-indigo-600"
                  />
                  <span className="text-sm text-gray-600">New reviews</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('pushNotifications.newUsers')}
                    className="rounded text-indigo-600"
                  />
                  <span className="text-sm text-gray-600">New user registrations</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('pushNotifications.reports')}
                    className="rounded text-indigo-600"
                  />
                  <span className="text-sm text-gray-600">Content reports</span>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Digest */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Notification Digest</h3>
            <select
              {...register('notificationDigest')}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            >
              <option value="instant">Send immediately</option>
              <option value="daily">Daily digest</option>
              <option value="weekly">Weekly digest</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};