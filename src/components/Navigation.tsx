
import { Button } from "@/components/ui/button";
import { Car, Phone, MessageCircle, User, Search, Home } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Navigation = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-red-600" />
            <span className="text-xl font-bold text-slate-800">South Wheels Trust</span>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button variant="ghost" className="text-slate-700 hover:text-red-600">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button variant="ghost" className="text-slate-700 hover:text-red-600">
                    <Car className="mr-2 h-4 w-4" />
                    Browse Cars
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button variant="ghost" className="text-slate-700 hover:text-red-600">
                    <Search className="mr-2 h-4 w-4" />
                    How It Works
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button variant="ghost" className="text-slate-700 hover:text-red-600">
                    About Us
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <Button size="sm" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Chat
            </Button>
            
            <Button size="sm" className="bg-red-600 hover:bg-red-700">
              <User className="mr-2 h-4 w-4" />
              Login / Register
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
