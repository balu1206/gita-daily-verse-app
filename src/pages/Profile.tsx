
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User, Flame, Coins, BookOpen, Award, TrendingUp, Calendar } from "lucide-react";

const Profile = () => {
  const user = {
    name: "Arjun Sharma",
    email: "arjun.sharma@example.com",
    joinDate: "October 2023",
    currentStreak: 7,
    longestStreak: 21,
    totalShlokas: 47,
    coins: 120,
    completionPercentage: 6.5, // 47 out of 700 verses
    badges: [
      { name: "First Week", icon: Calendar, earned: true },
      { name: "Devoted Reader", icon: BookOpen, earned: true },
      { name: "Sanskrit Scholar", icon: Award, earned: false },
      { name: "Spiritual Seeker", icon: Flame, earned: true },
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-orange-800 mb-2">Your Profile</h1>
        <p className="text-orange-600">Track your spiritual journey</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-lg border border-orange-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-br from-orange-400 to-amber-500 p-6 text-white text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
          <p className="text-orange-100">{user.email}</p>
          <p className="text-orange-100 text-sm mt-2">Member since {user.joinDate}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 text-center shadow-md border border-orange-100">
          <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-600">{user.currentStreak}</div>
          <div className="text-sm text-orange-500">Current Streak</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-md border border-orange-100">
          <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-600">{user.longestStreak}</div>
          <div className="text-sm text-orange-500">Longest Streak</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-md border border-orange-100">
          <BookOpen className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-600">{user.totalShlokas}</div>
          <div className="text-sm text-orange-500">Verses Read</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-md border border-orange-100">
          <Coins className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-600">{user.coins}</div>
          <div className="text-sm text-orange-500">Coins Earned</div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-lg shadow-lg border border-orange-100 p-6 mb-6">
        <h3 className="text-xl font-semibold text-orange-800 mb-4">Gita Completion Progress</h3>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-orange-600">Overall Progress</span>
            <span className="text-orange-800 font-semibold">{user.completionPercentage}%</span>
          </div>
          <Progress value={user.completionPercentage} className="h-3" />
          <p className="text-sm text-orange-500 mt-2">
            {user.totalShlokas} of 700 verses completed
          </p>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <h4 className="font-semibold text-orange-800 mb-2">Chapter Progress</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-orange-600">Chapter 1: The Distress of Arjuna</span>
              <span className="text-orange-800">Completed</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-orange-600">Chapter 2: Contents of the Gita</span>
              <span className="text-orange-800">In Progress (22/72)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-orange-600">Chapter 3: Karma Yoga</span>
              <span className="text-orange-500">Not Started</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white rounded-lg shadow-lg border border-orange-100 p-6 mb-6">
        <h3 className="text-xl font-semibold text-orange-800 mb-4">Achievements</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user.badges.map((badge, index) => (
            <div
              key={index}
              className={`text-center p-4 rounded-lg border ${
                badge.earned
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-gray-50 border-gray-200 opacity-50'
              }`}
            >
              <badge.icon
                className={`w-8 h-8 mx-auto mb-2 ${
                  badge.earned ? 'text-orange-500' : 'text-gray-400'
                }`}
              />
              <p className={`text-sm font-medium ${
                badge.earned ? 'text-orange-800' : 'text-gray-500'
              }`}>
                {badge.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3">
          Share Your Progress
        </Button>
        <Button variant="outline" className="w-full border-orange-300 text-orange-700 hover:bg-orange-50">
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default Profile;
