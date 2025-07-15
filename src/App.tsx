
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import NotFound from "./pages/NotFound";
import ManageCars from "./pages/admin/ManageCars";
import ManageCustomers from "./pages/admin/ManageCustomers";
import ManageBookings from "./pages/admin/ManageBookings";
import MyBookings from "./pages/customer/MyBookings";
import MyProfile from "./pages/customer/MyProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/admin/manage-cars" element={<ManageCars />} />
          <Route path="/admin/manage-customers" element={<ManageCustomers />} />
          <Route path="/admin/manage-bookings" element={<ManageBookings />} />
          <Route path="/customer/my-bookings" element={<MyBookings />} />
          <Route path="/customer/my-profile" element={<MyProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
