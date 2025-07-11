
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export const CallToActionSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Have a car in mind? Let's help you find it!
          </h2>
          
          <p className="text-xl mb-8 opacity-90">
            Can't find what you're looking for? Our team will help you locate the perfect car 
            that matches your requirements and budget.
          </p>
          
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now: +91 9876543210
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="opacity-90">Cars Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">3</div>
              <div className="opacity-90">States Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="opacity-90">NOC Assistance</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
