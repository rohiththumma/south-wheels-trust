import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Car, CheckCircle, Clock, XCircle, Phone, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: number;
  carName: string;
  carPrice: string;
  bookingDate: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  amountPaid: string;
  location: string;
  carImage: string;
  deliveryDate?: string;
  notes?: string;
}

const MyBookings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [bookings] = useState<Booking[]>([
    {
      id: 1,
      carName: "Hyundai i20 Sportz",
      carPrice: "₹6.2L",
      bookingDate: "2024-01-15",
      status: "Confirmed",
      amountPaid: "₹50,000",
      location: "Bangalore",
      carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/i20-exterior-right-front-three-quarter-76.jpeg?isig=0&q=80",
      deliveryDate: "2024-01-25",
      notes: "Inspection completed. Ready for delivery."
    },
    {
      id: 2,
      carName: "Toyota Innova",
      carPrice: "₹12.8L",
      bookingDate: "2024-01-10",
      status: "Pending",
      amountPaid: "₹25,000",
      location: "Visakhapatnam",
      carImage: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/innova-crysta-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80",
      notes: "Waiting for loan approval documentation."
    },
    {
      id: 3,
      carName: "Maruti Swift VDI",
      carPrice: "₹4.5L",
      bookingDate: "2024-01-12",
      status: "Completed",
      amountPaid: "₹4.5L",
      location: "Hyderabad",
      carImage: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Maruti-Swift-2011-2014/2522/front-left-side-47.jpg?imwidth=420&impolicy=resize",
      deliveryDate: "2024-01-20",
      notes: "Car delivered successfully. Thank you for choosing us!"
    }
  ]);

  const handleContactSupport = (booking: Booking) => {
    toast({
      title: "Contact Support",
      description: `Getting support for booking #${booking.id}`
    });
  };

  const handleCancelBooking = (booking: Booking) => {
    toast({
      title: "Cancel Booking",
      description: `Cancellation request for booking #${booking.id} has been submitted`
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
    completed: bookings.filter(b => b.status === "Completed").length
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
                onClick={() => navigate('/customer-dashboard')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <Calendar className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">My Bookings</h1>
                <p className="text-sm text-gray-500">Track your car bookings and purchases</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-500">Total Bookings</p>
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
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Car Image */}
                  <div className="lg:w-64 flex-shrink-0">
                    <img 
                      src={booking.carImage} 
                      alt={booking.carName}
                      className="w-full h-48 lg:h-40 object-cover rounded-lg"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {booking.carName}
                        </h3>
                        <p className="text-sm text-gray-500">Booking #{booking.id}</p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1">{booking.status}</span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Car Price</p>
                        <p className="text-lg font-bold text-red-600">{booking.carPrice}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Amount Paid</p>
                        <p className="text-lg font-bold text-green-600">{booking.amountPaid}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="text-sm text-gray-900">📍 {booking.location}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Booking Date</p>
                        <p className="text-sm text-gray-900">📅 {booking.bookingDate}</p>
                      </div>
                      {booking.deliveryDate && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            {booking.status === "Completed" ? "Delivered On" : "Expected Delivery"}
                          </p>
                          <p className="text-sm text-gray-900">🚚 {booking.deliveryDate}</p>
                        </div>
                      )}
                    </div>

                    {booking.notes && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Update:</strong> {booking.notes}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleContactSupport(booking)}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Contact Support
                      </Button>
                      
                      {booking.status === "Confirmed" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Track Status
                        </Button>
                      )}
                      
                      {booking.status === "Pending" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleCancelBooking(booking)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Cancel Booking
                        </Button>
                      )}
                      
                      {booking.status === "Completed" && (
                        <Button 
                          size="sm" 
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => navigate('/')}
                        >
                          <Car className="h-4 w-4 mr-1" />
                          Book Another Car
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {bookings.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-500 mb-4">
                You haven't made any car bookings yet. Start browsing our collection!
              </p>
              <Button 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => navigate('/')}
              >
                <Car className="h-4 w-4 mr-2" />
                Browse Cars
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyBookings;