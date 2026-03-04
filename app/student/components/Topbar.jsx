"use client";
import { useState, useEffect } from "react";
import { Bell, ChevronDown, Menu, User, LogOut, Settings } from "lucide-react";

export default function Topbar({
  setOpen,
  selectedGradeId,
  setSelectedGradeId,
}) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const [gradeOpen, setGradeOpen] = useState(false);
  const [allGrades, setAllGrades] = useState([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/grades")
      .then((res) => res.json())
      .then(setAllGrades)
      .catch(console.error);
  }, []);

  const selectedGrade = allGrades.find((g) => g.id === selectedGradeId);

  const handleLogout = () => {
    console.log("Logout action");
    // Add your logout logic here
  };

  // Example notifications
  const notifications = [
    { id: 1, message: "Assignment 1 is due tomorrow." },
    { id: 2, message: "New resource added to Math." },
    { id: 3, message: "Your profile was updated successfully." },
  ];

  return (
    <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-gray-900 text-gray-100 z-40 border-b border-gray-700">
      <div className="h-full flex items-center justify-between px-4 md:px-6">
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition"
          onClick={() => setOpen(true)}
        >
          <Menu size={22} className="text-gray-100" />
        </button>

        {/* Greeting */}
        <div className="ml-4 md:ml-0">
          <h1 className="text-lg font-semibold">
            {greeting}, <span className="text-blue-400">Rahwa</span>
          </h1>
          <p className="text-sm text-gray-400 hidden md:block">
            Welcome to your student dashboard
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              className="relative p-2 rounded-lg hover:bg-gray-800 transition group"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell size={18} className="text-gray-100" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-12 w-64 bg-gray-800 text-white rounded-xl shadow-lg border border-gray-700 z-50 py-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                    onClick={() => console.log("Clicked notification:", n.id)}
                  >
                    {n.message}
                  </div>
                ))}
                {notifications.length === 0 && (
                  <div className="px-4 py-2 text-gray-400 text-sm">
                    No notifications
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Grade Dropdown */}
          <div className="relative">
            <button
              onClick={() => setGradeOpen(!gradeOpen)}
              className="flex items-center gap-2 text-sm border border-gray-700 rounded-xl px-4 py-2 hover:border-blue-400 hover:bg-gray-800 transition-colors"
            >
              {selectedGrade?.name || "Select Grade"}
              <ChevronDown
                size={16}
                className={`transition-transform ${gradeOpen ? "rotate-180" : ""}`}
              />
            </button>

            {gradeOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 shadow-lg rounded-xl w-40 border border-gray-700 z-50 py-1">
                {allGrades.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      setSelectedGradeId(g.id);
                      setGradeOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-900 text-gray-100 hover:text-blue-400 transition-colors"
                  >
                    {g.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="relative flex items-center gap-3">
            <div
              className="relative cursor-pointer"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center shadow-md">
                <User size={20} className="text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-12 w-44 bg-gray-800 text-white rounded-xl shadow-lg border border-gray-700 z-50 py-2">
                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left"
                    onClick={() => console.log("Go to Profile")}
                  >
                    <User size={16} /> Profile
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left"
                    onClick={() => console.log("Go to Settings")}
                  >
                    <Settings size={16} /> Settings
                  </button>
                  <button
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
