import Navbar from "@/components/Navbar";
import PrototypeBanner from "@/components/PrototypeBanner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <PrototypeBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted-foreground font-body">
        <p>L&D Shakers AI Sandbox — Where experimentation meets transformation</p>
      </footer>
    </div>
  );
};

export default Layout;
