
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

export const RecentCarsSection = () => {
  const cars = [
    {
      id: 1,
      name: "Maruti Swift VDI",
      price: "₹4.5 Lakh",
      kmDriven: "45,000 km",
      year: "2019",
      location: "Hyderabad",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      name: "Hyundai i20 Sportz",
      price: "₹6.2 Lakh",
      kmDriven: "32,000 km",
      year: "2020",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      name: "Honda City ZX",
      price: "₹8.5 Lakh",
      kmDriven: "28,000 km",
      year: "2021",
      location: "Vijayawada",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      name: "Toyota Innova Crysta",
      price: "₹12.8 Lakh",
      kmDriven: "55,000 km",
      year: "2019",
      location: "Visakhapatnam",
      image: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      name: "Tata Nexon XZ+",
      price: "₹7.2 Lakh",
      kmDriven: "18,000 km",
      year: "2022",
      location: "Mysore",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      name: "Mahindra XUV300",
      price: "₹9.1 Lakh",
      kmDriven: "25,000 km",
      year: "2021",
      location: "Warangal",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">
            Recently Added Cars
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Check out our latest verified vehicles ready for immediate purchase
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                    {car.year}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-slate-800">
                    {car.name}
                  </h3>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-red-600">
                      {car.price}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {car.kmDriven}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">
                      📍 {car.location}
                    </span>
                    
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      <Eye className="mr-1 h-4 w-4" />
                      Quick View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              View All Cars
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
