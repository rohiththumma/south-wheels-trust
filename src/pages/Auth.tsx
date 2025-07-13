
import React, { useState } from 'react';
import { Car, ArrowLeft } from 'lucide-react';
import { CustomerAuth } from '@/components/auth/CustomerAuth';
import { AdminAuth } from '@/components/auth/AdminAuth';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>('customer');
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full flex">
        {/* Left Section - Car Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-slate-900 rounded-l-2xl items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
          <div className="relative z-10 text-center p-8">
            <div className="flex items-center justify-center mb-8">
              <Car className="h-16 w-16 text-red-600 mr-4" />
              <div>
                <h1 className="text-3xl font-bold text-white">South Wheels Trust</h1>
                <p className="text-gray-300 mt-2">Your Trusted Car Partner</p>
              </div>
            </div>
            <div className="text-gray-300 text-lg">
              <p className="mb-4">Join thousands of satisfied customers</p>
              <p>Find your perfect pre-owned vehicle today</p>
            </div>
          </div>
        </div>

        {/* Right Section - Auth Forms */}
        <div className="w-full lg:w-1/2 bg-white rounded-r-2xl lg:rounded-l-none rounded-2xl shadow-2xl">
          <div className="p-8 sm:p-12">
            {/* Logo for mobile */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <Car className="h-8 w-8 text-red-600 mr-2" />
              <span className="text-xl font-bold text-slate-800">South Wheels Trust</span>
            </div>

            {/* Tab Navigation */}
            <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('customer')}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'customer'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'admin'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Auth Forms */}
            <div className="transition-all duration-300">
              {activeTab === 'customer' ? <CustomerAuth /> : <AdminAuth />}
            </div>

            {/* Back to Home */}
            <div className="mt-8 text-center">
              <button
                onClick={handleBackToHome}
                className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
