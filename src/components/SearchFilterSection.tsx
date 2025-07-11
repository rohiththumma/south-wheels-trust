
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export const SearchFilterSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
            Find Your Perfect Car
          </h2>
          
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700">Location</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="vijayawada">Vijayawada</SelectItem>
                      <SelectItem value="visakhapatnam">Visakhapatnam</SelectItem>
                      <SelectItem value="mysore">Mysore</SelectItem>
                      <SelectItem value="warangal">Warangal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700">Car Brand</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maruti">Maruti Suzuki</SelectItem>
                      <SelectItem value="hyundai">Hyundai</SelectItem>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="toyota">Toyota</SelectItem>
                      <SelectItem value="tata">Tata</SelectItem>
                      <SelectItem value="mahindra">Mahindra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700">Price Range</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">Under ₹2 Lakh</SelectItem>
                      <SelectItem value="2-5">₹2-5 Lakh</SelectItem>
                      <SelectItem value="5-10">₹5-10 Lakh</SelectItem>
                      <SelectItem value="10-15">₹10-15 Lakh</SelectItem>
                      <SelectItem value="15+">Above ₹15 Lakh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700">KM Driven</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select KM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-20">Under 20,000 km</SelectItem>
                      <SelectItem value="20-50">20,000-50,000 km</SelectItem>
                      <SelectItem value="50-100">50,000-1,00,000 km</SelectItem>
                      <SelectItem value="100+">Above 1,00,000 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button className="bg-red-600 hover:bg-red-700 px-8 py-3 text-lg">
                  <Search className="mr-2 h-5 w-5" />
                  Search Cars
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
