import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="mb-6 md:mb-8 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-xl mx-auto">
            Oops! The page you're looking for seems to have wandered off into
            the digital void.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8 md:mb-12 flex justify-center">
          <div className="relative">
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-indigo-500/5 rounded-full blur-3xl absolute inset-0"></div>
            <Search
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 text-slate-600 relative z-10 mx-auto"
              strokeWidth={1}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-200 text-base md:text-lg"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
