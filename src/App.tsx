import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { BusinessDetails } from './pages/BusinessDetails';
import { CategoryPage } from './pages/CategoryPage';
import { AddListing } from './pages/AddListing';
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminSettings } from './pages/admin/Settings';
import { AdminBusinesses } from './pages/admin/Businesses';
import { AdminUsers } from './pages/admin/Users';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/business/:id" element={<BusinessDetails />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/add-listing" element={<AddListing />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/businesses" element={<AdminBusinesses />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;