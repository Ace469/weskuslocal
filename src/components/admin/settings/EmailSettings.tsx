import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Send } from 'lucide-react';

interface EmailSettingsForm {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  emailTemplates: {
    welcome: string;
    verification: string;
    resetPassword: string;
    businessApproval: string;
  };
}

export const EmailSettings: React.FC = () => {
  const { register, handleSubmit } = useForm<EmailSettingsForm>({
    defaultValues: {
      smtpHost: 'smtp.example.com',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
      fromEmail: 'noreply@localbiz.com',
      fromName: 'LocalBiz',
      emailTemplates: {
        welcome: '',
        verification: '',
        resetPassword: '',
        businessApproval: '',
      },
    },
  });

  const onSubmit = (data: EmailSettingsForm) => {
    console.log('Saving email settings:', data);
  };

  const handleTestEmail = () => {
    console.log('Sending test email...');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Settings</h2>
        
        <div className="space-y-6">
          {/* SMTP Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">SMTP Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">SMTP Host</label>
                <input
                  type="text"
                  {...register('smtpHost')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">SMTP Port</label>
                <input
                  type="number"
                  {...register('smtpPort')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">SMTP Username</label>
                <input
                  type="text"
                  {...register('smtpUser')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">SMTP Password</label>
                <input
                  type="password"
                  {...register('smtpPassword')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* From Settings */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">From Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">From Email</label>
                <input
                  type="email"
                  {...register('fromEmail')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">From Name</label>
                <input
                  type="text"
                  {...register('fromName')}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Email Templates */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Email Templates</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Welcome Email</label>
                <textarea
                  {...register('emailTemplates.welcome')}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                  placeholder="Welcome email template..."
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Verification Email</label>
                <textarea
                  {...register('emailTemplates.verification')}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
                  placeholder="Verification email template..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <button
          type="button"
          onClick={handleTestEmail}
          className="px-6 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send Test Email
        </button>
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