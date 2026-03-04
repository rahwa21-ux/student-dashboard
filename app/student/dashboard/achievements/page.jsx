"use client";
import React, { useState } from "react";
import {
  FaTrophy,
  FaStar,
  FaMedal,
  FaAward,
  FaRocket,
  FaChartLine,
  FaFire,
  FaBook,
  FaLightbulb,
  FaUserGraduate,
} from "react-icons/fa";
import DashboardLayout from "@/app/student/components/DashboardLayout";

// Achievement categories
const categories = ["All", "Academic", "Skill", "Milestone", "Challenge"];

// Achievement data
const achievementsData = [
  {
    id: 1,
    title: "Perfect Score",
    description: "Achieve 100% on any major exam",
    icon: <FaTrophy className="text-yellow-500" size={24} />,
    progress: 100,
    total: 100,
    category: "Academic",
    unlocked: true,
    date: "Dec 15, 2023",
    reward: "Gold Badge",
    color: "bg-gradient-to-r from-yellow-700 to-orange-700",
  },
  {
    id: 2,
    title: "Consistent Learner",
    description: "Complete 30 days of daily study",
    icon: <FaChartLine className="text-green-500" size={24} />,
    progress: 28,
    total: 30,
    category: "Milestone",
    unlocked: false,
    date: null,
    reward: "Silver Badge + 500 XP",
    color: "bg-gradient-to-r from-green-700 to-emerald-700",
  },
  {
    id: 3,
    title: "Master of Mathematics",
    description: "Complete all advanced math topics",
    icon: <FaBook className="text-indigo-500" size={24} />,
    progress: 85,
    total: 100,
    category: "Skill",
    unlocked: false,
    date: null,
    reward: "Platinum Badge",
    color: "bg-gradient-to-r from-indigo-700 to-purple-700",
  },
  {
    id: 4,
    title: "Speed Reader",
    description: "Read 50 articles in one week",
    icon: <FaRocket className="text-blue-500" size={24} />,
    progress: 42,
    total: 50,
    category: "Challenge",
    unlocked: false,
    date: null,
    reward: "Gold Badge + 300 XP",
    color: "bg-gradient-to-r from-blue-700 to-cyan-700",
  },
  {
    id: 5,
    title: "Perfect Attendance",
    description: "Attend all classes for one month",
    icon: <FaMedal className="text-red-500" size={24} />,
    progress: 100,
    total: 100,
    category: "Academic",
    unlocked: true,
    date: "Nov 30, 2023",
    reward: "Silver Badge",
    color: "bg-gradient-to-r from-red-700 to-pink-700",
  },
  {
    id: 6,
    title: "Creative Thinker",
    description: "Submit 10 innovative project ideas",
    icon: <FaLightbulb className="text-amber-500" size={24} />,
    progress: 7,
    total: 10,
    category: "Skill",
    unlocked: false,
    date: null,
    reward: "Bronze Badge",
    color: "bg-gradient-to-r from-amber-700 to-orange-700",
  },
  {
    id: 7,
    title: "Top Performer",
    description: "Rank in top 5% of your class",
    icon: <FaAward className="text-purple-500" size={24} />,
    progress: 100,
    total: 100,
    category: "Academic",
    unlocked: true,
    date: "Dec 20, 2023",
    reward: "Diamond Badge + 1000 XP",
    color: "bg-gradient-to-r from-purple-700 to-pink-700",
  },
  {
    id: 8,
    title: "Streak Master",
    description: "Maintain a 100-day learning streak",
    icon: <FaFire className="text-orange-500" size={24} />,
    progress: 65,
    total: 100,
    category: "Milestone",
    unlocked: false,
    date: null,
    reward: "Gold Badge + 750 XP",
    color: "bg-gradient-to-r from-orange-700 to-red-700",
  },
  {
    id: 9,
    title: "Knowledge Master",
    description: "Complete 500 quiz questions",
    icon: <FaUserGraduate className="text-teal-500" size={24} />,
    progress: 320,
    total: 500,
    category: "Skill",
    unlocked: false,
    date: null,
    reward: "Gold Badge + 600 XP",
    color: "bg-gradient-to-r from-teal-700 to-green-700",
  },
  {
    id: 10,
    title: "Early Bird",
    description: "Complete assignments 3 days early",
    icon: <FaStar className="text-yellow-400" size={24} />,
    progress: 100,
    total: 100,
    category: "Challenge",
    unlocked: true,
    date: "Dec 10, 2023",
    reward: "Silver Badge",
    color: "bg-gradient-to-r from-yellow-700 to-amber-700",
  },
];

const Achievements = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [achievements] = useState(achievementsData);

  // Filter achievements by category
  const filteredAchievements =
    activeCategory === "All"
      ? achievements
      : achievements.filter(
          (achievement) => achievement.category === activeCategory,
        );

  // Calculate statistics
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);
  const totalXP = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => {
      const xpMatch = a.reward.match(/(\d+)\s*XP/);
      return sum + (xpMatch ? parseInt(xpMatch[1]) : 0);
    }, 0);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Achievements
          </h1>
          <p className="text-gray-600">
            Track your accomplishments and earn rewards for your hard work.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Unlocked</p>
                <p className="text-2xl font-bold">
                  {unlockedCount}/{totalCount}
                </p>
              </div>
              <FaTrophy size={32} className="opacity-80" />
            </div>
            <div className="mt-3">
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs mt-2 opacity-90">
                {progressPercentage}% Complete
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total XP</p>
                <p className="text-2xl font-bold text-gray-900">{totalXP}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FaStar className="text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Experience Points</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Gold Badges</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <FaMedal className="text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Highest earned</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Rank</p>
                <p className="text-2xl font-bold text-gray-900">#42</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FaChartLine className="text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">Top 15% of students</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`bg-white rounded-xl border-2 ${
                achievement.unlocked ? "border-yellow-400" : "border-gray-200"
              } p-5 shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden`}
            >
              {/* Unlocked Ribbon */}
              {achievement.unlocked && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                  UNLOCKED
                </div>
              )}

              {/* Achievement Icon */}
              <div
                className={`${achievement.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}
              >
                {achievement.icon}
              </div>

              {/* Achievement Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {achievement.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700">Progress</span>
                    <span className="font-medium">
                      {achievement.progress}/{achievement.total}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        achievement.unlocked ? "bg-green-500" : "bg-indigo-500"
                      }`}
                      style={{
                        width: `${(achievement.progress / achievement.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Reward */}
                <div className="text-xs">
                  <span className="text-gray-700">Reward:</span>{" "}
                  <span className="font-medium text-indigo-600">
                    {achievement.reward}
                  </span>
                </div>

                {/* Date Unlocked */}
                {achievement.unlocked && achievement.date && (
                  <div className="text-xs text-gray-500 mt-2">
                    Unlocked: {achievement.date}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-2.5 rounded-lg font-medium transition-colors duration-200 ${
                  achievement.unlocked
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {achievement.unlocked ? "View Details" : "Continue Progress"}
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No achievements found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              No achievements in the {activeCategory.toLowerCase()} category
              yet. Keep learning to unlock achievements!
            </p>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Legend</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Unlocked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
              <span className="text-sm text-gray-600">In Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Gold Badge</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Silver Badge</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Achievements;
