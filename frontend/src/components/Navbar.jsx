import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-slate-800/40 via-slate-700/40 to-slate-800/40 shadow-2xl sticky top-5 z-50 border border-white/20 rounded-full mx-2 sm:mx-4  backdrop-saturate-150">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 lg:px-10">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-amber-500/30 to-orange-500/30 p-2 rounded-xl shadow-lg border border-amber-400/40 backdrop-blur-sm hover:from-amber-500/40 hover:to-orange-500/40 transition-all duration-300">
              <svg
                className="w-6 h-6 text-amber-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">TaskMaster</h1>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 rounded-full px-2 py-1 transition-all duration-300 backdrop-blur-sm group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg border border-amber-300/50  transition-all duration-300">
                  {user?.name ? getInitials(user.name) : "U"}
                </div>
                <span className="text-white font-semibold hidden sm:block group-hover:text-amber-200 transition-colors duration-300">
                  {user?.name || "User"}
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-white transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl overflow-hidden border border-white/30 backdrop-blur-lg animate-fadeIn">
                <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-5 py-4 border-b border-white/20 backdrop-blur-sm">
                  <p className="text-white font-bold text-lg">{user?.name}</p>
                  <p className="text-amber-200/80 text-sm mt-1">{user?.email}</p>
                </div>

                <div className="py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 hover:bg-red-500/20 flex items-center space-x-3 text-slate-200 hover:text-red-300 transition-all duration-200 border-t border-white/10"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
