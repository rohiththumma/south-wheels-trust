
import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export const CustomerAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Customer form submitted:', formData);
    alert(`Customer ${isLogin ? 'Login' : 'Registration'} functionality will be implemented with Supabase!`);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isLogin ? 'Welcome Back!' : 'Join Us Today'}
        </h2>
        <p className="text-gray-600">
          {isLogin ? 'Sign in to your customer account' : 'Create your customer account'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div>
            <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          </div>
        )}

        {!isLogin && (
          <div>
            <Label htmlFor="mobile" className="text-gray-700 font-medium">Mobile Number</Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="mobile"
                type="tel"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                placeholder="Enter your mobile number"
                required={!isLogin}
              />
            </div>
          </div>
        )}

        <div>
          <Label htmlFor="email" className="text-gray-700 font-medium">
            {isLogin ? 'Email or Mobile Number' : 'Email Address'}
          </Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type={isLogin ? "text" : "email"}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
              placeholder={isLogin ? "Enter email or mobile number" : "Enter your email address"}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="pl-10 pr-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {!isLogin && (
          <div>
            <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="pl-10 pr-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                placeholder="Confirm your password"
                required={!isLogin}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        )}

        {!isLogin && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => handleInputChange('agreeTerms', !!checked)}
              className="border-gray-300"
            />
            <Label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-red-600 hover:text-red-700 font-medium">
                Terms & Conditions
              </a>
            </Label>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
        >
          {isLogin ? 'Login as Customer' : 'Register as Customer'}
        </Button>

        {isLogin && (
          <div className="text-center">
            <a href="#" className="text-red-600 hover:text-red-700 text-sm font-medium">
              Forgot Password?
            </a>
          </div>
        )}

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              {isLogin ? 'Register here' : 'Login here'}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};
