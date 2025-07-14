import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Heart, Clock, User, LogOut, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const favoritesCars = [
    { id: 1, name: "Maruti Swift VDI", price: "₹4.5L", location: "Hyderabad", image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Maruti-Swift-2011-2014/2522/front-left-side-47.jpg?imwidth=420&impolicy=resize" },
    { id: 2, name: "Honda City ZX", price: "₹8.5L", location: "Vijayawada", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-76.jpeg?isig=0&q=80" },
  ];

  const recentBookings = [
    { id: 1, carName: "Hyundai i20 Sportz", price: "₹6.2L", status: "Confirmed", date: "2024-01-15", location: "Bangalore" },
    { id: 2, carName: "Toyota Innova", price: "₹12.8L", status: "Pending", date: "2024-01-10", location: "Visakhapatnam" },
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
                <h1 className="text-xl font-bold text-gray-900">My Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
              >
                <Car className="mr-2 h-4 w-4" />
                Browse Cars
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{favoritesCars.length}</p>
                  <p className="text-sm text-gray-500">Favorites</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{recentBookings.length}</p>
                  <p className="text-sm text-gray-500">Bookings</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Car className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">45</p>
                  <p className="text-sm text-gray-500">Available Cars</p>
                </CardContent>
              </Card>
            </div>

            {/* Favorite Cars */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-red-600" />
                  My Favorite Cars
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoritesCars.map((car) => (
                    <div key={car.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <img 
                        src={car.image} 
                        alt={car.name} 
                        className="w-full h-32 object-cover rounded-md mb-3" 
                      />
                      <h3 className="font-semibold text-gray-900 mb-1">{car.name}</h3>
                      <p className="text-lg font-bold text-red-600 mb-1">{car.price}</p>
                      <p className="text-sm text-gray-500 mb-3">📍 {car.location}</p>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          onClick={() => handleAction("Contact for", car.name)}
                        >
                          Contact
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleAction("View Details", car.name)}
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-orange-600" />
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{booking.carName}</h3>
                        <p className="text-sm text-gray-500">📍 {booking.location}</p>
                        <p className="text-sm text-gray-500">📅 {booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">{booking.price}</p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile & Quick Actions */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">John Customer</h3>
                  <p className="text-sm text-gray-500">Premium Member</p>
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="mr-2 h-4 w-4" />
                    john@example.com
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="mr-2 h-4 w-4" />
                    +91 9876543210
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" />
                    Hyderabad, India
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleAction("Edit Profile")}
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => navigate('/')}
                >
                  <Car className="mr-2 h-4 w-4" />
                  Browse Cars
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleAction("View Bookings")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  My Bookings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleAction("Contact Support")}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;