import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, Upload, Eye, RefreshCw, Flower2, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminTheme = () => {
  const { toast } = useToast();
  const [themeSettings, setThemeSettings] = useState({
    appName: "Bhagavad Gita Daily",
    tagline: "Begin your spiritual journey with daily wisdom",
    primaryColor: "#ea580c",
    secondaryColor: "#f59e0b",
    accentColor: "#fb923c",
    logoStyle: "lotus",
    fontFamily: "Inter",
    borderRadius: "0.5rem"
  });

  const [previewMode, setPreviewMode] = useState(false);

  const colorPresets = [
    { name: "Saffron & Orange", primary: "#ea580c", secondary: "#f59e0b", accent: "#fb923c" },
    { name: "Deep Purple", primary: "#7c3aed", secondary: "#a855f7", accent: "#c084fc" },
    { name: "Forest Green", primary: "#059669", secondary: "#10b981", accent: "#34d399" },
    { name: "Royal Blue", primary: "#2563eb", secondary: "#3b82f6", accent: "#60a5fa" },
    { name: "Warm Pink", primary: "#db2777", secondary: "#ec4899", accent: "#f472b6" }
  ];

  const logoStyles = [
    { value: "lotus", label: "Lotus Flower", icon: Flower2 },
    { value: "sun", label: "Sun Symbol", icon: Sun },
    { value: "om", label: "Om Symbol", icon: Flower2 }
  ];

  const fontOptions = [
    { value: "Inter", label: "Inter (Modern)" },
    { value: "Noto Sans", label: "Noto Sans (Clean)" },
    { value: "Noto Serif", label: "Noto Serif (Traditional)" },
    { value: "Poppins", label: "Poppins (Friendly)" }
  ];

  const handleColorChange = (colorType: string, value: string) => {
    setThemeSettings(prev => ({ ...prev, [colorType]: value }));
  };

  const applyColorPreset = (preset: any) => {
    setThemeSettings(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent
    }));
    toast({
      title: "Color preset applied",
      description: `${preset.name} theme has been applied`,
    });
  };

  const handleSaveTheme = () => {
    // Simulate saving theme settings
    toast({
      title: "Theme updated!",
      description: "Your app theme has been saved successfully",
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast({
        title: "Logo uploaded",
        description: "Custom logo has been uploaded successfully",
      });
    }
  };

  const resetToDefault = () => {
    setThemeSettings({
      appName: "Bhagavad Gita Daily",
      tagline: "Begin your spiritual journey with daily wisdom",
      primaryColor: "#ea580c",
      secondaryColor: "#f59e0b",
      accentColor: "#fb923c",
      logoStyle: "lotus",
      fontFamily: "Inter",
      borderRadius: "0.5rem"
    });
    toast({
      title: "Theme reset",
      description: "Theme has been reset to default settings",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-orange-800">App Theme Settings</h2>
          <p className="text-orange-600">Customize the app's appearance and branding</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? "Exit Preview" : "Preview"}
          </Button>
          <Button
            variant="outline"
            onClick={resetToDefault}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={handleSaveTheme}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Save Theme
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Theme Configuration */}
        <div className="space-y-6">
          {/* App Branding */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800">App Branding</CardTitle>
              <CardDescription className="text-orange-600">
                Configure app name, tagline, and logo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="app-name">App Name</Label>
                <Input
                  id="app-name"
                  value={themeSettings.appName}
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, appName: e.target.value }))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={themeSettings.tagline}
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, tagline: e.target.value }))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Logo Style</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {logoStyles.map((style) => (
                    <Button
                      key={style.value}
                      size="sm"
                      variant={themeSettings.logoStyle === style.value ? "default" : "outline"}
                      onClick={() => setThemeSettings(prev => ({ ...prev, logoStyle: style.value }))}
                      className={themeSettings.logoStyle === style.value 
                        ? "bg-orange-500 hover:bg-orange-600 text-white" 
                        : "border-orange-200 text-orange-600 hover:bg-orange-50"
                      }
                    >
                      <style.icon className="w-4 h-4 mr-1" />
                      {style.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="logo-upload">Custom Logo Upload</Label>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Color Scheme */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800">Color Scheme</CardTitle>
              <CardDescription className="text-orange-600">
                Customize the app's color palette
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      id="primary-color"
                      type="color"
                      value={themeSettings.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      className="w-12 h-10 p-1 rounded"
                    />
                    <Input
                      value={themeSettings.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={themeSettings.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      className="w-12 h-10 p-1 rounded"
                    />
                    <Input
                      value={themeSettings.secondaryColor}
                      onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      id="accent-color"
                      type="color"
                      value={themeSettings.accentColor}
                      onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      className="w-12 h-10 p-1 rounded"
                    />
                    <Input
                      value={themeSettings.accentColor}
                      onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Color Presets</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {colorPresets.map((preset, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => applyColorPreset(preset)}
                      className="justify-start h-auto p-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: preset.primary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: preset.secondary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: preset.accent }}
                          />
                        </div>
                        <span>{preset.name}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography & Layout */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800">Typography & Layout</CardTitle>
              <CardDescription className="text-orange-600">
                Configure fonts and layout properties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="font-family">Font Family</Label>
                <Select value={themeSettings.fontFamily} onValueChange={(value) => setThemeSettings(prev => ({ ...prev, fontFamily: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="border-radius">Border Radius</Label>
                <Select value={themeSettings.borderRadius} onValueChange={(value) => setThemeSettings(prev => ({ ...prev, borderRadius: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0rem">Sharp (0px)</SelectItem>
                    <SelectItem value="0.25rem">Small (4px)</SelectItem>
                    <SelectItem value="0.5rem">Medium (8px)</SelectItem>
                    <SelectItem value="0.75rem">Large (12px)</SelectItem>
                    <SelectItem value="1rem">Extra Large (16px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800">Theme Preview</CardTitle>
              <CardDescription className="text-orange-600">
                See how your theme will look
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="p-6 rounded-lg border-2"
                style={{ 
                  backgroundColor: '#fef7ed',
                  borderColor: themeSettings.primaryColor,
                  borderRadius: themeSettings.borderRadius,
                  fontFamily: themeSettings.fontFamily
                }}
              >
                {/* Preview Header */}
                <div className="text-center mb-6">
                  <div 
                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3"
                    style={{ 
                      background: `linear-gradient(135deg, ${themeSettings.primaryColor}, ${themeSettings.secondaryColor})` 
                    }}
                  >
                    {themeSettings.logoStyle === 'lotus' ? <Flower2 className="w-8 h-8 text-white" /> : <Sun className="w-8 h-8 text-white" />}
                  </div>
                  <h3 
                    className="text-2xl font-bold mb-1"
                    style={{ color: themeSettings.primaryColor }}
                  >
                    {themeSettings.appName}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: themeSettings.secondaryColor }}
                  >
                    {themeSettings.tagline}
                  </p>
                </div>

                {/* Preview Content */}
                <div className="space-y-4">
                  <div 
                    className="p-4 rounded"
                    style={{ 
                      backgroundColor: 'white',
                      borderRadius: themeSettings.borderRadius 
                    }}
                  >
                    <h4 
                      className="font-semibold mb-2"
                      style={{ color: themeSettings.primaryColor }}
                    >
                      Sample Card Title
                    </h4>
                    <p className="text-sm text-gray-600">
                      This is how your content cards will appear with the selected theme.
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      className="px-4 py-2 text-white font-medium rounded text-sm"
                      style={{ 
                        backgroundColor: themeSettings.primaryColor,
                        borderRadius: themeSettings.borderRadius 
                      }}
                    >
                      Primary Button
                    </button>
                    <button 
                      className="px-4 py-2 border font-medium rounded text-sm"
                      style={{ 
                        borderColor: themeSettings.secondaryColor,
                        color: themeSettings.secondaryColor,
                        borderRadius: themeSettings.borderRadius 
                      }}
                    >
                      Secondary Button
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Export/Import */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800">Theme Management</CardTitle>
              <CardDescription className="text-orange-600">
                Export or import theme configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  const themeJson = JSON.stringify(themeSettings, null, 2);
                  navigator.clipboard.writeText(themeJson);
                  toast({ title: "Theme copied", description: "Theme configuration copied to clipboard" });
                }}
              >
                <Upload className="w-4 h-4 mr-2" />
                Export Theme Configuration
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  toast({ title: "Import feature", description: "Theme import functionality coming soon" });
                }}
              >
                <Palette className="w-4 h-4 mr-2" />
                Import Theme Configuration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminTheme;