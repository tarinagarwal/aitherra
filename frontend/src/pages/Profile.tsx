import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  Code,
  Clock,
  Target,
  BookOpen,
  Loader2,
  ArrowLeft,
} from "lucide-react";

interface ProfileData {
  id: string;
  name: string;
  username: string;
  profileImage?: string;
  isOnboarded: boolean;
  experienceLevel?: string;
  timeCommitment?: number;
  primaryLanguage?: string;
  learningGoals: string[];
  learningStyle?: string;
  createdAt: string;
}

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
        const response = await fetch(`${API_URL}/api/profile/${username}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError("User not found");
          } else {
            setError("Failed to load profile");
          }
          return;
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center pt-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-zinc-600" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{error}</h2>
          <p className="text-zinc-400 mb-6">
            The profile you're looking for doesn't exist
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const experienceLevelMap: Record<string, { label: string; color: string }> = {
    beginner: { label: "Beginner", color: "from-green-500 to-emerald-600" },
    intermediate: { label: "Intermediate", color: "from-blue-500 to-cyan-600" },
    advanced: { label: "Advanced", color: "from-purple-500 to-pink-600" },
  };

  const languageMap: Record<string, { name: string; icon: string }> = {
    python: { name: "Python", icon: "🐍" },
    javascript: { name: "JavaScript", icon: "⚡" },
    java: { name: "Java", icon: "☕" },
    cpp: { name: "C++", icon: "⚙️" },
    csharp: { name: "C#", icon: "🎯" },
    go: { name: "Go", icon: "🔷" },
    rust: { name: "Rust", icon: "🦀" },
    typescript: { name: "TypeScript", icon: "📘" },
  };

  const goalMap: Record<string, { label: string; icon: string }> = {
    career: { label: "Career Change", icon: "💼" },
    skills: { label: "Improve Skills", icon: "📈" },
    projects: { label: "Build Projects", icon: "🚀" },
    interview: { label: "Ace Interviews", icon: "🎯" },
    freelance: { label: "Freelancing", icon: "💰" },
    hobby: { label: "Personal Hobby", icon: "🎨" },
  };

  const styleMap: Record<string, string> = {
    visual: "Visual Learner 👁️",
    "hands-on": "Hands-On ⌨️",
    reading: "Reading & Writing 📚",
    mixed: "Mixed Approach 🎯",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black pt-24 pb-12 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Image */}
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt={profile.name}
                className="w-24 h-24 rounded-full border-4 border-indigo-500/30"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            )}

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-1">
                {profile.name}
              </h1>
              <p className="text-zinc-400 mb-4">@{profile.username}</p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 rounded-lg">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm text-zinc-300">
                    Joined{" "}
                    {new Date(profile.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {profile.isOnboarded ? (
          <>
            {/* Learning Profile */}
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Learning Profile
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Experience Level */}
                {profile.experienceLevel && (
                  <div className="bg-zinc-800/50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${
                          experienceLevelMap[profile.experienceLevel]?.color ||
                          "from-gray-500 to-gray-600"
                        }`}
                      >
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-zinc-400">
                        Experience Level
                      </span>
                    </div>
                    <p className="text-xl font-semibold text-white">
                      {experienceLevelMap[profile.experienceLevel]?.label ||
                        profile.experienceLevel}
                    </p>
                  </div>
                )}

                {/* Time Commitment */}
                {profile.timeCommitment && (
                  <div className="bg-zinc-800/50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-zinc-400">
                        Time Commitment
                      </span>
                    </div>
                    <p className="text-xl font-semibold text-white">
                      {profile.timeCommitment} hours/week
                    </p>
                  </div>
                )}

                {/* Primary Language */}
                {profile.primaryLanguage && (
                  <div className="bg-zinc-800/50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                        <Code className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-zinc-400">
                        Primary Language
                      </span>
                    </div>
                    <p className="text-xl font-semibold text-white">
                      {languageMap[profile.primaryLanguage]?.icon}{" "}
                      {languageMap[profile.primaryLanguage]?.name ||
                        profile.primaryLanguage}
                    </p>
                  </div>
                )}

                {/* Learning Style */}
                {profile.learningStyle && (
                  <div className="bg-zinc-800/50 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm text-zinc-400">
                        Learning Style
                      </span>
                    </div>
                    <p className="text-xl font-semibold text-white">
                      {styleMap[profile.learningStyle] || profile.learningStyle}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Learning Goals */}
            {profile.learningGoals.length > 0 && (
              <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Learning Goals
                </h2>
                <div className="flex flex-wrap gap-3">
                  {profile.learningGoals.map((goal) => (
                    <div
                      key={goal}
                      className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg"
                    >
                      <span className="text-white font-medium">
                        {goalMap[goal]?.icon} {goalMap[goal]?.label || goal}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Profile Not Complete
            </h3>
            <p className="text-zinc-400">
              This user hasn't completed their learning profile yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
