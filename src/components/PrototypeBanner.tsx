import { useLocation } from "react-router-dom";

const pages = [
  { path: "/", label: "Home" },
  { path: "/weekly-workflow", label: "Weekly Workflow" },
  { path: "/experiments", label: "Experiments" },
  { path: "/reflection-pods", label: "Reflection Pods" },
  { path: "/transformation-expo", label: "Transformation Expo" },
  { path: "/deep-dive", label: "Peer Café" },
  { path: "/about", label: "About" },
];

const PrototypeBanner = () => {
  const { pathname } = useLocation();
  const currentIndex = pages.findIndex((p) => p.path === pathname);
  const currentPage = currentIndex >= 0 ? pages[currentIndex] : null;

  return (
    <div className="w-full bg-primary text-primary-foreground py-2 px-4 text-center text-sm font-display">
      <span className="mr-1">🧭</span>
      <span className="font-semibold">Interactive Storyboard:</span>{" "}
      <span className="opacity-90">Click tabs to explore</span>
      {currentPage && (
        <span className="ml-2 opacity-75 text-xs">
          · Currently viewing: {currentPage.label} ({currentIndex + 1} of {pages.length})
        </span>
      )}
    </div>
  );
};

export default PrototypeBanner;
