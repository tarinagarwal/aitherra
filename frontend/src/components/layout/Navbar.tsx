import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, User, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { GoogleLoginButton } from "../auth/GoogleLoginButton";

//@ts-ignore
const NAV_LINKS = [
  // { label: "Courses", href: "/courses" },
  // {
  //   label: "Learn",
  //   subLinks: [
  //     { label: "Web Development", href: "/web" },
  //     { label: "Data Science", href: "/data" },
  //     { label: "Mobile Development", href: "/mobile" },
  //   ],
  // },
  // { label: "Community", href: "/community" },
  // { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
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
              {
                //@ts-ignore
                NAV_LINKS.map((link) => (
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
                            {link.subLinks.map(
                              (
                                //@ts-ignore
                                subLink
                              ) => (
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
                              )
                            )}
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
                ))
              }
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-zinc-900 transition-all"
                  >
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-9 h-9 rounded-full border-2 border-indigo-500/30"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        profileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {profileDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setProfileDropdownOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-zinc-950 backdrop-blur-xl rounded-xl shadow-2xl border border-indigo-500/10 py-2 z-50">
                        <div className="px-4 py-3 border-b border-indigo-500/10">
                          <p className="text-sm font-semibold text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            @{user.username}
                          </p>
                        </div>
                        <div className="py-2">
                          <Link
                            to={`/p/${user.username}`}
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-zinc-900 hover:text-white transition-colors"
                          >
                            <User className="w-4 h-4" />
                            Your Profile
                          </Link>
                          <Link
                            to="/dashboard"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-zinc-900 hover:text-white transition-colors"
                          >
                            <User className="w-4 h-4" />
                            Dashboard
                          </Link>
                          <Link
                            to="/settings"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-zinc-900 hover:text-white transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            Change Username
                          </Link>
                        </div>
                        <div className="border-t border-indigo-500/10 pt-2">
                          <button
                            onClick={() => {
                              logout();
                              setProfileDropdownOpen(false);
                            }}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-400 hover:bg-zinc-900 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="hidden sm:block">
                  <GoogleLoginButton variant="compact" />
                </div>
              )}

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
                {
                  //@ts-ignore
                  NAV_LINKS.map((link) => (
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
                              {link.subLinks.map(
                                (
                                  //@ts-ignore
                                  subLink
                                ) => (
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
                                )
                              )}
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
                  ))
                }
              </nav>
            </div>

            {/* Mobile Actions */}
            <div className="p-6 space-y-3 border-t border-indigo-500/10">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900/50 rounded-lg">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-indigo-500/30"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-400">@{user.username}</p>
                    </div>
                  </div>
                  <Link
                    to={`/p/${user.username}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 w-full px-6 py-3 text-white font-medium rounded-lg hover:bg-slate-800 transition-all"
                  >
                    <User className="w-5 h-5" />
                    Your Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 w-full px-6 py-3 text-white font-medium rounded-lg hover:bg-slate-800 transition-all"
                  >
                    <User className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 w-full px-6 py-3 text-white font-medium rounded-lg hover:bg-slate-800 transition-all"
                  >
                    <Settings className="w-5 h-5" />
                    Change Username
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-6 py-3 text-red-400 font-medium rounded-lg hover:bg-slate-800 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <GoogleLoginButton variant="compact" fullWidth />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
