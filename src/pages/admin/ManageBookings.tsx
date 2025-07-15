import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, ArrowLeft, Calendar, Car, User, Phone, CheckCircle, XCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: number;
  customerName: string;
  customerPhone: string;
  carName: string;
  carPrice: string;
  bookingDate: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  amountPaid: string;
  location: string;
  notes?: string;
}

const ManageBookings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      customerName: "John Customer",
      customerPhone: "+91 9876543210",
      carName: "Hyundai i20 Sportz",
      carPrice: "₹6.2L",
      bookingDate: "2024-01-15",
      status: "Confirmed",
      amountPaid: "₹50,000",
      location: "Bangalore",
      notes: "Customer requested additional inspection"
    },
    {
      id: 2,
      customerName: "Sarah Wilson",
      customerPhone: "+91 8765432109",
      carName: "Toyota Innova",
      carPrice: "₹12.8L",
      bookingDate: "2024-01-10",
      status: "Pending",
      amountPaid: "₹25,000",
      location: "Visakhapatnam",
      notes: "Waiting for loan approval"
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      customerPhone: "+91 7654321098",
      carName: "Maruti Swift VDI",
      carPrice: "₹4.5L",
      bookingDate: "2024-01-12",
      status: "Completed",
      amountPaid: "₹4.5L",
      location: "Hyderabad",
      notes: "Full payment completed, car delivered"
    },
    {
      id: 4,
      customerName: "Emily Davis",
      customerPhone: "+91 6543210987",
      carName: "Honda City ZX",
      carPrice: "₹8.5L",
      bookingDate: "2024-01-18",
      status: "Cancelled",
      amountPaid: "₹0",
      location: "Vijayawada",
      notes: "Customer changed mind, advance refunded"
    }
  ]);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.carName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: number, newStatus: "Pending" | "Confirmed" | "Completed" | "Cancelled") => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ));
    toast({
      title: "Success",
      description: "Booking status updated successfully!"
    });
  };

  const handleContactCustomer = (booking: Booking) => {
    toast({
      title: "Contact Customer",
      description: `Calling ${booking.customerName} at ${booking.customerPhone}`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed": return "bg-green-100 text-green-800";
      case "Pending": return "bg-orange-100 text-orange-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Confirmed": return <CheckCircle className="h-4 w-4" />;
      case "Pending": return <Clock className="h-4 w-4" />;
      case "Completed": return <CheckCircle className="h-4 w-4" />;
      case "Cancelled": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "Pending").length,
    confirmed: bookings.filter(b => b.status === "Confirmed").length,
    completed: bookings.filter(b => b.status === "Completed").length,
    cancelled: bookings.filter(b => b.status === "Cancelled").length
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
              <FileText className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Manage Bookings</h1>
                <p className="text-sm text-gray-500">Track and manage customer bookings</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-500">Total</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-xs text-gray-500">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{stats.confirmed}</p>
              <p className="text-xs text-gray-500">Confirmed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{stats.completed}</p>
              <p className="text-xs text-gray-500">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{stats.cancelled}</p>
              <p className="text-xs text-gray-500">Cancelled</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search bookings by customer, car, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Confirmed">Confirmed</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">#{booking.id}</h3>
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1">{booking.status}</span>
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <User className="mr-1 h-4 w-4" />
                          Customer
                        </div>
                        <p className="font-medium">{booking.customerName}</p>
                        <p className="text-gray-500">{booking.customerPhone}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <Car className="mr-1 h-4 w-4" />
                          Car Details
                        </div>
                        <p className="font-medium">{booking.carName}</p>
                        <p className="text-red-600 font-semibold">{booking.carPrice}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <Calendar className="mr-1 h-4 w-4" />
                          Booking Info
                        </div>
                        <p className="font-medium">{booking.bookingDate}</p>
                        <p className="text-gray-500">📍 {booking.location}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center text-gray-600 mb-1">
                          <span className="mr-1">💰</span>
                          Payment
                        </div>
                        <p className="font-medium text-green-600">{booking.amountPaid}</p>
                        <p className="text-gray-500">Paid</p>
                      </div>
                    </div>
                    
                    {booking.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-600">
                          <strong>Notes:</strong> {booking.notes}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-48">
                    <Select
                      value={booking.status}
                      onValueChange={(value: "Pending" | "Confirmed" | "Completed" | "Cancelled") => 
                        handleStatusChange(booking.id, value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleContactCustomer(booking)}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Contact Customer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "No bookings available"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;