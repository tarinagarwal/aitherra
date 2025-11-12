export function LandingPage() {
  return (
    <div className="min-h-screen bg-background-primary gradient-mesh">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-text-primary">Master Programming with </span>
            <span className="gradient-text">AI Guidance</span>
          </h1>
          <p className="text-xl text-text-tertiary max-w-3xl mx-auto mb-10">
            Learn any programming language with personalized AI tutoring.
            Interactive lessons, real-time feedback, and adaptive learning paths
            designed just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 gradient-accent text-white font-semibold rounded-xl hover:glow-accent transition-all text-lg">
              Start Learning Free
            </button>
            <button className="px-8 py-4 glass-card-purple text-text-secondary font-semibold rounded-xl hover:scale-105 transition-all text-lg">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
            Why Choose Aitherra?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - Teal */}
            <div className="glass-card-teal p-8 rounded-2xl hover:scale-105 transition-all group">
              <div className="w-14 h-14 bg-teal-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-500/30 transition-all">
                <svg
                  className="w-8 h-8 text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                AI-Powered Learning
              </h3>
              <p className="text-teal-100/80">
                Get instant feedback and personalized explanations from our
                advanced AI tutor that adapts to your learning style.
              </p>
            </div>

            {/* Card 2 - Blue */}
            <div className="glass-card-blue p-8 rounded-2xl hover:scale-105 transition-all group">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-all">
                <svg
                  className="w-8 h-8 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Interactive Practice
              </h3>
              <p className="text-blue-100/80">
                Code directly in your browser with real-time validation and
                hints. Learn by doing, not just reading.
              </p>
            </div>

            {/* Card 3 - Amber */}
            <div className="glass-card-amber p-8 rounded-2xl hover:scale-105 transition-all group">
              <div className="w-14 h-14 bg-amber-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500/30 transition-all">
                <svg
                  className="w-8 h-8 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Track Progress
              </h3>
              <p className="text-amber-100/80">
                Monitor your learning journey with detailed analytics and
                achievements. See how far you've come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
            Learn Any Language
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Python Card */}
            <div className="glass-card-blue p-8 rounded-2xl hover:scale-105 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🐍</span>
                </div>
                <h3 className="text-2xl font-semibold text-white">Python</h3>
              </div>
              <p className="text-blue-100/80 mb-4">
                Master Python for web development, data science, and automation
                with interactive lessons.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  Django
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  FastAPI
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  Pandas
                </span>
              </div>
            </div>

            {/* JavaScript Card */}
            <div className="glass-card-amber p-8 rounded-2xl hover:scale-105 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  JavaScript
                </h3>
              </div>
              <p className="text-amber-100/80 mb-4">
                Build modern web applications with JavaScript, React, and
                Node.js through hands-on projects.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                  React
                </span>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                  Node.js
                </span>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                  TypeScript
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center glass-card-purple p-12 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-text-tertiary mb-8">
            Join thousands of developers learning smarter with AI
          </p>
          <button className="px-10 py-4 gradient-accent text-white font-semibold rounded-xl hover:glow-accent-lg transition-all text-lg">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}
