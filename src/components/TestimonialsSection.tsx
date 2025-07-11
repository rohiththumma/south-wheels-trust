
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Hyderabad",
      rating: 5,
      text: "Excellent service! They helped me find the perfect car within my budget. The NOC process was handled seamlessly.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Bangalore",
      rating: 5,
      text: "Very transparent pricing and genuine cars. The team was professional and the delivery was on time. Highly recommended!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332aa87?w=80&h=80&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Suresh Reddy",
      location: "Vijayawada",
      rating: 5,
      text: "Got my dream car at an amazing price. The advance payment system is very convenient and secure. Great experience overall!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">
            What Our Customers Say
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Don't just take our word for it - see what our satisfied customers have to say
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">📍 {testimonial.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 italic">
                    "{testimonial.text}"
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
