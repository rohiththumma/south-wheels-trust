
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  Car, 
  LogOut, 
  Users, 
  DollarSign, 
  MessageCircle, 
  Plus,
  BarChart3,
  Settings,
  FileText,
  Edit,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DashboardStats {
  totalCars: number;
  totalPayments: number;
  totalCustomers: number;
  newEnquiries: number;
}

interface CarListing {
  id: string;
  name: string;
  brand: string;
  price: number;
  km_driven: number;
  status: string;
  images: any;
  created_at: string;
}

interface Booking {
  id: string;
  amount_paid: number;
  booking_date: string;
  status: string;
  noc_status: string;
  cars: {
    name: string;
  };
  customer_name: string;
}

interface Enquiry {
  id: string;
  subject: string;
  message: string;
  admin_reply: string | null;
  status: string;
  created_at: string;
  customer_name: string;
}

export const AdminDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({ totalCars: 0, totalPayments: 0, totalCustomers: 0, newEnquiries: 0 });
  const [cars, setCars] = useState<CarListing[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch cars
      const { data: carsData } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch bookings with car details and customer names separately
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select(`
          *,
          cars (name)
        `)
        .order('booking_date', { ascending: false });

      // Fetch customer names for bookings
      const bookingsWithCustomers = await Promise.all(
        (bookingsData || []).map(async (booking) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', booking.customer_id)
            .single();
          
          return {
            ...booking,
            customer_name: profileData?.full_name || 'Unknown Customer'
          };
        })
      );

      // Fetch enquiries with customer details separately
      const { data: enquiriesData } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch customer names for enquiries
      const enquiriesWithCustomers = await Promise.all(
        (enquiriesData || []).map(async (enquiry) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', enquiry.customer_id)
            .single();
          
          return {
            ...enquiry,
            customer_name: profileData?.full_name || 'Unknown Customer'
          };
        })
      );

      // Fetch customer count
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id')
        .eq('role', 'customer');

      setCars(carsData || []);
      setBookings(bookingsWithCustomers);
      setEnquiries(enquiriesWithCustomers);

      // Calculate stats
      const totalPayments = bookingsWithCustomers.reduce((sum, booking) => sum + Number(booking.amount_paid), 0);
      const newEnquiries = enquiriesWithCustomers.filter(e => e.status === 'pending').length;

      setStats({
        totalCars: carsData?.length || 0,
        totalPayments,
        totalCustomers: profilesData?.length || 0,
        newEnquiries
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'booked': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-red-100 text-red-800';
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
              <span className="text-xl font-bold text-gray-900">South Wheels Trust - Admin</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-red-600">Dashboard</a>
              <a href="#" className="text-gray-700 hover:text-red-600">Add New Car</a>
              <a href="#" className="text-gray-700 hover:text-red-600">Manage Listings</a>
              <a href="#" className="text-gray-700 hover:text-red-600">Payments</a>
              <a href="#" className="text-gray-700 hover:text-red-600">Enquiries</a>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">{profile?.full_name || 'Admin'}</span>
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

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-red-600 text-white min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">Admin Menu</h2>
            <nav className="space-y-2">
              <a href="#" className="flex items-center px-4 py-2 rounded hover:bg-red-700">
                <BarChart3 className="h-5 w-5 mr-3" />
                Dashboard
              </a>
              <a href="#" className="flex items-center px-4 py-2 rounded hover:bg-red-700">
                <Plus className="h-5 w-5 mr-3" />
                Add New Car
              </a>
              <a href="#" className="flex items-center px-4 py-2 rounded hover:bg-red-700">
                <Car className="h-5 w-5 mr-3" />
                Manage Listings
              </a>
              <a href="#" className="flex items-center px-4 py-2 rounded hover:bg-red-700">
                <DollarSign className="h-5 w-5 mr-3" />
                Payments
              </a>
              <a href="#" className="flex items-center px-4 py-2 rounded hover:bg-red-700">
                <MessageCircle className="h-5 w-5 mr-3" />
                Enquiries
              </a>
              <a href="#" className="flex items-center px-4 py-2 rounded hover:bg-red-700">
                <FileText className="h-5 w-5 mr-3" />
                NOC Tracker
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Car className="h-8 w-8 text-red-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Cars Listed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCars}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Advance Payments</p>
                    <p className="text-2xl font-bold text-gray-900">₹{stats.totalPayments.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Active Customers</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MessageCircle className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">New Messages</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.newEnquiries}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Car Listings Management */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Manage Car Listings</CardTitle>
                  <CardDescription>View and manage all car listings</CardDescription>
                </div>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Car
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Car Name</th>
                      <th className="text-left py-3 px-4">Brand</th>
                      <th className="text-left py-3 px-4">KMs</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.slice(0, 5).map((car) => (
                      <tr key={car.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{car.name}</td>
                        <td className="py-3 px-4">{car.brand}</td>
                        <td className="py-3 px-4">{car.km_driven.toLocaleString()} km</td>
                        <td className="py-3 px-4">₹{car.price.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(car.status)}>
                            {car.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings & Payments</CardTitle>
                <CardDescription>Latest customer bookings and payment status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.customer_name}</h3>
                          <p className="text-sm text-gray-600">{booking.cars?.name}</p>
                          <p className="text-sm font-medium text-green-600">
                            ₹{booking.amount_paid.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={booking.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {booking.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(booking.booking_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Enquiries */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Enquiries</CardTitle>
                <CardDescription>Messages from customers requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enquiries.slice(0, 5).map((enquiry) => (
                    <div key={enquiry.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{enquiry.customer_name}</h3>
                        <Badge className={enquiry.status === 'replied' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {enquiry.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-1">{enquiry.subject}</p>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{enquiry.message}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-400">
                          {new Date(enquiry.created_at).toLocaleDateString()}
                        </p>
                        {enquiry.status === 'pending' && (
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            Reply
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
