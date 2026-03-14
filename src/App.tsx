import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import RankersLibrary from "./pages/RankersLibrary";
import StudyVault from "./pages/StudyVault";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import AppAbout from "./pages/AppAbout";
import Contribute from "./pages/Contribute";
import AITest from "./pages/AITest";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import AdSenseDisclaimer from "./pages/AdSenseDisclaimer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/adsense-disclaimer" element={<AdSenseDisclaimer />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="library" element={<RankersLibrary />} />
            <Route path="vault" element={<StudyVault />} />
            <Route path="profile" element={<Profile />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="about" element={<AppAbout />} />
            <Route path="contribute" element={<Contribute />} />
            <Route path="test" element={<AITest />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
