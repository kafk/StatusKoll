import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import IconSuggestions from "./components/IconSuggestions";
import Changelog from "./pages/Changelog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Support from "./pages/Support";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import TeamSettingsPage from "./pages/settings/TeamSettingsPage";
import LanguageSettingsPage from "./pages/settings/LanguageSettingsPage";
import SuggestionsPage from "./pages/settings/SuggestionsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/icons" element={<IconSuggestions />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/support" element={<Support />} />
            <Route path="/settings/team" element={<TeamSettingsPage />} />
            <Route path="/settings/language" element={<LanguageSettingsPage />} />
            <Route path="/settings/suggestions" element={<SuggestionsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
