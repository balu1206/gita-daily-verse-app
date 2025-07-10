
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Heart, Calendar, BookOpen } from "lucide-react";

const ShlokaHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const pastShlokas = [
    {
      id: 1,
      date: "2024-01-09",
      chapter: "Chapter 2, Verse 47",
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
      translation: "You have a right to perform your prescribed duty, but never to the fruits of action.",
      isBookmarked: true
    },
    {
      id: 2,
      date: "2024-01-08",
      chapter: "Chapter 4, Verse 7",
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।",
      translation: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest myself on earth.",
      isBookmarked: false
    },
    {
      id: 3,
      date: "2024-01-07",
      chapter: "Chapter 3, Verse 21",
      sanskrit: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः।",
      translation: "Whatever action a great man performs, common men follow in his footsteps.",
      isBookmarked: true
    },
    {
      id: 4,
      date: "2024-01-06",
      chapter: "Chapter 6, Verse 5",
      sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।",
      translation: "One must deliver himself with the help of his mind, and not degrade himself.",
      isBookmarked: false
    },
    {
      id: 5,
      date: "2024-01-05",
      chapter: "Chapter 2, Verse 14",
      sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।",
      translation: "O son of Kunti, the nonpermanent appearance of happiness and distress are like the appearance and disappearance of winter and summer seasons.",
      isBookmarked: true
    }
  ];

  const bookmarkedShlokas = pastShlokas.filter(shloka => shloka.isBookmarked);
  
  const filteredShlokas = pastShlokas.filter(shloka => 
    shloka.sanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shloka.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shloka.chapter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBookmarks = bookmarkedShlokas.filter(shloka => 
    shloka.sanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shloka.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shloka.chapter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ShlokaCard = ({ shloka }: { shloka: any }) => (
    <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center text-sm text-orange-500">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(shloka.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <div className="flex items-center">
          <BookOpen className="w-4 h-4 mr-1 text-orange-500" />
          <span className="text-sm text-orange-600 font-medium">{shloka.chapter}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-lg text-orange-800 font-serif mb-2">
          {shloka.sanskrit}
        </p>
        <p className="text-orange-600 leading-relaxed">
          {shloka.translation}
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          className={`${
            shloka.isBookmarked 
              ? 'bg-red-50 border-red-200 text-red-600' 
              : 'border-orange-200 text-orange-600'
          }`}
        >
          <Heart className={`w-4 h-4 mr-1 ${shloka.isBookmarked ? 'fill-current' : ''}`} />
          {shloka.isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-orange-600 hover:bg-orange-50"
        >
          Read Full Verse
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-orange-800 mb-2">Shloka History</h1>
        <p className="text-orange-600">Your spiritual journey through the Gita</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search shlokas, translations, or chapters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-orange-200 focus:border-orange-400"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            All Shlokas ({filteredShlokas.length})
          </TabsTrigger>
          <TabsTrigger value="bookmarked" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
            Bookmarked ({filteredBookmarks.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {filteredShlokas.length > 0 ? (
            <div>
              {filteredShlokas.map((shloka) => (
                <ShlokaCard key={shloka.id} shloka={shloka} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-orange-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-orange-700 mb-2">No shlokas found</h3>
              <p className="text-orange-600">Try adjusting your search terms</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="bookmarked">
          {filteredBookmarks.length > 0 ? (
            <div>
              {filteredBookmarks.map((shloka) => (
                <ShlokaCard key={shloka.id} shloka={shloka} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-orange-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-orange-700 mb-2">
                {searchQuery ? 'No bookmarked shlokas found' : 'No bookmarked shlokas yet'}
              </h3>
              <p className="text-orange-600">
                {searchQuery 
                  ? 'Try adjusting your search terms' 
                  : 'Start bookmarking your favorite verses to see them here'
                }
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShlokaHistory;
