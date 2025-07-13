
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { CustomerDashboard } from '@/components/dashboard/CustomerDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      console.log('No user found, redirecting to auth');
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Handle navigation based on user role once profile is loaded
    if (user && profile && !loading) {
      console.log('User profile loaded:', profile.role);
      
      // Optional: You could redirect admin users to /admin route if preferred
      // if (profile.role === 'admin' && window.location.pathname !== '/admin') {
      //   navigate('/admin', { replace: true });
      // }
    }
  }, [user, profile, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  console.log('Rendering dashboard for role:', profile.role);

  return profile.role === 'admin' ? <AdminDashboard /> : <CustomerDashboard />;
};

export default Dashboard;
