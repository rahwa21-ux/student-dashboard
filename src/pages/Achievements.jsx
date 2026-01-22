import React, { useState } from "react";
import { FaTrophy } from "react-icons/fa";
import "./Achievements.css";

const achievementsData = [
  {
    id: 1,
    title: "Top Scorer",
    description: "Scored highest in Mathematics this month",
    date: "Dec 10, 2025",
    color: "#4F46E5",
    icon: <FaTrophy />,
  },
  {
    id: 2,
    title: "Consistency Star",
    description: "Studied every day for 30 days",
    date: "Dec 1, 2025",
    color: "#10B981",
    icon: <FaTrophy />,
  },
  {
    id: 3,
    title: "Quick Learner",
    description: "Completed 5 assignments before the deadline",
    date: "Nov 28, 2025",
    color: "#F59E0B",
    icon: <FaTrophy />,
  },
];

const Achievements = () => {
  const [achievements] = useState(achievementsData);

  return (
    <div className="achievements-page">
      <div className="achievements-header">
        <h2>Achievements</h2>
        <p>Celebrate your milestones and learning successes.</p>
      </div>

      <div className="achievements-grid">
        {achievements.map((item) => (
          <div className="achievement-card" key={item.id}>
            <div
              className="achievement-icon"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>
            <h3 className="achievement-title">{item.title}</h3>
            <p className="achievement-description">{item.description}</p>
            <p className="achievement-date">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
