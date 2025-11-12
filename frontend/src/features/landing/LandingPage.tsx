import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Code,
  Trophy,
  Users,
  Target,
  Zap,
  TrendingUp,
  Award,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { GoogleLoginButton } from "../../components/auth/GoogleLoginButton";

export function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect onboarded users away from landing page
    if (user?.isOnboarded) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="pt-40 min-h-screen pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* <div className="inline-block mb-4 px-4 py-2 bg-indigo-500/10 backdrop-blur-xl border border-indigo-500/20 rounded-full"></div> */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Master Programming with </span>
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Personalized AI Tutoring
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            Learn any programming language with adaptive AI guidance,
            interactive coding challenges, and a supportive community. From
            beginner to expert, we personalize your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 transition-all text-lg">
                  Start Learning Free
                </button>
                <button className="px-8 py-4 bg-zinc-900/50 backdrop-blur-xl border border-indigo-500/20 text-white font-semibold rounded-xl hover:bg-zinc-900 transition-all text-lg">
                  Take Skill Assessment
                </button>
              </>
            ) : (
              <GoogleLoginButton />
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { value: "50K+", label: "Active Learners" },
              { value: "15+", label: "Languages" },
              { value: "92%", label: "Success Rate" },
              { value: "24/7", label: "AI Support" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-indigo-500/10 backdrop-blur-xl border border-indigo-500/20 p-4 rounded-xl"
              >
                <div className="text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-slate-400">
              A complete learning ecosystem powered by advanced AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-indigo-500/10 backdrop-blur-xl border border-indigo-500/20 p-6 rounded-2xl hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                AI-Powered Tutor
              </h3>
              <p className="text-indigo-200">
                Get instant, personalized help with context-aware explanations,
                code reviews, and debugging assistance.
              </p>
            </div>

            <div className="bg-teal-500/10 backdrop-blur-xl border border-teal-500/20 p-6 rounded-2xl hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Personalized Path
              </h3>
              <p className="text-teal-200">
                Adaptive curriculum that adjusts to your skill level, learning
                style, and goals.
              </p>
            </div>

            <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 p-6 rounded-2xl hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Interactive Editor
              </h3>
              <p className="text-blue-200">
                Code directly in your browser with real-time execution,
                debugging, and AI-powered autocomplete.
              </p>
            </div>

            <div className="bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 p-6 rounded-2xl hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Gamified Learning
              </h3>
              <p className="text-amber-200">
                Earn XP, unlock achievements, maintain streaks, and compete on
                leaderboards.
              </p>
            </div>

            <div className="bg-rose-500/10 backdrop-blur-xl border border-rose-500/20 p-6 rounded-2xl hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Active Community
              </h3>
              <p className="text-rose-200">
                Connect with peers, join study groups, find mentors, and
                collaborate on projects.
              </p>
            </div>

            <div className="bg-purple-500/10 backdrop-blur-xl border border-purple-500/20 p-6 rounded-2xl hover:scale-105 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Certification
              </h3>
              <p className="text-purple-200">
                Earn industry-recognized certificates to showcase your skills to
                employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-slate-400">
              Structured curricula designed for real-world success
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Web Development */}
            <div className="bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 p-8 rounded-2xl hover:scale-105 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Code className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Web Development
                  </h3>
                  <p className="text-sm text-blue-300">Frontend & Backend</p>
                </div>
              </div>
              <p className="text-blue-200 mb-4">
                Master HTML, CSS, JavaScript, React, Node.js, and build
                full-stack applications from scratch.
              </p>
              <div className="flex flex-wrap gap-2">
                {["JavaScript", "React", "Node.js"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Science */}
            <div className="bg-teal-500/10 backdrop-blur-xl border border-teal-500/20 p-8 rounded-2xl hover:scale-105 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-teal-500/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Data Science
                  </h3>
                  <p className="text-sm text-teal-300">AI & Machine Learning</p>
                </div>
              </div>
              <p className="text-teal-200 mb-4">
                Learn Python, data analysis, machine learning, and build
                intelligent applications with real datasets.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Python", "Pandas", "TensorFlow"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile Development */}
            <div className="bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 p-8 rounded-2xl hover:scale-105 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Mobile Development
                  </h3>
                  <p className="text-sm text-amber-300">iOS & Android</p>
                </div>
              </div>
              <p className="text-amber-200 mb-4">
                Build native and cross-platform mobile apps with React Native,
                Flutter, or Swift/Kotlin.
              </p>
              <div className="flex flex-wrap gap-2">
                {["React Native", "Flutter", "Swift"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interview Prep */}
            <div className="bg-rose-500/10 backdrop-blur-xl border border-rose-500/20 p-8 rounded-2xl hover:scale-105 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-rose-500/20 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Interview Prep
                  </h3>
                  <p className="text-sm text-rose-300">Land Your Dream Job</p>
                </div>
              </div>
              <p className="text-rose-200 mb-4">
                Practice coding interviews, system design, and behavioral
                questions with AI mock interviews.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Algorithms", "System Design", "Mock Interviews"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Learning Journey
            </h2>
            <p className="text-lg text-slate-400">
              From assessment to certification in 4 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                num: "1",
                title: "Take Assessment",
                desc: "AI evaluates your current skill level and creates a personalized learning path",
              },
              {
                num: "2",
                title: "Learn & Practice",
                desc: "Interactive lessons, coding challenges, and real-time AI assistance",
              },
              {
                num: "3",
                title: "Build Projects",
                desc: "Apply your skills to real-world projects and build your portfolio",
              },
              {
                num: "4",
                title: "Get Certified",
                desc: "Earn certificates and showcase your skills to employers",
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-indigo-500/10 backdrop-blur-xl border border-indigo-500/20 p-12 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join 50,000+ developers learning smarter with AI. Start free today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 transition-all text-lg">
              Get Started Free
            </button>
            <button className="px-10 py-4 bg-zinc-900 text-white font-semibold rounded-xl hover:bg-zinc-800 transition-all text-lg">
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
