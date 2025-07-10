import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Store, Bell, Globe, Palette, TrendingUp, Activity } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Users", value: "2,847", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Active Shlokas", value: "700", change: "+5", icon: BookOpen, color: "text-green-600" },
    { title: "Store Items", value: "45", change: "+3", icon: Store, color: "text-purple-600" },
    { title: "Languages", value: "8", change: "0", icon: Globe, color: "text-orange-600" },
  ];

  const recentActivity = [
    { action: "New user registered", time: "2 minutes ago", type: "user" },
    { action: "Shloka added: Chapter 3, Verse 21", time: "1 hour ago", type: "content" },
    { action: "Store item updated: Krishna Statue", time: "3 hours ago", type: "store" },
    { action: "Notification sent to 1,240 users", time: "6 hours ago", type: "notification" },
    { action: "Theme colors updated", time: "1 day ago", type: "theme" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user": return <Users className="w-4 h-4 text-blue-500" />;
      case "content": return <BookOpen className="w-4 h-4 text-green-500" />;
      case "store": return <Store className="w-4 h-4 text-purple-500" />;
      case "notification": return <Bell className="w-4 h-4 text-orange-500" />;
      case "theme": return <Palette className="w-4 h-4 text-pink-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-orange-800 mb-2">Dashboard Overview</h2>
        <p className="text-orange-600">Monitor your app's performance and manage content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{stat.value}</div>
              <p className="text-xs text-orange-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">Recent Activity</CardTitle>
            <CardDescription className="text-orange-600">
              Latest actions performed in the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-800">{activity.action}</p>
                    <p className="text-xs text-orange-600">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">Quick Actions</CardTitle>
            <CardDescription className="text-orange-600">
              Frequently used admin operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg text-center cursor-pointer hover:bg-blue-100 transition-colors">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-blue-800">Add New Shloka</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center cursor-pointer hover:bg-green-100 transition-colors">
                <Store className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-800">Add Store Item</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center cursor-pointer hover:bg-purple-100 transition-colors">
                <Bell className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-purple-800">Send Notification</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg text-center cursor-pointer hover:bg-pink-100 transition-colors">
                <Users className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-pink-800">View User Stats</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800">System Health</CardTitle>
          <CardDescription className="text-orange-600">
            Current status of app components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-orange-800">Database</p>
              <p className="text-xs text-green-600">Operational</p>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-orange-800">API Services</p>
              <p className="text-xs text-green-600">Operational</p>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
              <p className="text-sm font-medium text-orange-800">Audio Processing</p>
              <p className="text-xs text-yellow-600">Maintenance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;