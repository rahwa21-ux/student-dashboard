import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import "./Header.css";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const [gradeDropdownOpen, setGradeDropdownOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState({
    grade: "Grade 12",
    school: "Saba High",
  });

  const gradeOptions = [
    { grade: "Grade 6", school: "Elementary School", color: "#3b82f6" },
    { grade: "Grade 8", school: "Middle School", color: "#8b5cf6" },
    { grade: "Grade 12", school: "Saba High", color: "#0FA648" },
  ];

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setGradeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGradeSelect = (gradeOption) => {
    setSelectedGrade(gradeOption);
    setGradeDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <span className="menu-icon">☰</span>
        </button>

        <div className="greeting-section">
          <h1 className="greeting">{getGreeting()}, Rahwa!</h1>
        </div>
      </div>

      <div className="header-right">
        {/* Notification Icon */}
        <div className="notification-container">
          <button className="notification-btn" aria-label="Notifications">
            <FaBell />
            <span className="notification-badge">3</span>
          </button>
        </div>

        {/* Grade Dropdown */}
        <div className="grade-school-dropdown" ref={dropdownRef}>
          <button
            className="grade-school-toggle"
            onClick={() => setGradeDropdownOpen(!gradeDropdownOpen)}
            aria-expanded={gradeDropdownOpen}
            aria-label="Change grade and school"
          >
            <div className="current-grade-school">
              <span
                className="grade-badge"
                style={{
                  backgroundColor: `${selectedGrade.color}15`,
                  color: selectedGrade.color,
                  borderColor: `${selectedGrade.color}30`,
                }}
              >
                {selectedGrade.grade}
              </span>
              <span className="dropdown-arrow">▼</span>
            </div>
          </button>

          {gradeDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <span>Select Your Grade</span>
                <small>Grade 6, 8, and 12 available</small>
              </div>
              <div className="dropdown-content">
                {gradeOptions.map((option, index) => (
                  <button
                    key={index}
                    className={`dropdown-item ${
                      selectedGrade.grade === option.grade ? "active" : ""
                    }`}
                    onClick={() => handleGradeSelect(option)}
                    style={{ "--grade-color": option.color }}
                  >
                    <div className="dropdown-item-content">
                      <span
                        className="dropdown-grade"
                        style={{ color: option.color }}
                      >
                        {option.grade}
                      </span>
                      <span className="dropdown-school">{option.school}</span>
                    </div>
                    {selectedGrade.grade === option.grade && (
                      <span
                        className="check-mark"
                        style={{ color: option.color }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="dropdown-footer">
                <small>
                  Currently viewing:{" "}
                  <strong>{selectedGrade.grade} Dashboard</strong>
                </small>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="avatar-container">
          <div className="avatar">
            <span className="avatar-initials">RG</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
