import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ExperimentsPage from "./pages/ExperimentsPage";
import WeeklyWorkflow from "./pages/WeeklyWorkflow";
import ReflectionPods from "./pages/ReflectionPods";
import TransformationExpo from "./pages/TransformationExpo";
import DeepDive from "./pages/DeepDive";
import AboutPage from "./pages/AboutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/experiments" element={<ExperimentsPage />} />
          <Route path="/weekly-workflow" element={<WeeklyWorkflow />} />
          <Route path="/reflection-pods" element={<ReflectionPods />} />
          <Route path="/transformation-expo" element={<TransformationExpo />} />
          <Route path="/deep-dive" element={<DeepDive />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
