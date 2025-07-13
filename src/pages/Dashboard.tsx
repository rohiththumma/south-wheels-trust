
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { CustomerDashboard } from '@/components/dashboard/CustomerDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return profile.role === 'admin' ? <AdminDashboard /> : <CustomerDashboard />;
};

export default Dashboard;
