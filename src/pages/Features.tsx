
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Globe, TrendingUp, Award, Volume2, Heart } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Daily Sacred Verses",
      description: "Receive one carefully selected shloka from the Bhagavad Gita every day with Sanskrit text in beautiful Devanagari script"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Read translations and meanings in Telugu, Kannada, Tamil, and Hindi to understand in your preferred language"
    },
    {
      icon: Volume2,
      title: "Audio Pronunciation",
      description: "Listen to correct Sanskrit pronunciation with built-in text-to-speech functionality"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Track your spiritual journey with daily streaks and completion progress through the entire Gita"
    },
    {
      icon: Award,
      title: "Rewards System",
      description: "Earn coins for daily engagement and redeem them for spiritual books, items, and traditional clothing"
    },
    {
      icon: Heart,
      title: "Bookmark Favorites",
      description: "Save your favorite verses and access them anytime in your personal collection"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-orange-800">Features</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-orange-800 mb-4">
            Everything You Need for Spiritual Growth
          </h2>
          <p className="text-lg text-orange-600 max-w-2xl mx-auto">
            Discover the transformative wisdom of the Bhagavad Gita with features designed to make your spiritual journey meaningful and accessible.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-orange-100">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-lg p-3 flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-orange-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg p-8 shadow-md border border-orange-100">
          <h3 className="text-2xl font-bold text-orange-800 mb-4">
            Ready to Begin Your Journey?
          </h3>
          <p className="text-orange-600 mb-6">
            Join thousands of spiritual seekers who start their day with divine wisdom
          </p>
          <div className="space-y-3 max-w-sm mx-auto">
            <Link to="/app" className="block">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/login" className="block">
              <Button variant="outline" className="w-full border-orange-300 text-orange-700 hover:bg-orange-50">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
