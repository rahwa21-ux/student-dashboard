import React from "react";
import "./QuickStats.css";
import { FaClock, FaChartLine, FaFire, FaCheckCircle } from "react-icons/fa";

const QuickStats = () => {
  const stats = [
    {
      icon: <FaClock />,
      title: "Study Hours",
      value: "48h",
      subtitle: "Total monthly hours",
      gradient: "linear-gradient(135deg, #60a5fa, #3b82f6)",
    },
    {
      icon: <FaChartLine />,
      title: "Average Score",
      value: "87%",
      subtitle: "Percentage",
      gradient: "linear-gradient(135deg, #34d399, #10b981)",
    },
    {
      icon: <FaFire />,
      title: "Learning Streak",
      value: "7 days",
      subtitle: "Current streak",
      gradient: "linear-gradient(135deg, #a78bfa, #8b5cf6)",
    },
    {
      icon: <FaCheckCircle />,
      title: "Subjects Done",
      value: "5/8",
      subtitle: "Total completed",
      gradient: "linear-gradient(135deg, #fb923c, #f97316)",
    },
  ];

  return (
    <div className="quick-stats">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="stat-card"
          style={{ background: stat.gradient }}
        >
          <div className="stat-icon">{stat.icon}</div>
          <div className="stat-content">
            <h3 className="stat-title">{stat.title}</h3>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-subtitle">{stat.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
