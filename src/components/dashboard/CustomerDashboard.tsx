
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Car, LogOut, User, MessageCircle, Calendar, Search, CreditCard, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Booking {
  id: string;
  car_id: string;
  amount_paid: number;
  status: string;
  noc_status: string;
  booking_date: string;
  cars: {
    name: string;
    images: any;
  };
}

interface Enquiry {
  id: string;
  subject: string;
  message: string;
  admin_reply: string | null;
  status: string;
  created_at: string;
}

export const CustomerDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
    fetchEnquiries();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          cars (
            name,
            images
          )
        `)
        .eq('customer_id', user?.id)
        .order('booking_date', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchEnquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .eq('customer_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEnquiries(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'advance_paid': return 'bg-yellow-100 text-yellow-800';
      case 'noc_processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNocStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-red-100 text-red-800';
      case 'in_process': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-red-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">South Wheels Trust</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-red-600">Home</a>
              <a href="#" className="text-gray-700 hover:text-red-600">Browse Cars</a>
              <a href="#" className="text-gray-700 hover:text-red-600">My Bookings</a>
              <a href="#" className="text-gray-700 hover:text-red-600">My Profile</a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">{profile?.full_name || 'Customer'}</span>
              </div>
              <Button 
                onClick={signOut}
                variant="outline" 
                size="sm"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {profile?.full_name || 'Customer'}!
          </h1>
          <p className="text-red-100 text-lg">
            Trusted Used Cars Across South India
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-red-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white h-16">
                    <Search className="h-6 w-6 mr-2" />
                    Browse Available Cars
                  </Button>
                  <Button variant="outline" className="h-16 border-red-600 text-red-600 hover:bg-red-50">
                    <MessageCircle className="h-6 w-6 mr-2" />
                    Send Enquiry
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* My Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-red-600" />
                  My Bookings & Advance Payments
                </CardTitle>
                <CardDescription>
                  Track your car bookings and payment status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No bookings yet. Start browsing our cars!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{booking.cars.name}</h3>
                            <p className="text-sm text-gray-600">
                              Booked on {new Date(booking.booking_date).toLocaleDateString()}
                            </p>
                            <p className="text-sm font-medium text-green-600">
                              Amount Paid: ₹{booking.amount_paid.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right space-y-2">
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                            <br />
                            <Badge className={getNocStatusColor(booking.noc_status)}>
                              NOC: {booking.noc_status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Messages & Enquiries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-red-600" />
                  Messages & Enquiries
                </CardTitle>
                <CardDescription>
                  Your conversations with our team
                </CardDescription>
              </CardHeader>
              <CardContent>
                {enquiries.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No enquiries yet. Feel free to ask us anything!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enquiries.slice(0, 3).map((enquiry) => (
                      <div key={enquiry.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-gray-900">{enquiry.subject}</h3>
                          <Badge className={enquiry.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {enquiry.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{enquiry.message}</p>
                        {enquiry.admin_reply && (
                          <div className="bg-gray-50 p-3 rounded mt-2">
                            <p className="text-sm font-medium text-gray-700">Admin Reply:</p>
                            <p className="text-sm text-gray-600">{enquiry.admin_reply}</p>
                          </div>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(enquiry.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* NOC Status Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-red-600" />
                  NOC Status Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-sm text-gray-500">No active bookings</p>
                ) : (
                  <div className="space-y-3">
                    {bookings.filter(b => b.noc_status !== 'ready').map((booking) => (
                      <div key={booking.id} className="text-sm">
                        <p className="font-medium text-gray-900">{booking.cars.name}</p>
                        <div className="flex items-center mt-1">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            booking.noc_status === 'pending' ? 'bg-red-500' :
                            booking.noc_status === 'in_process' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                          <span className="text-gray-600">
                            {booking.noc_status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600">
                  <User className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Booking History
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Car className="h-6 w-6 text-red-600 mr-2" />
                <span className="text-lg font-bold">South Wheels Trust</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner for quality used cars across South India.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Our Story</a></li>
                <li><a href="#" className="hover:text-white">Why Choose Us</a></li>
                <li><a href="#" className="hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📞 +91 98765 43210</li>
                <li>📧 info@southwheelstrust.com</li>
                <li>📍 Bangalore, Karnataka</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">WhatsApp Chat</a></li>
                <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 South Wheels Trust. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
