import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Play, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminShlokas = () => {
  const { toast } = useToast();
  const [shlokas, setShlokas] = useState([
    {
      id: 1,
      chapter: 2,
      verse: 47,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि।।",
      transliteration: "karmaṇy-evādhikāras te mā phaleṣhu kadāchana mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
      english: "You have a right to perform your prescribed duty, but never to the fruits of action.",
      hindi: "कर्म में ही तेरा अधिकार है, फल में कभी नहीं।",
      status: "active"
    },
    {
      id: 2,
      chapter: 2,
      verse: 20,
      sanskrit: "न जायते म्रियते वा कदाचिन् नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे।।",
      transliteration: "na jāyate mriyate vā kadāchin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ ajo nityaḥ śāśvato 'yaṁ purāṇo na hanyate hanyamāne śarīre",
      english: "For the soul there is neither birth nor death at any time.",
      hindi: "आत्मा का न कभी जन्म होता है और न मृत्यु।",
      status: "active"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingShloka, setEditingShloka] = useState<any>(null);
  const [formData, setFormData] = useState({
    chapter: "",
    verse: "",
    sanskrit: "",
    transliteration: "",
    english: "",
    hindi: "",
    telugu: "",
    tamil: "",
    kannada: "",
    meaning: "",
    audioFile: null as File | null
  });

  const handleAddShloka = () => {
    setEditingShloka(null);
    setFormData({
      chapter: "",
      verse: "",
      sanskrit: "",
      transliteration: "",
      english: "",
      hindi: "",
      telugu: "",
      tamil: "",
      kannada: "",
      meaning: "",
      audioFile: null
    });
    setIsDialogOpen(true);
  };

  const handleEditShloka = (shloka: any) => {
    setEditingShloka(shloka);
    setFormData({
      chapter: shloka.chapter.toString(),
      verse: shloka.verse.toString(),
      sanskrit: shloka.sanskrit,
      transliteration: shloka.transliteration,
      english: shloka.english,
      hindi: shloka.hindi,
      telugu: shloka.telugu || "",
      tamil: shloka.tamil || "",
      kannada: shloka.kannada || "",
      meaning: shloka.meaning || "",
      audioFile: null
    });
    setIsDialogOpen(true);
  };

  const handleDeleteShloka = (id: number) => {
    setShlokas(prev => prev.filter(s => s.id !== id));
    toast({
      title: "Shloka deleted",
      description: "The shloka has been removed successfully",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingShloka) {
      // Update existing shloka
      setShlokas(prev => prev.map(s => 
        s.id === editingShloka.id 
          ? { ...s, ...formData, chapter: parseInt(formData.chapter), verse: parseInt(formData.verse) }
          : s
      ));
      toast({
        title: "Shloka updated",
        description: "The shloka has been updated successfully",
      });
    } else {
      // Add new shloka
      const newShloka = {
        id: Math.max(...shlokas.map(s => s.id)) + 1,
        ...formData,
        chapter: parseInt(formData.chapter),
        verse: parseInt(formData.verse),
        status: "active"
      };
      setShlokas(prev => [...prev, newShloka]);
      toast({
        title: "Shloka added",
        description: "New shloka has been added successfully",
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, audioFile: file }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-orange-800">Manage Shlokas</h2>
          <p className="text-orange-600">Create, edit, and manage daily verses</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddShloka} className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add New Shloka
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingShloka ? "Edit Shloka" : "Add New Shloka"}</DialogTitle>
              <DialogDescription>
                {editingShloka ? "Update the shloka details" : "Add a new verse to the collection"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="chapter">Chapter</Label>
                  <Input
                    id="chapter"
                    type="number"
                    value={formData.chapter}
                    onChange={(e) => setFormData(prev => ({ ...prev, chapter: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="verse">Verse</Label>
                  <Input
                    id="verse"
                    type="number"
                    value={formData.verse}
                    onChange={(e) => setFormData(prev => ({ ...prev, verse: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="sanskrit">Sanskrit Text</Label>
                <Textarea
                  id="sanskrit"
                  value={formData.sanskrit}
                  onChange={(e) => setFormData(prev => ({ ...prev, sanskrit: e.target.value }))}
                  className="font-serif"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="transliteration">Transliteration</Label>
                <Textarea
                  id="transliteration"
                  value={formData.transliteration}
                  onChange={(e) => setFormData(prev => ({ ...prev, transliteration: e.target.value }))}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="english">English Translation</Label>
                  <Textarea
                    id="english"
                    value={formData.english}
                    onChange={(e) => setFormData(prev => ({ ...prev, english: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="hindi">Hindi Translation</Label>
                  <Textarea
                    id="hindi"
                    value={formData.hindi}
                    onChange={(e) => setFormData(prev => ({ ...prev, hindi: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="telugu">Telugu Translation</Label>
                  <Textarea
                    id="telugu"
                    value={formData.telugu}
                    onChange={(e) => setFormData(prev => ({ ...prev, telugu: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="tamil">Tamil Translation</Label>
                  <Textarea
                    id="tamil"
                    value={formData.tamil}
                    onChange={(e) => setFormData(prev => ({ ...prev, tamil: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="kannada">Kannada Translation</Label>
                  <Textarea
                    id="kannada"
                    value={formData.kannada}
                    onChange={(e) => setFormData(prev => ({ ...prev, kannada: e.target.value }))}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="meaning">Meaning & Explanation</Label>
                <Textarea
                  id="meaning"
                  value={formData.meaning}
                  onChange={(e) => setFormData(prev => ({ ...prev, meaning: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="audio">Audio File (Optional)</Label>
                <Input
                  id="audio"
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="mt-1"
                />
                {formData.audioFile && (
                  <p className="text-sm text-orange-600 mt-1">
                    Selected: {formData.audioFile.name}
                  </p>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                  {editingShloka ? "Update Shloka" : "Add Shloka"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Shlokas Table */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800">All Shlokas</CardTitle>
          <CardDescription className="text-orange-600">
            Manage your collection of Bhagavad Gita verses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Sanskrit</TableHead>
                <TableHead>English Translation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shlokas.map((shloka) => (
                <TableRow key={shloka.id}>
                  <TableCell className="font-medium">
                    Ch. {shloka.chapter}, V. {shloka.verse}
                  </TableCell>
                  <TableCell className="font-serif text-orange-800 max-w-xs truncate">
                    {shloka.sanskrit}
                  </TableCell>
                  <TableCell className="max-w-sm truncate">
                    {shloka.english}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {shloka.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditShloka(shloka)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteShloka(shloka.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminShlokas;