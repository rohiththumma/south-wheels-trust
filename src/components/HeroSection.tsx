
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Trusted Second-Hand Cars
            <span className="block text-red-400">Across South India</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Verified vehicles with complete NOC support and easy booking across 
            <span className="font-semibold text-white"> Telangana, Andhra Pradesh, and Karnataka</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
              Browse Cars
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button size="lg" className="bg-green-600 text-white px-8 py-3 text-lg">
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Chat
            </Button>
          </div>
        </div>
      </div>
      
      {/* Car Silhouette */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-20">
        <div className="w-96 h-48 bg-gradient-to-t from-white to-transparent rounded-t-full"></div>
      </div>
    </section>
  );
};
