import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, TrendingUp, Award, Coins, Calendar, Activity, Download, Filter } from "lucide-react";

const AdminUsers = () => {
  const [timeFilter, setTimeFilter] = useState("30d");
  const [userFilter, setUserFilter] = useState("all");

  const userStats = {
    total: 2847,
    active: 1892,
    newThisMonth: 312,
    averageStreak: 12.5,
    totalCoins: 45789,
    dailyActiveUsers: 1234
  };

  const topUsers = [
    {
      id: 1,
      name: "Arjun Patel",
      email: "arjun.p@email.com",
      streak: 45,
      totalShlokas: 567,
      coins: 1250,
      joinedDate: "2023-08-15",
      lastActive: "2024-01-15"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.s@email.com",
      streak: 38,
      totalShlokas: 432,
      coins: 980,
      joinedDate: "2023-09-22",
      lastActive: "2024-01-15"
    },
    {
      id: 3,
      name: "Raj Kumar",
      email: "raj.k@email.com",
      streak: 32,
      totalShlokas: 389,
      coins: 856,
      joinedDate: "2023-10-11",
      lastActive: "2024-01-14"
    },
    {
      id: 4,
      name: "Meera Devi",
      email: "meera.d@email.com",
      streak: 28,
      totalShlokas: 345,
      coins: 742,
      joinedDate: "2023-11-03",
      lastActive: "2024-01-14"
    },
    {
      id: 5,
      name: "Krishna Das",
      email: "krishna.d@email.com",
      streak: 25,
      totalShlokas: 298,
      coins: 678,
      joinedDate: "2023-12-01",
      lastActive: "2024-01-13"
    }
  ];

  const engagementData = [
    { metric: "Daily Active Users", value: 1234, change: "+8.5%" },
    { metric: "Weekly Active Users", value: 2145, change: "+12.3%" },
    { metric: "Monthly Active Users", value: 2847, change: "+15.7%" },
    { metric: "Average Session Duration", value: "8.5 min", change: "+2.1%" },
    { metric: "Retention Rate (7-day)", value: "68%", change: "+4.2%" },
    { metric: "Retention Rate (30-day)", value: "42%", change: "+1.8%" }
  ];

  const exportUserData = () => {
    // Simulate export functionality
    alert("User data export initiated. CSV file will be downloaded shortly.");
  };

  const getStreakBadge = (streak: number) => {
    if (streak >= 30) return { color: "bg-purple-100 text-purple-800", label: "Master" };
    if (streak >= 14) return { color: "bg-yellow-100 text-yellow-800", label: "Devotee" };
    if (streak >= 7) return { color: "bg-green-100 text-green-800", label: "Seeker" };
    return { color: "bg-gray-100 text-gray-800", label: "Beginner" };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-orange-800">User Statistics</h2>
          <p className="text-orange-600">Monitor user engagement and app usage metrics</p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportUserData}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Total Users</CardTitle>
            <Users className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{userStats.total.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{userStats.newThisMonth} this month
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Active Users</CardTitle>
            <Activity className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{userStats.active.toLocaleString()}</div>
            <p className="text-xs text-orange-600">
              {Math.round((userStats.active / userStats.total) * 100)}% of total users
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Avg. Streak</CardTitle>
            <Award className="w-5 h-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{userStats.averageStreak} days</div>
            <p className="text-xs text-orange-600">User engagement metric</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Total Coins</CardTitle>
            <Coins className="w-5 h-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{userStats.totalCoins.toLocaleString()}</div>
            <p className="text-xs text-orange-600">Earned by all users</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Daily Active</CardTitle>
            <Calendar className="w-5 h-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{userStats.dailyActiveUsers.toLocaleString()}</div>
            <p className="text-xs text-orange-600">Users today</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">New This Month</CardTitle>
            <TrendingUp className="w-5 h-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{userStats.newThisMonth}</div>
            <p className="text-xs text-orange-600">Growth rate: +15.7%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Users */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">Top Users by Streak</CardTitle>
            <CardDescription className="text-orange-600">
              Most dedicated users with highest streaks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsers.map((user, index) => {
                const badge = getStreakBadge(user.streak);
                return (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-200 rounded-full text-orange-800 font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-orange-800">{user.name}</p>
                        <p className="text-xs text-orange-600">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-orange-800">{user.streak} days</p>
                      <p className="text-xs text-orange-600">{user.coins} coins</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Engagement Metrics */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">Engagement Metrics</CardTitle>
            <CardDescription className="text-orange-600">
              User activity and retention statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {engagementData.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm font-medium text-orange-800">{item.metric}</span>
                  <div className="text-right">
                    <span className="font-bold text-orange-800">{item.value}</span>
                    <span className="text-xs text-green-600 ml-2">{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed User Table */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800">User Details</CardTitle>
          <CardDescription className="text-orange-600">
            Comprehensive user information and activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="active">Active Users</SelectItem>
                <SelectItem value="inactive">Inactive Users</SelectItem>
                <SelectItem value="new">New Users</SelectItem>
                <SelectItem value="high-streak">High Streak Users</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Streak</TableHead>
                <TableHead>Total Shlokas</TableHead>
                <TableHead>Coins</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topUsers.map((user) => {
                const badge = getStreakBadge(user.streak);
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-orange-600">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{user.streak}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{user.totalShlokas}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Coins className="w-4 h-4 text-orange-500 mr-1" />
                        {user.coins}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(user.joinedDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;