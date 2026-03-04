"use client";
import {
  FaBell,
  FaSearch,
  FaCaretDown,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const AdminHeader = ({
  searchTerm,
  setSearchTerm,
  showMobileMenu,
  setShowMobileMenu,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-lg"
          : "bg-gray-900 border-b border-gray-700"
      }`}
    >
      <div className="px-4 md:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>

              <div className="hidden md:block">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-white">KURAZ Admin</h1>
                </div>
                <p className="text-sm text-gray-300">
                  Education Management System
                </p>
              </div>
            </div>

            {/* Quick Actions 
            <div className="hidden lg:flex items-center gap-2 ml-4">
              <button className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                Dashboard
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                Analytics
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                Reports
              </button>
            </div>*/}
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users, courses, content..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200 placeholder-gray-400 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Help Button */}
            <button className="hidden lg:flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
              <FaRegQuestionCircle className="text-lg" />
              <span className="text-sm font-medium">Help</span>
            </button>

            {/* Mobile Search Button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <FaSearch className="text-white text-lg" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2.5 rounded-lg hover:bg-gray-800 transition-colors group">
                <FaBell className="text-white text-lg group-hover:animate-pulse" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  3
                </span>
              </button>

              {/* Notification indicator */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
            </div>

            {/* Separator */}
            <div className="hidden lg:block w-px h-6 bg-gray-700"></div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-800 transition-colors group"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/20 transition-shadow">
                    <span className="text-white font-bold text-lg">AD</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                </div>

                <div className="hidden lg:block text-left">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-white">Admin User</p>
                    <FaCaretDown
                      className={`text-gray-400 transition-transform ${showUserMenu ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />

                  {/* Menu */}
                  <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            AD
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-white">Admin User</p>
                          <p className="text-sm text-gray-300">
                            admin@kuraz.edu
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <a
                        href="/admin/profile"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
                      >
                        👤 Profile Settings
                      </a>
                      <a
                        href="/admin/preferences"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
                      >
                        ⚙️ Preferences
                      </a>
                      <a
                        href="/admin/activity"
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-colors"
                      >
                        📊 Activity Log
                      </a>
                      <div className="h-px bg-gray-700 my-2"></div>
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors">
                        🚪 Log Out
                      </button>
                    </div>

                    <div className="px-4 py-3 bg-gray-900/50 border-t border-gray-700">
                      <p className="text-xs text-gray-400">
                        Session expires in 23:45
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="h-0.5 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50"></div>
    </header>
  );
};
export default AdminHeader;
