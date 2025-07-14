import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Users, FileText, Settings, LogOut, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const stats = [
    { title: "Total Cars", value: "45", icon: Car, color: "text-blue-600" },
    { title: "Active Customers", value: "128", icon: Users, color: "text-green-600" },
    { title: "Pending Bookings", value: "12", icon: FileText, color: "text-orange-600" },
    { title: "Total Revenue", value: "₹12.5L", icon: Car, color: "text-purple-600" },
  ];

  const recentCars = [
    { id: 1, name: "Maruti Swift VDI", price: "₹4.5L", status: "Available", location: "Hyderabad" },
    { id: 2, name: "Hyundai i20 Sportz", price: "₹6.2L", status: "Sold", location: "Bangalore" },
    { id: 3, name: "Honda City ZX", price: "₹8.5L", status: "Available", location: "Vijayawada" },
    { id: 4, name: "Toyota Innova", price: "₹12.8L", status: "Booked", location: "Visakhapatnam" },
  ];

  const handleAction = (action: string, carName?: string) => {
    toast({
      title: `${action} Action`,
      description: carName ? `${action} ${carName}` : `${action} feature coming soon!`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Car className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">South Wheels Trust</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
              >
                <Car className="mr-2 h-4 w-4" />
                View Website
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-12 w-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                className="h-16 bg-red-600 hover:bg-red-700"
                onClick={() => handleAction("Add New Car")}
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Car
              </Button>
              <Button 
                variant="outline" 
                className="h-16"
                onClick={() => handleAction("Manage Customers")}
              >
                <Users className="mr-2 h-5 w-5" />
                Customers
              </Button>
              <Button 
                variant="outline" 
                className="h-16"
                onClick={() => handleAction("View Bookings")}
              >
                <FileText className="mr-2 h-5 w-5" />
                Bookings
              </Button>
              <Button 
                variant="outline" 
                className="h-16"
                onClick={() => handleAction("Settings")}
              >
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Cars */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Car className="mr-2 h-5 w-5" />
                Recent Cars
              </div>
              <Button 
                size="sm" 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => handleAction("View All Cars")}
              >
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Car Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Price</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCars.map((car) => (
                    <tr key={car.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{car.name}</td>
                      <td className="py-3 px-4">{car.price}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          car.status === 'Available' ? 'bg-green-100 text-green-800' :
                          car.status === 'Sold' ? 'bg-red-100 text-red-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {car.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{car.location}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAction("View", car.name)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAction("Edit", car.name)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAction("Delete", car.name)}
                          >
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
      </div>
    </div>
  );
};

export default AdminDashboard;