import React from "react";

import "./QuickActions.css";
import {
  FaPlayCircle,
  FaQuestionCircle,
  FaTv,
  FaFilePdf,
} from "react-icons/fa";

const QuickActions = () => {
  const actions = [
    {
      icon: <FaPlayCircle />,
      label: "Continue Learning",
      description: "Pick up where you left off",
      color: "#10b981",
    },
    {
      icon: <FaQuestionCircle />,
      label: "Take Quiz",
      description: "Test your understanding",
      color: "#3b82f6",
    },
    {
      icon: <FaTv />,
      label: "Watch Lesson",
      description: "Learn with video lessons",
      color: "#8b5cf6",
    },
    {
      icon: <FaFilePdf />,
      label: "Download PDF",
      description: "Access offline materials",
      color: "#f97316",
    },
  ];

  return (
    <div className="card quick-actions-card">
      <div className="card-header">
        <h2 className="card-title">Quick Actions</h2>
      </div>

      <div className="actions-grid">
        {actions.map((action, index) => (
          <button
            key={index}
            className="action-button"
            style={{ "--action-color": action.color }}
          >
            <div
              className="action-icon"
              style={{ backgroundColor: `${action.color}20` }}
            >
              <span style={{ color: action.color }}>{action.icon}</span>
            </div>

            <div className="action-text">
              <span className="action-label">{action.label}</span>
              <span className="action-description">{action.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
