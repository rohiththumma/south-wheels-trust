
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, FileText, Eye, CreditCard } from "lucide-react";

export const WhyChooseUsSection = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Cars Only",
      description: "Every car undergoes thorough inspection and verification before listing"
    },
    {
      icon: FileText,
      title: "NOC Assistance for Every Car",
      description: "Complete documentation support including NOC clearance assistance"
    },
    {
      icon: Eye,
      title: "Transparent Pricing",
      description: "No hidden charges. What you see is what you pay"
    },
    {
      icon: CreditCard,
      title: "Pay Advance Online",
      description: "Secure online payment options to book your favorite car instantly"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">
            Why Choose Us?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We're committed to providing you with the best car buying experience across South India
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-2 hover:border-red-200">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <feature.icon className="h-8 w-8 text-red-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-slate-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
