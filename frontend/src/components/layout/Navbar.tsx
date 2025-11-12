import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

// ============================================
// NAVIGATION CONFIGURATION
// ============================================
// Add/remove navigation links here
// For sublinks, use direct paths (e.g., /web, not /courses/web)
// This groups similar features under one dropdown to save space
//
// Example with sublinks:
// {
//   label: "Learn",
//   subLinks: [
//     { label: "Web Development", href: "/web" },
//     { label: "Data Science", href: "/data" },
//     { label: "Mobile Dev", href: "/mobile" },
//   ]
// }
//
// Example without sublinks:
// { label: "Community", href: "/community" }

const NAV_LINKS = [
  { label: "Courses", href: "/courses" },
  {
    label: "Learn",
    subLinks: [
      { label: "Web Development", href: "/web" },
      { label: "Data Science", href: "/data" },
      { label: "Mobile Development", href: "/mobile" },
    ],
  },
  { label: "Community", href: "/community" },
  { label: "Pricing", href: "/pricing" },
];

// ============================================

export function Navbar() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(
    null
  );
  //@ts-ignore
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  const isActive = (href: string) => location.pathname === href;

  const handleMouseEnter = (label: string) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
    setCloseTimeout(timeout);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-indigo-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-white">Aitherra</span>
            </Link>

            {/* Desktop Navigation Links - Hidden when hamburger appears */}
            <div className="hidden lg:flex items-center space-x-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() =>
                    link.subLinks && handleMouseEnter(link.label)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  {link.subLinks ? (
                    <>
                      <button
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all ${
                          openDropdown === link.label
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === link.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openDropdown === link.label && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-zinc-950 backdrop-blur-xl rounded-xl shadow-2xl border border-indigo-500/10 py-2">
                          {link.subLinks.map((subLink) => (
                            <Link
                              key={subLink.label}
                              to={subLink.href}
                              className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                                isActive(subLink.href)
                                  ? "bg-indigo-500/10 text-indigo-400"
                                  : "text-slate-300 hover:bg-zinc-900 hover:text-white"
                              }`}
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        isActive(link.href)
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "text-slate-300 hover:bg-zinc-900 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button className="hidden sm:block px-5 py-2.5 text-slate-300 hover:text-white transition-colors font-medium rounded-lg hover:bg-zinc-900">
                Sign In
              </button>
              <button className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 hover:scale-105 transition-all">
                Start Free
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar - Opens below navbar */}
      <div
        className={`fixed top-16 right-0 bottom-0 z-40 lg:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Sidebar */}
        <div className="relative h-full w-80 bg-zinc-950 shadow-2xl ml-auto">
          <div className="flex flex-col h-full">
            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-8 px-6">
              <nav className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    {link.subLinks ? (
                      <>
                        <button
                          onClick={() =>
                            setMobileDropdownOpen(
                              mobileDropdownOpen === link.label
                                ? null
                                : link.label
                            )
                          }
                          className="w-full flex items-center justify-between px-4 py-3 text-white font-medium hover:text-indigo-400 transition-colors"
                        >
                          {link.label}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileDropdownOpen === link.label
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                        {mobileDropdownOpen === link.label && (
                          <div className="ml-4 mt-1 space-y-1 border-l-2 border-indigo-500/20 pl-4">
                            {link.subLinks.map((subLink) => (
                              <Link
                                key={subLink.label}
                                to={subLink.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block py-2 text-sm font-medium transition-colors ${
                                  isActive(subLink.href)
                                    ? "text-indigo-400"
                                    : "text-slate-400 hover:text-white"
                                }`}
                              >
                                {subLink.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-4 py-3 font-medium transition-colors ${
                          isActive(link.href)
                            ? "text-indigo-400"
                            : "text-white hover:text-indigo-400"
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Mobile Actions */}
            <div className="p-6 space-y-3 border-t border-indigo-500/10">
              <button className="w-full px-6 py-3 text-white font-medium rounded-lg hover:bg-slate-800 transition-all">
                Sign In
              </button>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all">
                Start Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
