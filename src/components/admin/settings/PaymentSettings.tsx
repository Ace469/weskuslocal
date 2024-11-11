import React from 'react';
import { useForm } from 'react-hook-form';
import { DollarSign, CreditCard } from 'lucide-react';

interface PaymentSettingsForm {
  currency: string;
  paymentMethods: {
    stripe: boolean;
    paypal: boolean;
  };
  stripeSettings: {
    publicKey: string;
    secretKey: string;
    webhookSecret: string;
  };
  paypalSettings: {
    clientId: string;
    clientSecret: string;
    sandbox: boolean;
  };
  fees: {
    listingFee: number;
    transactionFee: number;
    featuredListingFee: number;
  };
}

export const PaymentSettings: React.FC = () => {
  const { register, handleSubmit } = useForm<PaymentSettingsForm>({
    defaultValues: {
      currency: 'USD',
      paymentMethods: {
        stripe: true,
        paypal: false,
      },
      stripeSettings: {
        publicKey: '',
        secretKey: '',
        webhookSecret: '',
      },
      paypalSettings: {
        clientId: '',
        clientSecret: '',
        sandbox: true,
      },
      fees: {
        listingFee: 0,
        transactionFee: 2.9,
        featuredListingFee: 29.99,
      },
    },
  });

  const onSubmit = (data: PaymentSettingsForm) => {
    console.log('Saving payment settings:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Settings</h2>
        
        <div className="space-y-6">
          {/* General Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">General Settings</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Currency</label>
              <select
                {...register('currency')}
                className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
              </select>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Payment Methods</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('paymentMethods.stripe')}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm text-gray-600">Enable Stripe</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('paymentMethods.paypal')}
                  className="rounded text-indigo-600"
                />
                <span className="text-sm text-gray-600">Enable PayPal</span>
              </label>
            </div>
          </div>

          {/* Stripe Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Stripe Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Public Key</label>
                <input
                  type="text"
                  {...register('stripeSettings.publicKey')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Secret Key</label>
                <input
                  type="password"
                  {...register('stripeSettings.secretKey')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Webhook Secret</label>
                <input
                  type="password"
                  {...register('stripeSettings.webhookSecret')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Fees */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Platform Fees</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Basic Listing Fee</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('fees.listingFee')}
                    className="w-full pl-7 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Transaction Fee (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    {...register('fees.transactionFee')}
                    className="w-full pr-8 pl-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Featured Listing Fee</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    {...register('fees.featuredListingFee')}
                    className="w-full pl-7 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
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