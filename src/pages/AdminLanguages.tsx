import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Globe, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLanguages = () => {
  const { toast } = useToast();
  const [languages, setLanguages] = useState([
    { id: 1, code: "en", name: "English", nativeName: "English", enabled: true, isDefault: true },
    { id: 2, code: "hi", name: "Hindi", nativeName: "हिंदी", enabled: true, isDefault: false },
    { id: 3, code: "te", name: "Telugu", nativeName: "తెలుగు", enabled: true, isDefault: false },
    { id: 4, code: "ta", name: "Tamil", nativeName: "தமிழ்", enabled: true, isDefault: false },
    { id: 5, code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", enabled: true, isDefault: false },
    { id: 6, code: "bn", name: "Bengali", nativeName: "বাংলা", enabled: false, isDefault: false },
    { id: 7, code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", enabled: false, isDefault: false },
    { id: 8, code: "mr", name: "Marathi", nativeName: "मराठी", enabled: false, isDefault: false },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<any>(null);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    nativeName: "",
    enabled: true
  });

  const handleAddLanguage = () => {
    setEditingLanguage(null);
    setFormData({
      code: "",
      name: "",
      nativeName: "",
      enabled: true
    });
    setIsDialogOpen(true);
  };

  const handleEditLanguage = (language: any) => {
    setEditingLanguage(language);
    setFormData({
      code: language.code,
      name: language.name,
      nativeName: language.nativeName,
      enabled: language.enabled
    });
    setIsDialogOpen(true);
  };

  const handleToggleLanguage = (id: number) => {
    setLanguages(prev => prev.map(lang => 
      lang.id === id ? { ...lang, enabled: !lang.enabled } : lang
    ));
    
    const language = languages.find(l => l.id === id);
    toast({
      title: `${language?.name} ${language?.enabled ? 'disabled' : 'enabled'}`,
      description: `Language has been ${language?.enabled ? 'disabled' : 'enabled'} for users`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingLanguage) {
      // Update existing language
      setLanguages(prev => prev.map(lang => 
        lang.id === editingLanguage.id 
          ? { ...lang, ...formData }
          : lang
      ));
      toast({
        title: "Language updated",
        description: "The language settings have been updated successfully",
      });
    } else {
      // Add new language
      const newLanguage = {
        id: Math.max(...languages.map(l => l.id)) + 1,
        ...formData,
        isDefault: false
      };
      setLanguages(prev => [...prev, newLanguage]);
      toast({
        title: "Language added",
        description: "New language has been added successfully",
      });
    }
    
    setIsDialogOpen(false);
  };

  const enabledCount = languages.filter(l => l.enabled).length;
  const totalTranslations = languages.filter(l => l.enabled).length * 700; // Assuming 700 shlokas

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-orange-800">Manage Languages</h2>
          <p className="text-orange-600">Configure regional languages and their settings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddLanguage} className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Language
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingLanguage ? "Edit Language" : "Add New Language"}</DialogTitle>
              <DialogDescription>
                {editingLanguage ? "Update language settings" : "Add a new language to the app"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="code">Language Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="e.g., en, hi, te"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="name">English Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., English, Hindi, Telugu"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="nativeName">Native Name</Label>
                <Input
                  id="nativeName"
                  value={formData.nativeName}
                  onChange={(e) => setFormData(prev => ({ ...prev, nativeName: e.target.value }))}
                  placeholder="e.g., English, हिंदी, తెలుగు"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="enabled"
                  checked={formData.enabled}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enabled: checked }))}
                />
                <Label htmlFor="enabled">Enable this language</Label>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                  {editingLanguage ? "Update Language" : "Add Language"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Active Languages</CardTitle>
            <Globe className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{enabledCount}</div>
            <p className="text-xs text-orange-600">
              {languages.length - enabledCount} disabled
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Total Translations</CardTitle>
            <Check className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{totalTranslations.toLocaleString()}</div>
            <p className="text-xs text-orange-600">
              Available shloka translations
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Coverage</CardTitle>
            <Globe className="w-5 h-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">95%</div>
            <p className="text-xs text-orange-600">
              Translation completeness
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Languages Table */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800">Language Configuration</CardTitle>
          <CardDescription className="text-orange-600">
            Manage language availability and display settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Language</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Native Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Default</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {languages.map((language) => (
                <TableRow key={language.id}>
                  <TableCell className="font-medium">{language.name}</TableCell>
                  <TableCell>
                    <code className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                      {language.code}
                    </code>
                  </TableCell>
                  <TableCell className="font-medium">{language.nativeName}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={language.enabled}
                        onCheckedChange={() => handleToggleLanguage(language.id)}
                        disabled={language.isDefault}
                      />
                      <span className={`text-xs ${language.enabled ? 'text-green-600' : 'text-gray-500'}`}>
                        {language.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {language.isDefault && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Default
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditLanguage(language)}
                      disabled={language.isDefault}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Language Guidelines */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800">Language Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-orange-700">
            <p>• Use ISO 639-1 standard language codes (e.g., 'en' for English, 'hi' for Hindi)</p>
            <p>• Ensure native names are written in their respective scripts</p>
            <p>• Default language (English) cannot be disabled</p>
            <p>• Test translations thoroughly before enabling a language</p>
            <p>• Consider regional variations and dialects</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLanguages;