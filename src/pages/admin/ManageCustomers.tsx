import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Search, ArrowLeft, Phone, Mail, MapPin, Calendar, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  status: "Active" | "Inactive";
  totalBookings: number;
  favoritesCars: number;
  lastActive: string;
}

const ManageCustomers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: "John Customer",
      email: "john@example.com",
      phone: "+91 9876543210",
      location: "Hyderabad",
      joinDate: "2024-01-15",
      status: "Active",
      totalBookings: 3,
      favoritesCars: 5,
      lastActive: "2024-01-20"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+91 8765432109",
      location: "Bangalore",
      joinDate: "2024-01-10",
      status: "Active",
      totalBookings: 1,
      favoritesCars: 2,
      lastActive: "2024-01-19"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91 7654321098",
      location: "Vijayawada",
      joinDate: "2023-12-20",
      status: "Inactive",
      totalBookings: 0,
      favoritesCars: 1,
      lastActive: "2024-01-10"
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+91 6543210987",
      location: "Visakhapatnam",
      joinDate: "2024-01-05",
      status: "Active",
      totalBookings: 2,
      favoritesCars: 3,
      lastActive: "2024-01-21"
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactCustomer = (customer: Customer) => {
    toast({
      title: "Contact Customer",
      description: `Contacting ${customer.name} at ${customer.phone}`
    });
  };

  const handleViewBookings = (customer: Customer) => {
    toast({
      title: "View Bookings",
      description: `Viewing bookings for ${customer.name}`
    });
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/admin-dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <Users className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Manage Customers</h1>
                <p className="text-sm text-gray-500">View and manage customer information</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search customers by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              <p className="text-sm text-gray-500">Total Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {customers.filter(c => c.status === "Active").length}
              </p>
              <p className="text-sm text-gray-500">Active Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Car className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {customers.reduce((sum, c) => sum + c.totalBookings, 0)}
              </p>
              <p className="text-sm text-gray-500">Total Bookings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {customers.filter(c => {
                  const lastActive = new Date(c.lastActive);
                  const sevenDaysAgo = new Date();
                  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                  return lastActive > sevenDaysAgo;
                }).length}
              </p>
              <p className="text-sm text-gray-500">Active This Week</p>
            </CardContent>
          </Card>
        </div>

        {/* Customers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <p className="text-sm text-gray-500">Member since {customer.joinDate}</p>
                  </div>
                  <Badge className={getStatusColor(customer.status)}>
                    {customer.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="mr-2 h-4 w-4" />
                    {customer.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="mr-2 h-4 w-4" />
                    {customer.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    {customer.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    Last active: {customer.lastActive}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{customer.totalBookings}</p>
                      <p className="text-xs text-gray-500">Bookings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{customer.favoritesCars}</p>
                      <p className="text-xs text-gray-500">Favorites</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleContactCustomer(customer)}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleViewBookings(customer)}
                    >
                      <Car className="h-4 w-4 mr-1" />
                      Bookings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
              <p className="text-gray-500">
                Try adjusting your search criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ManageCustomers;