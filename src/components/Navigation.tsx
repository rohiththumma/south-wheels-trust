
import { Button } from "@/components/ui/button";
import { Car, Phone, User, Search, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Navigation = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrowseCarsClick = () => {
    const carsSection = document.getElementById('recent-cars-section');
    if (carsSection) {
      carsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHowItWorksClick = () => {
    const howItWorksSection = document.getElementById('how-it-works-section');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Clickable to return to landing page */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={handleLogoClick}
          >
            <Car className="h-8 w-8 text-red-600" />
            <span className="text-xl font-bold text-slate-800">South Wheels Trust</span>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Button 
                    variant="ghost" 
                    className="text-slate-700 hover:text-red-600"
                    onClick={handleHomeClick}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button 
                    variant="ghost" 
                    className="text-slate-700 hover:text-red-600"
                    onClick={handleBrowseCarsClick}
                  >
                    <Car className="mr-2 h-4 w-4" />
                    Browse Cars
                  </Button>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Button 
                    variant="ghost" 
                    className="text-slate-700 hover:text-red-600"
                    onClick={handleHowItWorksClick}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    How It Works
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              size="sm" 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleLoginClick}
            >
              <User className="mr-2 h-4 w-4" />
              Login / Register
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
