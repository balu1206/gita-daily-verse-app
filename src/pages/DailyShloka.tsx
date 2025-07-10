
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Heart, Share2, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DailyShloka = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const { toast } = useToast();

  const shloka = {
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि।।",
    transliteration: "karmaṇy-evādhikāras te mā phaleṣhu kadāchana mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
    chapter: "Chapter 2, Verse 47",
    translations: {
      english: "You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
      telugu: "కర్మలో మాత్రమే నీ అధికారం, ఫలాలలో ఎప్పటికీ లేదు. కర్మఫలహేతువు అవకు, కర్మరాహిత్యంలో కూడా అనురక్తి లేకుండా ఉండు.",
      tamil: "உனக்கு கர்மத்தில் மட்டுமே அதிகாரம் உள்ளது, பலனில் ஒருபோதும் இல்லை. கர்ம பலத்தின் காரணமாக ஆகாதே, கர்மம் செய்யாமல் இருப்பதிலும் பற்று வேண்டாம்.",
      kannada: "ಕರ್ಮದಲ್ಲಿ ಮಾತ್ರ ನಿನಗೆ ಅಧಿಕಾರವಿದೆ, ಫಲದಲ್ಲಿ ಎಂದಿಗೂ ಇಲ್ಲ. ಕರ್ಮಫಲದ ಕಾರಣವಾಗಬೇಡ, ಕರ್ಮರಹಿತತೆಯಲ್ಲಿಯೂ ಆಸಕ್ತಿ ಬೇಡ.",
      hindi: "कर्म में ही तेरा अधिकार है, फल में कभी नहीं। कर्मफल का हेतु मत बन और कर्म न करने में भी आसक्ति मत रख।"
    },
    meaning: "This verse teaches the fundamental principle of Karma Yoga - performing one's duty without attachment to results. It emphasizes that we should focus on our actions rather than being anxious about outcomes, as this leads to peace and spiritual growth."
  };

  const languages = [
    { code: 'english', name: 'English' },
    { code: 'telugu', name: 'తెలుగు' },
    { code: 'tamil', name: 'தமிழ்' },
    { code: 'kannada', name: 'ಕನ್ನಡ' },
    { code: 'hindi', name: 'हिंदी' }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Audio paused" : "Playing Sanskrit audio",
      description: isPlaying ? "Sanskrit recitation paused" : "Listen to the beautiful pronunciation",
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from favorites" : "Added to favorites",
      description: isBookmarked ? "Shloka removed from your collection" : "Shloka saved to your favorites",
    });
  };

  const handleShare = () => {
    toast({
      title: "Sharing shloka...",
      description: "Share this divine wisdom with others",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-orange-800 mb-2">Today's Shloka</h1>
        <p className="text-orange-600">Daily wisdom from the Bhagavad Gita</p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-lg shadow-lg border border-orange-100 overflow-hidden">
        {/* Sanskrit Text */}
        <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-6 text-center">
          <p className="text-2xl text-orange-800 font-serif leading-relaxed mb-4">
            {shloka.sanskrit}
          </p>
          <p className="text-orange-600 italic text-lg">
            {shloka.transliteration}
          </p>
          <p className="text-sm text-orange-500 mt-2 font-medium">
            {shloka.chapter}
          </p>
        </div>

        {/* Audio Controls */}
        <div className="flex justify-center items-center p-4 bg-orange-50 border-y border-orange-100">
          <Button
            onClick={handlePlayPause}
            className={`mr-4 ${isPlaying ? 'bg-orange-600' : 'bg-orange-500'} hover:bg-orange-600 text-white`}
          >
            {isPlaying ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
            {isPlaying ? 'Pause' : 'Play Sanskrit'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleBookmark}
            className={`mr-2 ${isBookmarked ? 'bg-red-50 border-red-200 text-red-600' : 'border-orange-200 text-orange-600'}`}
          >
            <Heart className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
          
          <Button
            variant="outline"
            onClick={handleShare}
            className="border-orange-200 text-orange-600"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Language Selection */}
        <div className="p-4 border-b border-orange-100">
          <div className="flex items-center mb-3">
            <Globe className="w-5 h-5 text-orange-600 mr-2" />
            <span className="font-medium text-orange-800">Select Language:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={selectedLanguage === lang.code ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage(lang.code)}
                className={selectedLanguage === lang.code 
                  ? "bg-orange-500 hover:bg-orange-600 text-white" 
                  : "border-orange-200 text-orange-600 hover:bg-orange-50"
                }
              >
                {lang.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Translation */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-orange-800 mb-3">Translation</h3>
          <p className="text-orange-700 leading-relaxed text-lg mb-6">
            {shloka.translations[selectedLanguage as keyof typeof shloka.translations]}
          </p>
          
          <h3 className="text-lg font-semibold text-orange-800 mb-3">Meaning & Reflection</h3>
          <p className="text-orange-600 leading-relaxed">
            {shloka.meaning}
          </p>
        </div>
      </div>

      {/* Daily Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 text-center shadow-md border border-orange-100">
          <div className="text-2xl font-bold text-orange-600">7</div>
          <div className="text-sm text-orange-500">Day Streak</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-md border border-orange-100">
          <div className="text-2xl font-bold text-orange-600">47</div>
          <div className="text-sm text-orange-500">Verses Read</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-md border border-orange-100">
          <div className="text-2xl font-bold text-orange-600">120</div>
          <div className="text-sm text-orange-500">Coins Earned</div>
        </div>
      </div>
    </div>
  );
};

export default DailyShloka;
