
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Coins, ShoppingCart, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Store = () => {
  const [userCoins] = useState(120);
  const { toast } = useToast();

  const products = {
    books: [
      {
        id: 1,
        name: "Bhagavad Gita As It Is",
        description: "Complete commentary by A.C. Bhaktivedanta Swami",
        coins: 80,
        price: "$15.99",
        image: "book-gita",
        rating: 4.9,
        inStock: true
      },
      {
        id: 2,
        name: "Sanskrit Learning Guide",
        description: "Learn to read Devanagari script",
        coins: 60,
        price: "$12.99",
        image: "book-sanskrit",
        rating: 4.7,
        inStock: true
      },
      {
        id: 3,
        name: "Spiritual Diary",
        description: "Daily reflection journal with Gita quotes",
        coins: 40,
        price: "$8.99",
        image: "book-diary",
        rating: 4.8,
        inStock: true
      }
    ],
    statues: [
      {
        id: 4,
        name: "Krishna with Flute",
        description: "Beautiful brass statue, 6 inches",
        coins: 150,
        price: "$29.99",
        image: "statue-krishna",
        rating: 4.9,
        inStock: true
      },
      {
        id: 5,
        name: "Arjuna and Krishna",
        description: "Chariot scene from battlefield",
        coins: 200,
        price: "$39.99",
        image: "statue-arjuna",
        rating: 5.0,
        inStock: false
      },
      {
        id: 6,
        name: "Om Symbol",
        description: "Sacred Om symbol in marble",
        coins: 100,
        price: "$19.99",
        image: "statue-om",
        rating: 4.6,
        inStock: true
      }
    ],
    clothing: [
      {
        id: 7,
        name: "Men's Cotton Kurta",
        description: "Traditional white kurta with Gita verses",
        coins: 120,
        price: "$24.99",
        image: "kurta-white",
        rating: 4.5,
        inStock: true
      },
      {
        id: 8,
        name: "Silk Saree",
        description: "Beautiful orange saree with lotus border",
        coins: 180,
        price: "$49.99",
        image: "saree-orange",
        rating: 4.8,
        inStock: true
      },
      {
        id: 9,
        name: "Prayer Shawl",
        description: "Soft cotton shawl for meditation",
        coins: 70,
        price: "$16.99",
        image: "shawl-prayer",
        rating: 4.7,
        inStock: true
      }
    ]
  };

  const handlePurchase = (product: any, method: 'coins' | 'money') => {
    if (method === 'coins' && userCoins < product.coins) {
      toast({
        title: "Insufficient coins",
        description: "You need more coins to make this purchase. Keep reading daily to earn more!",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: method === 'coins' ? "Purchase successful!" : "Redirecting to payment...",
      description: method === 'coins' 
        ? `You purchased ${product.name} with ${product.coins} coins.`
        : `Opening payment gateway for ${product.name}`,
    });
  };

  const ProductCard = ({ product }: { product: any }) => (
    <div className="bg-white rounded-lg shadow-md border border-orange-100 overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
        <div className="text-6xl">📿</div> {/* Placeholder for product image */}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-orange-800 text-lg">{product.name}</h3>
          {!product.inStock && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              Out of Stock
            </Badge>
          )}
        </div>
        
        <p className="text-orange-600 text-sm mb-3 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center mb-3">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm text-orange-600 ml-1">{product.rating}</span>
        </div>
        
        <div className="space-y-2">
          <Button
            disabled={!product.inStock || userCoins < product.coins}
            onClick={() => handlePurchase(product, 'coins')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center"
          >
            <Coins className="w-4 h-4 mr-2" />
            {product.coins} Coins
          </Button>
          
          <Button
            disabled={!product.inStock}
            variant="outline"
            onClick={() => handlePurchase(product, 'money')}
            className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Buy {product.price}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-orange-800 mb-2">Spiritual Store</h1>
        <p className="text-orange-600">Enhance your spiritual journey with meaningful items</p>
        
        {/* User Coins */}
        <div className="bg-white rounded-lg p-4 mt-4 shadow-md border border-orange-100 inline-flex items-center">
          <Coins className="w-6 h-6 text-orange-500 mr-2" />
          <span className="text-lg font-semibold text-orange-800">Your Coins: {userCoins}</span>
        </div>
      </div>

      {/* Store Tabs */}
      <Tabs defaultValue="books" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="books" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Books ({products.books.length})
          </TabsTrigger>
          <TabsTrigger value="statues" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Statues ({products.statues.length})
          </TabsTrigger>
          <TabsTrigger value="clothing" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Clothing ({products.clothing.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="books">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.books.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="statues">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.statues.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="clothing">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.clothing.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* How to Earn Coins */}
      <div className="mt-12 bg-white rounded-lg shadow-lg border border-orange-100 p-6">
        <h3 className="text-xl font-semibold text-orange-800 mb-4">How to Earn More Coins</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl mb-2">📖</div>
            <h4 className="font-semibold text-orange-800 mb-1">Daily Reading</h4>
            <p className="text-sm text-orange-600">Earn 5 coins for each daily shloka</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl mb-2">🔥</div>
            <h4 className="font-semibold text-orange-800 mb-1">Streak Bonus</h4>
            <p className="text-sm text-orange-600">Extra coins for 7, 15, 30 day streaks</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl mb-2">❤️</div>
            <h4 className="font-semibold text-orange-800 mb-1">Bookmarking</h4>
            <p className="text-sm text-orange-600">Earn 2 coins for bookmarking verses</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
