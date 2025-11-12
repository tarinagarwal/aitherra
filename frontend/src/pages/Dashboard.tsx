import { useAuth } from "../contexts/AuthContext";
import { BookOpen, Code, Trophy, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-zinc-400">
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <BookOpen className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-zinc-400 text-sm">Lessons Completed</span>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Code className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-zinc-400 text-sm">Challenges Solved</span>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-zinc-400 text-sm">Total XP</span>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-zinc-400 text-sm">Day Streak</span>
            </div>
            <p className="text-3xl font-bold text-white">0</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Continue Learning */}
          <div className="lg:col-span-2 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Continue Learning
            </h2>
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-10 h-10 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Your Learning Path is Ready!
              </h3>
              <p className="text-zinc-400 mb-6">
                Start your personalized curriculum based on your onboarding
                preferences
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all">
                Start First Lesson
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full p-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-left transition-colors">
                <div className="flex items-center gap-3">
                  <Code className="w-5 h-5 text-indigo-400" />
                  <div>
                    <p className="text-white font-medium">Practice Challenge</p>
                    <p className="text-xs text-zinc-400">
                      Solve coding problems
                    </p>
                  </div>
                </div>
              </button>

              <button className="w-full p-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-left transition-colors">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">Browse Courses</p>
                    <p className="text-xs text-zinc-400">
                      Explore learning paths
                    </p>
                  </div>
                </div>
              </button>

              <button className="w-full p-4 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-left transition-colors">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-white font-medium">View Achievements</p>
                    <p className="text-xs text-zinc-400">Track your progress</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
