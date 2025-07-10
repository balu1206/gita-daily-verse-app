import { useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Shield, Settings, Users, BookOpen, Globe, Store, Bell, Palette, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminUser");
    toast({
      title: "Logged out",
      description: "You have been securely logged out",
    });
    navigate("/admin/login");
  };

  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "{}");

  const navItems = [
    { path: "/admin/dashboard", icon: BarChart3, label: "Dashboard" },
    { path: "/admin/shlokas", icon: BookOpen, label: "Manage Shlokas" },
    { path: "/admin/languages", icon: Globe, label: "Languages" },
    { path: "/admin/store", icon: Store, label: "Store Items" },
    { path: "/admin/notifications", icon: Bell, label: "Notifications" },
    { path: "/admin/users", icon: Users, label: "User Stats" },
    { path: "/admin/theme", icon: Palette, label: "App Theme" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-orange-500 mr-3" />
              <h1 className="text-xl font-bold text-orange-800">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-orange-600">Welcome, {adminUser.username}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-md border border-orange-200 p-4">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="flex items-center px-3 py-2 text-orange-700 hover:bg-orange-50 rounded-md transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;