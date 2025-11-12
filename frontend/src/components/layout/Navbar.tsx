import { Link } from "react-router-dom";
import { ThemeToggle } from "../ui/ThemeToggle";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold text-text-primary">
              Aitherra
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/features"
              className="text-text-tertiary hover:text-text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              to="/tutorials"
              className="text-text-tertiary hover:text-text-primary transition-colors"
            >
              Tutorials
            </Link>
            <Link
              to="/pricing"
              className="text-text-tertiary hover:text-text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="text-text-tertiary hover:text-text-primary transition-colors"
            >
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="px-4 py-2 text-text-tertiary hover:text-text-primary transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 gradient-accent text-white rounded-lg hover:glow-accent transition-all">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
