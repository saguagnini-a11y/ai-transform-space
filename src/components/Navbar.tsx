import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Weekly Workflow", path: "/weekly-workflow" },
  { label: "Tiny Experiments", path: "/experiments" },
  { label: "Reflection Pods", path: "/reflection-pods" },
  { label: "Deep Dive", path: "/deep-dive" },
  { label: "Transformation Expo", path: "/transformation-expo" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-secondary backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg text-secondary-foreground">
          <img src={logoImg} alt="L&D Shakers logo" className="w-10 h-10 rounded-full object-cover border-2 border-primary/40" />
          <span>L&D Shakers <span className="text-primary">AI Sandbox</span></span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isHighlighted = item.path === "/weekly-workflow" && location.pathname === "/";
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 font-display story-link ${
                  location.pathname === item.path
                    ? "bg-primary/20 text-primary"
                    : isHighlighted
                    ? "text-primary bg-primary/10 shadow-[0_0_12px_hsl(var(--primary)/0.3)] pulse"
                    : "text-secondary-foreground/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.label}
                {isHighlighted && <span className="ml-1.5 text-xs">👈 Start here</span>}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-secondary-foreground/10 bg-secondary px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-display font-medium ${
                location.pathname === item.path
                  ? "bg-primary/20 text-primary"
                  : "text-secondary-foreground/70 hover:text-secondary-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
