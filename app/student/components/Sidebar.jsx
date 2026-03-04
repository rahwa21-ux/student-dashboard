"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  ClipboardList,
  Compass,
  Headphones,
  Settings,
  LogOut,
  Menu,
  X,
  Calendar,
  FileText,
  CreditCard,
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: <Home size={20} />, path: "/student/dashboard" },
    {
      name: "Resources",
      icon: <BookOpen size={20} />,
      path: "/student/dashboard/resources",
    },
    /*{
      name: "Assignments",
      icon: <ClipboardList size={20} />,
      path: "/student/dashboard/assignments",
      badge: 3,
    },*/
    {
      name: "Learning Compass",
      icon: <Compass size={20} />,
      path: "/student/dashboard/learning-compass",
    },
    {
      name: "Support",
      icon: <Headphones size={20} />,
      path: "/student/dashboard/support",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/student/dashboard/settings",
    },
    {
      name: "Logout",
      icon: <LogOut size={20} />,
      path: "/student/dashboard/logout",
    },
    {
      name: "Manage Subscriptions",
      icon: <CreditCard size={20} />,
      path: "/student/dashboard/subscriptions",
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-30 md:hidden p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
      >
        <Menu size={22} className="text-gray-100" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-gray-100 z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:fixed flex flex-col justify-between`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-lg font-bold">Student Portal</h1>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition"
            onClick={() => setOpen(false)}
          >
            <X size={20} className="text-gray-100" />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-4 px-4 flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition relative
                  ${isActive ? "bg-blue-800 text-blue-400 font-semibold" : "hover:bg-gray-800 text-gray-100"}`}
                onClick={() => setOpen(false)}
              >
                {item.icon}
                <span className="flex-1">{item.name}</span>

                {/* Badge */}
                {item.badge && (
                  <span className="px-2 py-0.5 bg-blue-700 text-blue-200 text-xs font-semibold rounded-full">
                    {item.badge}
                  </span>
                )}

                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Card */}
        <div className="p-4 m-4 bg-gray-800 rounded-xl border border-gray-700 shadow-inner">
          <p className="text-sm font-semibold text-gray-200 mb-2">
            Today's Progress
          </p>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: "65%" }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>2 tasks due</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText size={12} />
              <span>1 submitted</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
