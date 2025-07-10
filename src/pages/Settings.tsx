
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Bell, Globe, Moon, Sun, Volume2, User, LogOut, Shield, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('english');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();

  const languages = [
    { value: 'english', label: 'English', native: 'English' },
    { value: 'telugu', label: 'Telugu', native: 'తెలుగు' },
    { value: 'tamil', label: 'Tamil', native: 'தமிழ்' },
    { value: 'kannada', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { value: 'hindi', label: 'Hindi', native: 'हिंदी' }
  ];

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been signed out successfully.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-orange-800 dark:text-orange-300 mb-2">Settings</h1>
        <p className="text-orange-600 dark:text-orange-400">Customize your spiritual experience</p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="bg-card rounded-lg shadow-md border border-orange-100 dark:border-orange-800 p-6">
          <div className="flex items-center mb-4">
            <Bell className="w-6 h-6 text-orange-500 mr-3" />
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="daily-notifications" className="text-orange-800 dark:text-orange-300 font-medium">
                  Daily Reminders
                </Label>
                <p className="text-sm text-orange-600 dark:text-orange-400">Get reminded to read your daily shloka</p>
              </div>
              <Switch
                id="daily-notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            {notifications && (
              <div className="ml-4 pl-4 border-l-2 border-orange-200 dark:border-orange-700">
                <p className="text-sm text-orange-600 dark:text-orange-400 mb-2">Reminder time: 8:00 AM</p>
                <Button variant="outline" size="sm" className="border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300">
                  Change Time
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-card rounded-lg shadow-md border border-orange-100 dark:border-orange-800 p-6">
          <div className="flex items-center mb-4">
            <Globe className="w-6 h-6 text-orange-500 mr-3" />
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300">Language Preferences</h3>
          </div>
          
          <div>
            <Label className="text-orange-800 dark:text-orange-300 font-medium mb-3 block">
              Default Translation Language
            </Label>
            <RadioGroup value={language} onValueChange={setLanguage}>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <div key={lang.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={lang.value} id={lang.value} />
                    <Label htmlFor={lang.value} className="text-orange-700 dark:text-orange-300">
                      {lang.label} ({lang.native})
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="bg-card rounded-lg shadow-md border border-orange-100 dark:border-orange-800 p-6">
          <div className="flex items-center mb-4">
            <Volume2 className="w-6 h-6 text-orange-500 mr-3" />
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300">Audio Settings</h3>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="audio-enabled" className="text-orange-800 dark:text-orange-300 font-medium">
                Sanskrit Audio
              </Label>
              <p className="text-sm text-orange-600 dark:text-orange-400">Enable text-to-speech for Sanskrit verses</p>
            </div>
            <Switch
              id="audio-enabled"
              checked={audioEnabled}
              onCheckedChange={setAudioEnabled}
            />
          </div>
        </div>

        {/* Theme Settings */}
        <div className="bg-card rounded-lg shadow-md border border-orange-100 dark:border-orange-800 p-6">
          <div className="flex items-center mb-4">
            {theme === 'dark' ? (
              <Moon className="w-6 h-6 text-orange-500 mr-3" />
            ) : (
              <Sun className="w-6 h-6 text-orange-500 mr-3" />
            )}
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300">Appearance</h3>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode" className="text-orange-800 dark:text-orange-300 font-medium">
                Dark Mode
              </Label>
              <p className="text-sm text-orange-600 dark:text-orange-400">Use dark theme for better reading at night</p>
            </div>
            <Switch
              id="dark-mode"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-card rounded-lg shadow-md border border-orange-100 dark:border-orange-800 p-6">
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 text-orange-500 mr-3" />
            <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-300">Account</h3>
          </div>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950">
              <User className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
            
            <Button variant="outline" className="w-full justify-start border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950">
              <Shield className="w-4 h-4 mr-2" />
              Privacy Settings
            </Button>
            
            <Button variant="outline" className="w-full justify-start border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950">
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & Support
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3"
          >
            Save Settings
          </Button>
          
          <Link to="/" className="block">
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="w-full border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 flex items-center justify-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
