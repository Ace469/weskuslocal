import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, LogOut, Settings, Building2, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { AuthModal } from './AuthModal';
import { signOut } from '../services/auth';

export const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, isAuthenticated, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  const handleAdminAccess = () => {
    setUser({
      id: 'admin-1',
      email: 'admin@example.com',
      displayName: 'Admin User',
      role: 'admin',
      photoURL: 'https://ui-avatars.com/api/?name=Admin+User'
    });
    navigate('/admin');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" />
            <span className="text-xl font-bold text-indigo-600">LocalBiz</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/explore" className="text-gray-600 hover:text-gray-900">
              Explore
            </Link>
            <Link 
              to="/admin" 
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium"
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin Panel
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}`}
                    alt={user?.displayName}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.displayName}
                  </span>
                </div>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="p-2 text-gray-600 hover:text-gray-900"
                  >
                    <Settings className="w-5 h-5" />
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleAdminAccess}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Preview Admin Panel</span>
                </button>
                <button
                  onClick={() => {
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-4 py-2 text-indigo-600 hover:text-indigo-700"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setAuthMode('register');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
      />
    </header>
  );
};