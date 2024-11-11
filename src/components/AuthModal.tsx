import React from 'react';
import { useForm } from 'react-hook-form';
import { X, Facebook } from 'lucide-react';
import { login, register, loginWithFacebook } from '../services/auth';
import { useAuthStore } from '../store/useAuthStore';
import type { LoginCredentials, RegisterCredentials } from '../types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
  const { register: registerForm, handleSubmit } = useForm<RegisterCredentials>();
  const setUser = useAuthStore((state) => state.setUser);

  const onSubmit = async (data: RegisterCredentials) => {
    try {
      const user = mode === 'login' 
        ? await login(data)
        : await register({ ...data, role: 'user' });
      setUser(user);
      onClose();
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const user = await loginWithFacebook();
      setUser(user);
      onClose();
    } catch (error) {
      console.error('Facebook login error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={handleFacebookLogin}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#1877F2] text-white rounded-lg hover:bg-[#1874E8] transition-colors mb-4"
        >
          <Facebook className="w-5 h-5" />
          Continue with Facebook
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                {...registerForm('displayName', { required: true })}
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...registerForm('email', { required: true })}
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              {...registerForm('password', { required: true })}
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};