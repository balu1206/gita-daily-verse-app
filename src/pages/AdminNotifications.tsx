import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Clock, Users, Send, History, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminNotifications = () => {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState({
    dailyReminder: true,
    reminderTime: "09:00",
    reminderDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    streakReminder: true,
    newContentAlert: true,
    storeUpdates: false
  });

  const [customNotification, setCustomNotification] = useState({
    title: "",
    message: "",
    targetAudience: "all",
    scheduleType: "immediate"
  });

  const [notificationHistory] = useState([
    {
      id: 1,
      title: "Daily Shloka Reminder",
      message: "🕉️ Your daily spiritual wisdom awaits. Read today's Bhagavad Gita verse.",
      sentTo: 2847,
      sentAt: "2024-01-15 09:00:00",
      type: "daily"
    },
    {
      id: 2,
      title: "New Chapter Added",
      message: "📖 Chapter 18 verses are now available with Tamil translations!",
      sentTo: 1240,
      sentAt: "2024-01-14 14:30:00",
      type: "content"
    },
    {
      id: 3,
      title: "Weekly Streak Celebration",
      message: "🎉 Congratulations on maintaining your 7-day reading streak!",
      sentTo: 456,
      sentAt: "2024-01-13 19:00:00",
      type: "streak"
    }
  ]);

  const handleSettingsUpdate = (key: string, value: any) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings updated",
      description: "Notification preferences have been saved",
    });
  };

  const handleSendNotification = () => {
    if (!customNotification.title || !customNotification.message) {
      toast({
        title: "Missing information",
        description: "Please fill in title and message",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending notification
    toast({
      title: "Notification sent!",
      description: `Message sent to ${customNotification.targetAudience === 'all' ? 'all users' : 'targeted users'}`,
    });

    // Reset form
    setCustomNotification({
      title: "",
      message: "",
      targetAudience: "all",
      scheduleType: "immediate"
    });
  };

  const userStats = {
    total: 2847,
    active: 1892,
    withNotifications: 2341,
    optedOut: 506
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-orange-800">Notification Settings</h2>
        <p className="text-orange-600">Manage daily reminders and user communications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Reminder Settings */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Daily Reminder Settings
            </CardTitle>
            <CardDescription className="text-orange-600">
              Configure automatic daily shloka reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-reminder">Enable Daily Reminders</Label>
              <Switch
                id="daily-reminder"
                checked={notificationSettings.dailyReminder}
                onCheckedChange={(checked) => handleSettingsUpdate('dailyReminder', checked)}
              />
            </div>

            <div>
              <Label htmlFor="reminder-time">Reminder Time</Label>
              <Input
                id="reminder-time"
                type="time"
                value={notificationSettings.reminderTime}
                onChange={(e) => handleSettingsUpdate('reminderTime', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Active Days</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const dayKey = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][index];
                  return (
                    <Button
                      key={day}
                      size="sm"
                      variant={notificationSettings.reminderDays.includes(dayKey) ? "default" : "outline"}
                      onClick={() => {
                        const newDays = notificationSettings.reminderDays.includes(dayKey)
                          ? notificationSettings.reminderDays.filter(d => d !== dayKey)
                          : [...notificationSettings.reminderDays, dayKey];
                        handleSettingsUpdate('reminderDays', newDays);
                      }}
                      className={notificationSettings.reminderDays.includes(dayKey) 
                        ? "bg-orange-500 hover:bg-orange-600 text-white" 
                        : "border-orange-200 text-orange-600 hover:bg-orange-50"
                      }
                    >
                      {day}
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between">
                <Label htmlFor="streak-reminder">Streak Reminders</Label>
                <Switch
                  id="streak-reminder"
                  checked={notificationSettings.streakReminder}
                  onCheckedChange={(checked) => handleSettingsUpdate('streakReminder', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="content-alert">New Content Alerts</Label>
                <Switch
                  id="content-alert"
                  checked={notificationSettings.newContentAlert}
                  onCheckedChange={(checked) => handleSettingsUpdate('newContentAlert', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="store-updates">Store Updates</Label>
                <Switch
                  id="store-updates"
                  checked={notificationSettings.storeUpdates}
                  onCheckedChange={(checked) => handleSettingsUpdate('storeUpdates', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Send Custom Notification */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center">
              <Send className="w-5 h-5 mr-2" />
              Send Custom Notification
            </CardTitle>
            <CardDescription className="text-orange-600">
              Send targeted messages to users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="notification-title">Title</Label>
              <Input
                id="notification-title"
                value={customNotification.title}
                onChange={(e) => setCustomNotification(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Special Announcement"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="notification-message">Message</Label>
              <Textarea
                id="notification-message"
                value={customNotification.message}
                onChange={(e) => setCustomNotification(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Write your message here..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="target-audience">Target Audience</Label>
              <Select 
                value={customNotification.targetAudience} 
                onValueChange={(value) => setCustomNotification(prev => ({ ...prev, targetAudience: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users ({userStats.total})</SelectItem>
                  <SelectItem value="active">Active Users ({userStats.active})</SelectItem>
                  <SelectItem value="streak">Users with Streaks</SelectItem>
                  <SelectItem value="new">New Users (Last 7 days)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="schedule-type">Schedule</Label>
              <Select 
                value={customNotification.scheduleType} 
                onValueChange={(value) => setCustomNotification(prev => ({ ...prev, scheduleType: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Send Immediately</SelectItem>
                  <SelectItem value="scheduled">Schedule for Later</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleSendNotification}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* User Statistics */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Notification Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-800">{userStats.total}</div>
              <div className="text-sm text-orange-600">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{userStats.withNotifications}</div>
              <div className="text-sm text-orange-600">Notifications Enabled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userStats.active}</div>
              <div className="text-sm text-orange-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{userStats.optedOut}</div>
              <div className="text-sm text-orange-600">Opted Out</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification History */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800 flex items-center">
            <History className="w-5 h-5 mr-2" />
            Recent Notifications
          </CardTitle>
          <CardDescription className="text-orange-600">
            History of sent notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notificationHistory.map((notification) => (
              <div key={notification.id} className="flex items-start justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-orange-800">{notification.title}</h4>
                  <p className="text-sm text-orange-600 mt-1">{notification.message}</p>
                  <div className="flex items-center mt-2 text-xs text-orange-500">
                    <Users className="w-3 h-3 mr-1" />
                    {notification.sentTo} recipients
                    <span className="mx-2">•</span>
                    <Clock className="w-3 h-3 mr-1" />
                    {new Date(notification.sentAt).toLocaleString()}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  notification.type === 'daily' ? 'bg-blue-100 text-blue-800' :
                  notification.type === 'content' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {notification.type}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminNotifications;