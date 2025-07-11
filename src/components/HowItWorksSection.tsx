
import { Card, CardContent } from "@/components/ui/card";
import { Search, CreditCard, Truck } from "lucide-react";

export const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      icon: Search,
      title: "Browse Cars",
      description: "Search through our verified collection of second-hand cars using our advanced filters"
    },
    {
      step: 2,
      icon: CreditCard,
      title: "Pay Advance & Contact",
      description: "Pay a small advance online to book your car and get in touch with our team"
    },
    {
      step: 3,
      icon: Truck,
      title: "Get Delivery + NOC",
      description: "We'll deliver your car with complete documentation and NOC assistance"
    }
  ];

  return (
    <section id="how-it-works-section" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Simple 3-step process to get your dream car delivered to your doorstep
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="flex justify-center mb-4">
                      <div className="bg-red-100 p-3 rounded-full">
                        <step.icon className="h-8 w-8 text-red-600" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-slate-800">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                      →
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
