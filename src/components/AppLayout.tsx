import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard, Library, Vault, User, Info, Heart, Moon, Sun, Send, Star, Menu,
  Shield, GraduationCap,
} from "lucide-react";
import { getProfile, getTheme, saveTheme, initTheme } from "@/lib/store";
import logo from "@/assets/rankers-star-logo.png";
import RankerPulseChat from "@/components/RankerPulseChat";

const navItems = [
  { title: "Dashboard", url: "/app", icon: LayoutDashboard },
  { title: "Rankers Library", url: "/app/library", icon: Library },
  { title: "Study Vault", url: "/app/vault", icon: Vault },
  { title: "Profile", url: "/app/profile", icon: User },
  { title: "About", url: "/app/about", icon: Info },
  { title: "Contribute", url: "/app/contribute", icon: Heart },
];

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = getProfile();
  const [theme, setTheme] = useState<"light" | "dark">(getTheme());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    initTheme();
    if (!profile.name) {
      navigate("/enter", { replace: true });
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    saveTheme(next);
  };

  const isActive = (path: string) => {
    if (path === "/app") return location.pathname === "/app";
    return location.pathname.startsWith(path);
  };

  const navBtnClass = (path: string) =>
    `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
      isActive(path)
        ? "sidebar-active"
        : "text-sidebar-foreground hover:bg-sidebar-accent"
    }`;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border shrink-0">
        <div className="p-4 flex items-center gap-2 border-b border-sidebar-border">
          <img src={logo} alt="Rankers Star" className="w-8 h-8" />
          <span className="font-heading font-bold text-sidebar-foreground">Rankers Star</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.url}
              onClick={() => navigate(item.url)}
              className={navBtnClass(item.url)}
            >
              <item.icon className="w-4 h-4" />
              {item.title}
            </button>
          ))}
          {profile.isAdmin && (
            <button
              onClick={() => navigate("/app/admin")}
              className={navBtnClass("/app/admin")}
            >
              <Shield className="w-4 h-4" /> Admin Panel
            </button>
          )}
        </nav>
        <div className="p-3 border-t border-sidebar-border space-y-2">
          <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200">
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
          <a
            href="https://t.me/freematerialjeeneet"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200"
          >
            <Send className="w-4 h-4" /> Telegram
          </a>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-foreground/40" />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 flex items-center gap-2 border-b border-sidebar-border">
              <img src={logo} alt="Rankers Star" className="w-8 h-8" />
              <span className="font-heading font-bold text-sidebar-foreground">Rankers Star</span>
            </div>
            <nav className="p-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.url}
                  onClick={() => { navigate(item.url); setSidebarOpen(false); }}
                  className={navBtnClass(item.url)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </button>
              ))}
              {profile.isAdmin && (
                <button
                  onClick={() => { navigate("/app/admin"); setSidebarOpen(false); }}
                  className={navBtnClass("/app/admin")}
                >
                  <Shield className="w-4 h-4" /> Admin Panel
                </button>
              )}
            </nav>
            <div className="p-3 border-t border-sidebar-border space-y-2">
              <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200">
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="h-14 border-b flex items-center px-4 gap-4 bg-card shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{profile.name}</span>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
      <RankerPulseChat />
    </div>
  );
};

export default AppLayout;
