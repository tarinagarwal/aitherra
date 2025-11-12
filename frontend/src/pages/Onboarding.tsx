import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Loader2,
  Code2,
  Rocket,
  Trophy,
  Clock,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface OnboardingData {
  experienceLevel: string;
  timeCommitment: number;
  primaryLanguage: string;
  learningGoals: string[];
  learningStyle: string;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    experienceLevel: "",
    timeCommitment: 5,
    primaryLanguage: "",
    learningGoals: [],
    learningStyle: "",
  });

  // Redirect if already onboarded
  if (user?.isOnboarded) {
    navigate("/dashboard", { replace: true });
    return null;
  }

  // Prevent navigation away from onboarding
  useEffect(() => {
    // Block browser back button
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      navigate("/onboarding", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    // Push current state to prevent back navigation
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  // Prevent navigation via route changes
  useEffect(() => {
    if (user && !user.isOnboarded && location.pathname !== "/onboarding") {
      navigate("/onboarding", { replace: true });
    }
  }, [location.pathname, user, navigate]);

  // Warn user before closing tab/window
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // Chrome requires returnValue to be set
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleComplete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3001/api/onboarding/complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to complete onboarding");
      }

      const result = await response.json();
      updateUser({ ...user!, isOnboarded: true });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Onboarding error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to complete onboarding. Please try again."
      );
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
    else handleComplete();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-zinc-400">Step {step} of 5</span>
            <span className="text-sm text-zinc-400">
              {Math.round((step / 5) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          {step === 1 && <ExperienceStep data={data} setData={setData} />}
          {step === 2 && <TimeCommitmentStep data={data} setData={setData} />}
          {step === 3 && <LanguageStep data={data} setData={setData} />}
          {step === 4 && <GoalsStep data={data} setData={setData} />}
          {step === 5 && <LearningStyleStep data={data} setData={setData} />}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex-1 px-6 py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={nextStep}
              disabled={loading || !isStepValid(step, data)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Completing...
                </>
              ) : step === 5 ? (
                <>
                  <Sparkles className="w-5 h-5" />
                  Complete Setup
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function isStepValid(step: number, data: OnboardingData): boolean {
  switch (step) {
    case 1:
      return data.experienceLevel !== "";
    case 2:
      return data.timeCommitment > 0;
    case 3:
      return data.primaryLanguage !== "";
    case 4:
      return data.learningGoals.length > 0;
    case 5:
      return data.learningStyle !== "";
    default:
      return false;
  }
}

// Step 1: Experience Level
function ExperienceStep({
  data,
  setData,
}: {
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
}) {
  const levels = [
    {
      id: "beginner",
      title: "Beginner",
      description: "Just starting my coding journey",
      icon: BookOpen,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description: "I know the basics and want to level up",
      icon: Code2,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "advanced",
      title: "Advanced",
      description: "Experienced developer seeking mastery",
      icon: Trophy,
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">
        What's your experience level?
      </h2>
      <p className="text-zinc-400 mb-8">
        Help us personalize your learning path
      </p>

      <div className="space-y-4">
        {levels.map((level) => {
          const Icon = level.icon;
          const isSelected = data.experienceLevel === level.id;
          return (
            <button
              key={level.id}
              onClick={() => setData({ ...data, experienceLevel: level.id })}
              className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${level.color} flex-shrink-0`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {level.title}
                  </h3>
                  <p className="text-zinc-400">{level.description}</p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Step 2: Time Commitment
function TimeCommitmentStep({
  data,
  setData,
}: {
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
}) {
  const commitments = [
    { hours: 2, label: "2-3 hours", description: "Light learning" },
    { hours: 5, label: "5-7 hours", description: "Steady progress" },
    { hours: 10, label: "10-15 hours", description: "Serious commitment" },
    { hours: 20, label: "20+ hours", description: "Intensive learning" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">
        How much time can you commit?
      </h2>
      <p className="text-zinc-400 mb-8">
        Hours per week you can dedicate to learning
      </p>

      <div className="grid grid-cols-2 gap-4">
        {commitments.map((commitment) => {
          const isSelected = data.timeCommitment === commitment.hours;
          return (
            <button
              key={commitment.hours}
              onClick={() =>
                setData({ ...data, timeCommitment: commitment.hours })
              }
              className={`p-6 rounded-xl border-2 transition-all ${
                isSelected
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <Clock
                  className={`w-8 h-8 mb-3 ${
                    isSelected ? "text-indigo-400" : "text-zinc-400"
                  }`}
                />
                <h3 className="text-xl font-semibold text-white mb-1">
                  {commitment.label}
                </h3>
                <p className="text-sm text-zinc-400">
                  {commitment.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Step 3: Language Selection
function LanguageStep({
  data,
  setData,
}: {
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
}) {
  const languages = [
    {
      id: "python",
      name: "Python",
      icon: "🐍",
      color: "from-blue-500 to-yellow-500",
    },
    {
      id: "javascript",
      name: "JavaScript",
      icon: "⚡",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: "java",
      name: "Java",
      icon: "☕",
      color: "from-red-500 to-orange-600",
    },
    {
      id: "cpp",
      name: "C++",
      icon: "⚙️",
      color: "from-blue-600 to-purple-600",
    },
    {
      id: "csharp",
      name: "C#",
      icon: "🎯",
      color: "from-purple-500 to-pink-600",
    },
    { id: "go", name: "Go", icon: "🔷", color: "from-cyan-500 to-blue-600" },
    {
      id: "rust",
      name: "Rust",
      icon: "🦀",
      color: "from-orange-500 to-red-600",
    },
    {
      id: "typescript",
      name: "TypeScript",
      icon: "📘",
      color: "from-blue-500 to-blue-700",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">
        Choose your primary language
      </h2>
      <p className="text-zinc-400 mb-8">
        Which language do you want to master first?
      </p>

      <div className="grid grid-cols-2 gap-4">
        {languages.map((language) => {
          const isSelected = data.primaryLanguage === language.id;
          return (
            <button
              key={language.id}
              onClick={() => setData({ ...data, primaryLanguage: language.id })}
              className={`p-5 rounded-xl border-2 transition-all ${
                isSelected
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`text-3xl p-2 rounded-lg bg-gradient-to-br ${language.color}`}
                >
                  {language.icon}
                </div>
                <span className="text-lg font-semibold text-white">
                  {language.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Step 4: Learning Goals
function GoalsStep({
  data,
  setData,
}: {
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
}) {
  const goals = [
    { id: "career", label: "Career Change", icon: "💼" },
    { id: "skills", label: "Improve Skills", icon: "📈" },
    { id: "projects", label: "Build Projects", icon: "🚀" },
    { id: "interview", label: "Ace Interviews", icon: "🎯" },
    { id: "freelance", label: "Freelancing", icon: "💰" },
    { id: "hobby", label: "Personal Hobby", icon: "🎨" },
  ];

  const toggleGoal = (goalId: string) => {
    const newGoals = data.learningGoals.includes(goalId)
      ? data.learningGoals.filter((g) => g !== goalId)
      : [...data.learningGoals, goalId];
    setData({ ...data, learningGoals: newGoals });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">
        What are your learning goals?
      </h2>
      <p className="text-zinc-400 mb-8">Select all that apply</p>

      <div className="grid grid-cols-2 gap-4">
        {goals.map((goal) => {
          const isSelected = data.learningGoals.includes(goal.id);
          return (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`p-5 rounded-xl border-2 transition-all ${
                isSelected
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{goal.icon}</span>
                <span className="text-lg font-semibold text-white">
                  {goal.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Step 5: Learning Style
function LearningStyleStep({
  data,
  setData,
}: {
  data: OnboardingData;
  setData: (data: OnboardingData) => void;
}) {
  const styles = [
    {
      id: "visual",
      title: "Visual Learner",
      description: "I learn best with diagrams and videos",
      icon: "👁️",
    },
    {
      id: "hands-on",
      title: "Hands-On",
      description: "I prefer coding and building projects",
      icon: "⌨️",
    },
    {
      id: "reading",
      title: "Reading & Writing",
      description: "I like documentation and written tutorials",
      icon: "📚",
    },
    {
      id: "mixed",
      title: "Mixed Approach",
      description: "I enjoy a combination of all methods",
      icon: "🎯",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-2">
        How do you learn best?
      </h2>
      <p className="text-zinc-400 mb-8">Choose your preferred learning style</p>

      <div className="space-y-4">
        {styles.map((style) => {
          const isSelected = data.learningStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => setData({ ...data, learningStyle: style.id })}
              className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                isSelected
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl">{style.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {style.title}
                  </h3>
                  <p className="text-zinc-400">{style.description}</p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
