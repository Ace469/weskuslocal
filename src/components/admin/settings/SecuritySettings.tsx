import React from 'react';
import { useForm } from 'react-hook-form';
import { Shield, Key, Lock } from 'lucide-react';

interface SecuritySettingsForm {
  passwordPolicy: {
    minLength: number;
    requireNumbers: boolean;
    requireSymbols: boolean;
    requireUppercase: boolean;
  };
  loginAttempts: number;
  lockoutDuration: number;
  sessionTimeout: number;
  twoFactorAuth: boolean;
  apiKeys: {
    googleMaps: string;
    firebase: {
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
    };
    stripe: {
      publishableKey: string;
      secretKey: string;
      webhookSecret: string;
    };
  };
}

export const SecuritySettings: React.FC = () => {
  const { register, handleSubmit } = useForm<SecuritySettingsForm>({
    defaultValues: {
      passwordPolicy: {
        minLength: 8,
        requireNumbers: true,
        requireSymbols: true,
        requireUppercase: true,
      },
      loginAttempts: 5,
      lockoutDuration: 30,
      sessionTimeout: 60,
      twoFactorAuth: false,
      apiKeys: {
        googleMaps: '',
        firebase: {
          apiKey: '',
          authDomain: '',
          projectId: '',
          storageBucket: '',
          messagingSenderId: '',
          appId: '',
        },
        stripe: {
          publishableKey: '',
          secretKey: '',
          webhookSecret: '',
        },
      },
    },
  });

  const onSubmit = (data: SecuritySettingsForm) => {
    console.log('Saving security settings:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
      {/* API Keys Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
        </div>
        
        <div className="space-y-6">
          {/* Google Maps */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Google Maps API</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                API Key
              </label>
              <input
                type="password"
                {...register('apiKeys.googleMaps')}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Required for maps functionality and location services
              </p>
            </div>
          </div>

          {/* Firebase */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Firebase Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  {...register('apiKeys.firebase.apiKey')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Auth Domain
                </label>
                <input
                  type="text"
                  {...register('apiKeys.firebase.authDomain')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Project ID
                </label>
                <input
                  type="text"
                  {...register('apiKeys.firebase.projectId')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Storage Bucket
                </label>
                <input
                  type="text"
                  {...register('apiKeys.firebase.storageBucket')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Messaging Sender ID
                </label>
                <input
                  type="text"
                  {...register('apiKeys.firebase.messagingSenderId')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  App ID
                </label>
                <input
                  type="text"
                  {...register('apiKeys.firebase.appId')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Required for authentication and data storage
            </p>
          </div>

          {/* Stripe */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Stripe Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Publishable Key
                </label>
                <input
                  type="password"
                  {...register('apiKeys.stripe.publishableKey')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Secret Key
                </label>
                <input
                  type="password"
                  {...register('apiKeys.stripe.secretKey')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Webhook Secret
                </label>
                <input
                  type="password"
                  {...register('apiKeys.stripe.webhookSecret')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Required for payment processing and subscriptions
            </p>
          </div>
        </div>
      </div>

      {/* Password Policy */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Password Policy</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Minimum Password Length
            </label>
            <input
              type="number"
              {...register('passwordPolicy.minLength')}
              min={6}
              max={32}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('passwordPolicy.requireNumbers')}
                className="rounded text-indigo-600"
              />
              <span className="text-sm text-gray-600">Require numbers</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('passwordPolicy.requireSymbols')}
                className="rounded text-indigo-600"
              />
              <span className="text-sm text-gray-600">Require symbols</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('passwordPolicy.requireUppercase')}
                className="rounded text-indigo-600"
              />
              <span className="text-sm text-gray-600">Require uppercase letters</span>
            </label>
          </div>
        </div>
      </div>

      {/* Login Security */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Login Security</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Maximum Login Attempts
            </label>
            <input
              type="number"
              {...register('loginAttempts')}
              min={1}
              max={10}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Account Lockout Duration (minutes)
            </label>
            <input
              type="number"
              {...register('lockoutDuration')}
              min={5}
              max={1440}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              {...register('sessionTimeout')}
              min={15}
              max={1440}
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('twoFactorAuth')}
                className="rounded text-indigo-600"
              />
              <span className="text-sm text-gray-600">Require 2FA for admin accounts</span>
            </label>
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