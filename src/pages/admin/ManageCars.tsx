import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Plus, Edit, Trash2, Eye, Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface CarData {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: string;
  kmDriven: string;
  fuelType: string;
  location: string;
  status: "Available" | "Sold" | "Booked";
  images?: string[];
  description?: string;
}

const ManageCars = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddCarOpen, setIsAddCarOpen] = useState(false);

  const [cars, setCars] = useState<CarData[]>([
    {
      id: 1,
      name: "Maruti Swift VDI",
      brand: "Maruti",
      model: "Swift",
      year: 2020,
      price: "₹4.5L",
      kmDriven: "25,000",
      fuelType: "Diesel",
      location: "Hyderabad",
      status: "Available",
      description: "Well maintained car with all papers clear"
    },
    {
      id: 2,
      name: "Hyundai i20 Sportz",
      brand: "Hyundai",
      model: "i20",
      year: 2019,
      price: "₹6.2L",
      kmDriven: "30,000",
      fuelType: "Petrol",
      location: "Bangalore",
      status: "Sold",
      description: "Excellent condition, single owner"
    },
    {
      id: 3,
      name: "Honda City ZX",
      brand: "Honda",
      model: "City",
      year: 2021,
      price: "₹8.5L",
      kmDriven: "15,000",
      fuelType: "Petrol",
      location: "Vijayawada",
      status: "Available",
      description: "Like new condition with warranty"
    },
    {
      id: 4,
      name: "Toyota Innova",
      brand: "Toyota",
      model: "Innova",
      year: 2018,
      price: "₹12.8L",
      kmDriven: "45,000",
      fuelType: "Diesel",
      location: "Visakhapatnam",
      status: "Booked",
      description: "Perfect for family trips"
    }
  ]);

  const [newCar, setNewCar] = useState({
    name: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    kmDriven: "",
    fuelType: "",
    location: "",
    description: ""
  });

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || car.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddCar = () => {
    if (!newCar.name || !newCar.brand || !newCar.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const carToAdd: CarData = {
      ...newCar,
      id: Date.now(),
      status: "Available" as const,
      year: Number(newCar.year)
    };

    setCars([...cars, carToAdd]);
    setNewCar({
      name: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      price: "",
      kmDriven: "",
      fuelType: "",
      location: "",
      description: ""
    });
    setIsAddCarOpen(false);
    
    toast({
      title: "Success",
      description: "Car added successfully!"
    });
  };

  const handleDeleteCar = (id: number) => {
    setCars(cars.filter(car => car.id !== id));
    toast({
      title: "Success",
      description: "Car deleted successfully!"
    });
  };

  const handleStatusChange = (id: number, newStatus: "Available" | "Sold" | "Booked") => {
    setCars(cars.map(car => 
      car.id === id ? { ...car, status: newStatus } : car
    ));
    toast({
      title: "Success",
      description: "Car status updated successfully!"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "Sold": return "bg-red-100 text-red-800";
      case "Booked": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
              <Car className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Manage Cars</h1>
                <p className="text-sm text-gray-500">Add, edit, and manage your car inventory</p>
              </div>
            </div>
            <Dialog open={isAddCarOpen} onOpenChange={setIsAddCarOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Car
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Car</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Car Name *</Label>
                    <Input
                      id="name"
                      value={newCar.name}
                      onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
                      placeholder="e.g., Maruti Swift VDI"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand *</Label>
                    <Input
                      id="brand"
                      value={newCar.brand}
                      onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                      placeholder="e.g., Maruti"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      value={newCar.model}
                      onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                      placeholder="e.g., Swift"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      value={newCar.year}
                      onChange={(e) => setNewCar({ ...newCar, year: Number(e.target.value) })}
                      min="2000"
                      max={new Date().getFullYear()}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      value={newCar.price}
                      onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                      placeholder="e.g., ₹4.5L"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kmDriven">KM Driven</Label>
                    <Input
                      id="kmDriven"
                      value={newCar.kmDriven}
                      onChange={(e) => setNewCar({ ...newCar, kmDriven: e.target.value })}
                      placeholder="e.g., 25,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <Select value={newCar.fuelType} onValueChange={(value) => setNewCar({ ...newCar, fuelType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Petrol">Petrol</SelectItem>
                        <SelectItem value="Diesel">Diesel</SelectItem>
                        <SelectItem value="CNG">CNG</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newCar.location}
                      onChange={(e) => setNewCar({ ...newCar, location: e.target.value })}
                      placeholder="e.g., Hyderabad"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newCar.description}
                      onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
                      placeholder="Describe the car condition, features, etc."
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddCarOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCar} className="bg-red-600 hover:bg-red-700">
                    Add Car
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search cars by name, brand, or location..."
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
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                  <SelectItem value="Booked">Booked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{car.name}</CardTitle>
                    <p className="text-sm text-gray-500">{car.year} • {car.kmDriven} km</p>
                  </div>
                  <Badge className={getStatusColor(car.status)}>
                    {car.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <p className="text-xl font-bold text-red-600">{car.price}</p>
                  <p className="text-sm text-gray-600">📍 {car.location}</p>
                  <p className="text-sm text-gray-600">⛽ {car.fuelType}</p>
                  {car.description && (
                    <p className="text-sm text-gray-500 line-clamp-2">{car.description}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Select
                    value={car.status}
                    onValueChange={(value: "Available" | "Sold" | "Booked") => 
                      handleStatusChange(car.id, value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Sold">Sold</SelectItem>
                      <SelectItem value="Booked">Booked</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteCar(car.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
              <p className="text-gray-500">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "Start by adding your first car"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ManageCars;