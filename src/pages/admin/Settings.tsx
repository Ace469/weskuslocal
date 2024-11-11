import React from 'react';
import { Settings as SettingsIcon, Palette, Globe, Mail, Bell, Shield, DollarSign } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { GeneralSettings } from '../../components/admin/settings/GeneralSettings';
import { AppearanceSettings } from '../../components/admin/settings/AppearanceSettings';
import { EmailSettings } from '../../components/admin/settings/EmailSettings';
import { NotificationSettings } from '../../components/admin/settings/NotificationSettings';
import { SecuritySettings } from '../../components/admin/settings/SecuritySettings';
import { PaymentSettings } from '../../components/admin/settings/PaymentSettings';

const tabs = [
  { id: 'general', label: 'General', icon: SettingsIcon },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'payments', label: 'Payments', icon: DollarSign },
];

export const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('general');

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'email':
        return <EmailSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'payments':
        return <PaymentSettings />;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white rounded-xl shadow-sm">
            {renderContent()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};