import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

export const RecentCarsSection = () => {
  const cars = [{
    id: 1,
    name: "Maruti Swift VDI",
    price: "₹4.5 Lakh",
    kmDriven: "45,000 km",
    year: "2019",
    location: "Hyderabad",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130591/swift-exterior-right-front-three-quarter-109.jpeg?isig=0&q=80"
  }, {
    id: 2,
    name: "Hyundai i20 Sportz",
    price: "₹6.2 Lakh",
    kmDriven: "32,000 km",
    year: "2020",
    location: "Bangalore",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/i20-exterior-right-front-three-quarter-4.jpeg?isig=0&q=80"
  }, {
    id: 3,
    name: "Honda City ZX",
    price: "₹8.5 Lakh",
    kmDriven: "28,000 km",
    year: "2021",
    location: "Vijayawada",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-76.jpeg?isig=0&q=80"
  }, {
    id: 4,
    name: "Toyota Innova Crysta",
    price: "₹12.8 Lakh",
    kmDriven: "55,000 km",
    year: "2019",
    location: "Visakhapatnam",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/115025/innova-crysta-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80"
  }, {
    id: 5,
    name: "Tata Nexon XZ+",
    price: "₹7.2 Lakh",
    kmDriven: "18,000 km",
    year: "2022",
    location: "Mysore",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80"
  }, {
    id: 6,
    name: "Mahindra XUV300",
    price: "₹9.1 Lakh",
    kmDriven: "25,000 km",
    year: "2021",
    location: "Warangal",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/40087/xuv300-exterior-right-front-three-quarter-11.jpeg?isig=0&q=80"
  }];

  const handleQuickView = (carName: string) => {
    alert(`Quick view for ${carName} - Feature coming soon!`);
  };

  const handleViewAllCars = () => {
    alert('View all cars feature coming soon!');
  };

  return (
    <section id="recent-cars-section" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">
            Recently Added Cars
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Check out our latest verified vehicles ready for immediate purchase
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
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
                    
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700" 
                      onClick={() => handleQuickView(car.name)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Quick View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white" 
              onClick={handleViewAllCars}
            >
              View All Cars
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
