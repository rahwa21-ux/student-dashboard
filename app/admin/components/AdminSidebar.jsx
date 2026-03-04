"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaChartLine,
  FaUsers,
  FaSchool,
  FaBook,
  FaClipboardList,
  FaMoneyBill,
  FaEnvelope,
  FaCog,
  FaUserShield,
  FaShieldAlt,
  FaChevronDown,
} from "react-icons/fa";

const AdminSidebar = ({
  activeTab,
  setActiveTab,
  showMobileMenu,
  setShowMobileMenu,
}) => {
  const [openMenu, setOpenMenu] = useState("dashboard");

  const toggleMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <FaChartLine />,
      children: [
        { label: "Overview", href: "/admin/dashboard" },
        { label: "Analytics", href: "/admin/dashboard/analytics" },
      ],
    },
    {
      id: "users",
      label: "Manage Users",
      icon: <FaUsers />,
      children: [
        { label: "All Users", href: "/admin/users" },
        { label: "Students", href: "/admin/users/students" },
        { label: "Instructors", href: "/admin/users/instructors" },
        { label: "Parents", href: "/admin/users/parents" },
        { label: "Administrators", href: "/admin/users/admins" },
        { label: "User Groups", href: "/admin/users/groups" },
        { label: "Bulk Import", href: "/admin/users/import" },
        { label: "User Roles", href: "/admin/users/roles" },
      ],
    },
    {
      id: "content",
      label: "Manage Contents",
      icon: <FaBook />,
      children: [
        { label: "Grades", href: "/admin/grades" },

        { label: "Subjects", href: "/admin/subjects" },
        { label: "Chapters", href: "/admin/chapters" },
        { label: "Lessons", href: "/admin/lessons" },
        { label: "Assignments", href: "/admin/assignments" },
        { label: "Media Library", href: "/admin/media" },
      ],
    },
    {
      id: "assessment",
      label: "Assessment",
      icon: <FaClipboardList />,
      children: [
        { label: "Notes", href: "/admin/notes" },
        { label: "Quizzes", href: "/admin/quizzes" },
        { label: "Question Bank", href: "/admin/questions" },
        { label: "Certificates", href: "/admin/certificates" },
      ],
    },
    {
      id: "billing",
      label: "Billing & Revenue",
      icon: <FaMoneyBill />,
      children: [
        { label: "Payments", href: "/admin/payments" },
        { label: "Invoices", href: "/admin/invoices" },
        { label: "Subscriptions", href: "/admin/subscriptions" },
        { label: "Pricing Plans", href: "/admin/pricing" },
        { label: "Reports", href: "/admin/finance-reports" },
      ],
    },
    {
      id: "support",
      label: "Support Tickets",
      icon: <FaEnvelope />,
      children: [
        { label: "All Tickets", href: "/admin/support" },
        { label: "Open Tickets", href: "/admin/support/open" },
        { label: "Resolved Tickets", href: "/admin/support/resolved" },
        { label: "FAQs", href: "/admin/faqs" },
      ],
    },
  ];

  const systemItems = [
    {
      id: "settings",
      label: "Settings",
      icon: <FaCog />,
      children: [
        { label: "General", href: "/admin/settings" },
        { label: "Email & SMS", href: "/admin/settings/notifications" },
        { label: "Branding", href: "/admin/settings/branding" },
        { label: "Contact Us", href: "/admin/settings/contactus" },
      ],
    },
    {
      id: "admins",
      label: "Admin Users",
      icon: <FaUserShield />,
      children: [{ label: "Admin List", href: "/admin/admins" }],
    },
    {
      id: "security",
      label: "Security",
      icon: <FaShieldAlt />,
      children: [
        { label: "Login History", href: "/admin/security/logins" },
        { label: "Password Policy", href: "/admin/security/passwords" },
        { label: "Two-Factor Auth", href: "/admin/security/2fa" },
        { label: "Audit Logs", href: "/admin/security/audit" },
      ],
    },
  ];

  const renderMenu = (items) =>
    items.map((item) => (
      <div key={item.id}>
        <button
          onClick={() => toggleMenu(item.id)}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg ${
            openMenu === item.id ? "bg-gray-800" : "hover:bg-gray-800"
          }`}
        >
          <div className="flex items-center space-x-3">
            {item.icon}
            <span>{item.label}</span>
          </div>
          <FaChevronDown
            className={`transition-transform ${
              openMenu === item.id ? "rotate-180" : ""
            }`}
          />
        </button>

        {openMenu === item.id && (
          <div className="ml-10 mt-1 space-y-1">
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => {
                  setActiveTab(item.id);
                  setShowMobileMenu(false);
                }}
                className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    ));

  return (
    <aside
      className={`bg-gray-900 text-white transition-all duration-300
  ${
    showMobileMenu
      ? "fixed top-[90px] left-0 bottom-0 w-[280px] z-50"
      : "hidden"
  }
  lg:block lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[280px]`}
    >
      <div className="h-screen overflow-y-auto p-6 pt-[90px] lg:pt-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center font-bold">
            K
          </div>
          <span className="text-xl font-bold">KURAZ LMS</span>
        </div>

        <nav className="space-y-2">{renderMenu(menuItems)}</nav>

        <div className="pt-8 mt-8 border-t border-gray-800">
          <p className="px-4 text-sm text-gray-400 mb-3">System</p>
          <nav className="space-y-2">{renderMenu(systemItems)}</nav>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
