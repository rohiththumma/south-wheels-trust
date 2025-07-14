import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Car, User, Shield, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    userType: "customer"
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    fullName: "",
    mobile: "",
    userType: "customer"
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!loginData.email || !loginData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate login process
    setTimeout(() => {
      toast({
        title: "Success",
        description: `Welcome back! Redirecting to ${loginData.userType} dashboard...`,
      });
      
      if (loginData.userType === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!registerData.email || !registerData.password || !registerData.fullName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate registration process
    setTimeout(() => {
      toast({
        title: "Success",
        description: `Registration successful! Redirecting to ${registerData.userType} dashboard...`,
      });
      
      if (registerData.userType === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/customer-dashboard");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Header */}
        <div 
          className="flex items-center justify-center space-x-2 mb-8 cursor-pointer" 
          onClick={handleLogoClick}
        >
          <Car className="h-8 w-8 text-red-600" />
          <span className="text-2xl font-bold text-slate-800">South Wheels Trust</span>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-slate-800">
              Welcome
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-type">Login as</Label>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant={loginData.userType === "customer" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setLoginData({...loginData, userType: "customer"})}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Customer
                      </Button>
                      <Button
                        type="button"
                        variant={loginData.userType === "admin" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setLoginData({...loginData, userType: "admin"})}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Admin
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : `Login as ${loginData.userType}`}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-type">Register as</Label>
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant={registerData.userType === "customer" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setRegisterData({...registerData, userType: "customer"})}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Customer
                      </Button>
                      <Button
                        type="button"
                        variant={registerData.userType === "admin" ? "default" : "outline"}
                        size="sm"
                        className="flex-1"
                        onClick={() => setRegisterData({...registerData, userType: "admin"})}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Admin
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerData.fullName}
                      onChange={(e) => setRegisterData({...registerData, fullName: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-mobile">Mobile Number</Label>
                    <Input
                      id="register-mobile"
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={registerData.mobile}
                      onChange={(e) => setRegisterData({...registerData, mobile: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : `Register as ${registerData.userType}`}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;