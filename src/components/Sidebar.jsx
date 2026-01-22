import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartBar,
  FaBook,
  FaClipboardList,
  FaTrophy,
  FaComments,
  FaCog,
  FaSignOutAlt,
  FaGraduationCap,
  FaFire,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ open }) => {
  const menuItems = [
    {
      icon: <FaChartBar style={{ color: "#4F46E5" }} />,
      label: "Overview",
      path: "/overview",
    },
    {
      icon: <FaBook style={{ color: "#10B981" }} />,
      label: "Subjects",
      path: "/subjects",
    },
    {
      icon: <FaClipboardList style={{ color: "#F59E0B" }} />,
      label: "Assignments",
      path: "/assignments",
    },
    {
      icon: <FaTrophy style={{ color: "#F97316" }} />,
      label: "Achievements",
      path: "/achievements",
    },
    { icon: <FaComments />, label: "Support", path: "/support" },
    {
      icon: <FaCog style={{ color: "#9CA3AF" }} />,
      label: "Settings",
      path: "/settings",
    },
    {
      icon: <FaSignOutAlt style={{ color: "#EF4444" }} />,
      label: "Logout",
      path: "/logout",
    },
  ];

  if (!open) return null;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">StudentDash</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className={item.active ? "active" : ""}>
              <NavLink to={item.path}>
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="study-streak">
          <div className="streak-icon">🔥</div>
          <div className="streak-info">
            <div className="streak-count">7 days</div>
            <div className="streak-label">Learning Streak</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
