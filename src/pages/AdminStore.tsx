import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Upload, DollarSign, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminStore = () => {
  const { toast } = useToast();
  const [storeItems, setStoreItems] = useState([
    {
      id: 1,
      name: "Krishna Statue - Small",
      description: "Beautiful handcrafted Krishna statue made from brass",
      category: "statues",
      price: 25.99,
      coinCost: 50,
      stock: 15,
      image: "/placeholder-krishna-statue.jpg",
      status: "active"
    },
    {
      id: 2,
      name: "Bhagavad Gita Book - English",
      description: "Complete Bhagavad Gita with commentary by Swami Prabhupada",
      category: "books",
      price: 12.99,
      coinCost: 25,
      stock: 50,
      image: "/placeholder-gita-book.jpg",
      status: "active"
    },
    {
      id: 3,
      name: "Orange Meditation Shawl",
      description: "Soft cotton shawl perfect for meditation and prayer",
      category: "clothing",
      price: 18.99,
      coinCost: 35,
      stock: 8,
      image: "/placeholder-shawl.jpg",
      status: "active"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    coinCost: "",
    stock: "",
    image: null as File | null
  });

  const categories = [
    { value: "statues", label: "Krishna Statues" },
    { value: "books", label: "Spiritual Books" },
    { value: "clothing", label: "Traditional Clothing" },
    { value: "accessories", label: "Prayer Accessories" },
    { value: "art", label: "Spiritual Art" }
  ];

  const handleAddItem = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      coinCost: "",
      stock: "",
      image: null
    });
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price.toString(),
      coinCost: item.coinCost.toString(),
      stock: item.stock.toString(),
      image: null
    });
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (id: number) => {
    setStoreItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item deleted",
      description: "The store item has been removed successfully",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing item
      setStoreItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { 
              ...item, 
              name: formData.name,
              description: formData.description,
              category: formData.category,
              price: parseFloat(formData.price),
              coinCost: parseInt(formData.coinCost),
              stock: parseInt(formData.stock)
            }
          : item
      ));
      toast({
        title: "Item updated",
        description: "The store item has been updated successfully",
      });
    } else {
      // Add new item
      const newItem = {
        id: Math.max(...storeItems.map(item => item.id)) + 1,
        ...formData,
        price: parseFloat(formData.price),
        coinCost: parseInt(formData.coinCost),
        stock: parseInt(formData.stock),
        image: `/placeholder-${formData.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
        status: "active"
      };
      setStoreItems(prev => [...prev, newItem]);
      toast({
        title: "Item added",
        description: "New store item has been added successfully",
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  const totalRevenue = storeItems.reduce((sum, item) => sum + (item.price * (20 - item.stock)), 0);
  const totalItemsSold = storeItems.reduce((sum, item) => sum + (20 - item.stock), 0);
  const lowStockItems = storeItems.filter(item => item.stock < 10).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-orange-800">Manage Store</h2>
          <p className="text-orange-600">Add and manage spiritual items for the store</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddItem} className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Store Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Store Item" : "Add New Store Item"}</DialogTitle>
              <DialogDescription>
                {editingItem ? "Update item details" : "Add a new item to the spiritual store"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Item Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="coinCost">Coin Cost</Label>
                  <Input
                    id="coinCost"
                    type="number"
                    value={formData.coinCost}
                    onChange={(e) => setFormData(prev => ({ ...prev, coinCost: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="image">Product Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1"
                />
                {formData.image && (
                  <p className="text-sm text-orange-600 mt-1">
                    Selected: {formData.image.name}
                  </p>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                  {editingItem ? "Update Item" : "Add Item"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Total Items</CardTitle>
            <DollarSign className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{storeItems.length}</div>
            <p className="text-xs text-orange-600">Active products</p>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Revenue</CardTitle>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-orange-600">Total sales</p>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Items Sold</CardTitle>
            <Coins className="w-5 h-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{totalItemsSold}</div>
            <p className="text-xs text-orange-600">Units sold</p>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Low Stock</CardTitle>
            <Upload className="w-5 h-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{lowStockItems}</div>
            <p className="text-xs text-orange-600">Items need restock</p>
          </CardContent>
        </Card>
      </div>

      {/* Store Items Table */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-800">Store Inventory</CardTitle>
          <CardDescription className="text-orange-600">
            Manage spiritual items, pricing, and stock levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Coin Cost</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {storeItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-orange-600 max-w-xs truncate">
                        {item.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                      {categories.find(c => c.value === item.category)?.label}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">${item.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Coins className="w-4 h-4 text-orange-500 mr-1" />
                      {item.coinCost}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.stock < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.stock} units
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditItem(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteItem(item.id)}
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

export default AdminStore;