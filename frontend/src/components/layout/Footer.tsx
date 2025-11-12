import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="glass-card-purple mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-xl font-bold text-text-primary">
                Aitherra
              </span>
            </div>
            <p className="text-text-tertiary text-sm">
              AI-powered programming language tutor for developers of all
              levels.
            </p>
          </div>

          <div>
            <h3 className="text-text-secondary font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/features"
                  className="text-text-tertiary hover:text-text-secondary transition-colors text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="/tutorials"
                  className="text-text-tertiary hover:text-text-secondary transition-colors text-sm"
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-text-tertiary hover:text-text-secondary transition-colors text-sm"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-text-secondary font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-text-tertiary hover:text-text-secondary transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-text-tertiary hover:text-text-secondary transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-text-tertiary hover:text-text-secondary transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-text-secondary font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-text-tertiary hover:text-text-secondary transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-text-tertiary hover:text-text-secondary transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8">
          <p className="text-text-muted text-sm text-center">
            © {new Date().getFullYear()} Aitherra. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
