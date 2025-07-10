
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Flower2, Sun, BookOpen } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-md mx-auto">
        {/* App Logo */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
            <Flower2 className="w-12 h-12 text-white" />
          </div>
          <Sun className="w-8 h-8 text-orange-400 absolute -top-2 -right-2 animate-pulse" />
        </div>
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-orange-800 mb-2">
          Bhagavad Gita Daily
        </h1>
        <p className="text-lg text-orange-600 mb-8 leading-relaxed">
          Begin your spiritual journey with daily wisdom from the sacred Bhagavad Gita
        </p>
        
        {/* Features preview */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="text-center">
            <BookOpen className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-orange-700">Daily Verses</p>
          </div>
          <div className="text-center">
            <Flower2 className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-orange-700">Regional Languages</p>
          </div>
          <div className="text-center">
            <Sun className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-sm text-orange-700">Audio Playback</p>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="space-y-3">
          <Link to="/app" className="block">
            <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 text-lg font-semibold shadow-lg">
              Get Started
            </Button>
          </Link>
          <Link to="/features" className="block">
            <Button variant="outline" className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 py-3">
              Learn More
            </Button>
          </Link>
          <Link to="/login" className="block">
            <Button variant="ghost" className="w-full text-orange-600 hover:bg-orange-50">
              Already have an account? Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
