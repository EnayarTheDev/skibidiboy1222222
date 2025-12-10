import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthProvider";
import { usePriceAlertNotifications } from "@/hooks/usePriceAlertNotifications";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import Values from "./pages/Values";
import GameDetail from "./pages/GameDetail";
import Shop from "./pages/Shop";
import Trades from "./pages/Trades";
import BlackMarket from "./pages/BlackMarket";
import Auth from "./pages/Auth";
import Inventory from "./pages/Inventory";
import WFL from "./pages/WFL";
import Alerts from "./pages/Alerts";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  // Enable real-time price alert notifications
  usePriceAlertNotifications();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/values" element={<Values />} />
        <Route path="/game/:slug" element={<GameDetail />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/blackmarket" element={<BlackMarket />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/wfl" element={<WFL />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
