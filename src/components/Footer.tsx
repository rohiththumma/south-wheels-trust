
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-red-400">
              South Wheels Trust
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner for buying verified second-hand cars across South India. 
              We specialize in providing quality used vehicles with complete NOC support 
              and transparent pricing in Telangana, Andhra Pradesh, and Karnataka.
            </p>
            
            <div className="flex space-x-4">
              <Button 
                size="sm" 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Us
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-red-400 transition-colors">Browse Cars</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Admin Login</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-red-400" />
                <span>+91 9876543210</span>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-red-400" />
                <span>info@southwheelstrust.com</span>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 text-red-400 mt-1" />
                <div>
                  <p>Head Office: Hyderabad</p>
                  <p className="text-sm">Serving: Telangana, AP, Karnataka</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 South Wheels Trust. All rights reserved. | Designed for trusted car sales across South India</p>
        </div>
      </div>
    </footer>
  );
};
