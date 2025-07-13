
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const AdminAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.password.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      console.log('Admin login attempt for:', formData.email);
      
      const { error } = await signIn(formData.email.trim(), formData.password);
      
      if (error) {
        console.error('Admin login error:', error);
        toast({
          title: "Login Failed",
          description: error.message || "Invalid admin credentials. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome Admin!",
          description: "You have been successfully logged in.",
        });
        // Navigation will be handled automatically by the Dashboard component based on user role
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Admin auth error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h2>
        <p className="text-gray-600">Sign in to the admin dashboard</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="adminEmail" className="text-gray-700 font-medium">Email Address</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="adminEmail"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
              placeholder="Enter admin email"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="adminPassword" className="text-gray-700 font-medium">Password</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="adminPassword"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="pl-10 pr-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
              placeholder="Enter admin password"
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

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Please wait...' : 'Login as Admin'}
        </Button>

        <div className="text-center">
          <a href="#" className="text-red-600 hover:text-red-700 text-sm font-medium">
            Forgot Password?
          </a>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-sm text-red-800">
              <strong>Admin Access Only:</strong> This section is restricted to authorized administrators only.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
