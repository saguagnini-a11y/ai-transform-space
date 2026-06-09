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
import FeedbackPage from "./pages/FeedbackPage";
import NotFound from "./pages/NotFound";
import TitleScreen from "./game/components/TitleScreen";
import WorldMap from "./game/components/WorldMap";
import World1_Terrain from "./game/components/World1_Terrain";
import World2_Enemies from "./game/components/World2_Enemies";
import World3_Blocks from "./game/components/World3_Blocks";
import World4_Castle from "./game/components/World4_Castle";
import CastleWall from "./game/components/CastleWall";
import PodView from "./game/components/PodView";

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
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* L&D Problem Finder game */}
          <Route path="/game" element={<TitleScreen />} />
          <Route path="/game/world-map" element={<WorldMap />} />
          <Route path="/game/world/1" element={<World1_Terrain />} />
          <Route path="/game/world/2" element={<World2_Enemies />} />
          <Route path="/game/world/3" element={<World3_Blocks />} />
          <Route path="/game/world/4" element={<World4_Castle />} />
          <Route path="/game/castle-wall" element={<CastleWall />} />
          <Route path="/pod/:pod_id" element={<PodView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
