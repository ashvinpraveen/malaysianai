import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BookDemo from "./pages/BookDemo";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Company from "./pages/Company";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import CanvasOverview from "./pages/CanvasOverview";
import CommunityDirectory from "./pages/CommunityDirectory";
import ResidentsDirectory from "./pages/ResidentsDirectory";
import MalaysianAI from "./pages/MalaysianAI";
import Contact from "./pages/Contact";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<MalaysianAI />} />
            <Route path="/residency" element={<Index />} />
            <Route path="/canvas" element={<CanvasOverview />} />
            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/company" element={<Company />} />
            <Route path="/community" element={<CommunityDirectory />} />
            <Route path="/residents" element={<ResidentsDirectory />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
