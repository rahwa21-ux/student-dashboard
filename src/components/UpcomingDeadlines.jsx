import React from "react";
import { useNavigate } from "react-router-dom";
import "./UpcomingDeadlines.css";
import {
  FaFileAlt,
  FaMicroscope,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";

const UpcomingDeadlines = () => {
  const navigate = useNavigate();
  const deadlines = [
    {
      id: 1,
      icon: <FaFileAlt />,
      subject: "Mathematics",
      title: "Calculus Assignment",
      dueDate: "Tomorrow, 10 AM",
      priority: "high",
    },
    {
      id: 2,
      icon: <FaMicroscope />,
      subject: "Biology",
      title: "Lab Report",
      dueDate: "Dec 15, 2 PM",
      priority: "medium",
    },
    {
      id: 3,
      icon: <FaChartLine />,
      subject: "Economics",
      title: "Market Analysis",
      dueDate: "Dec 18, 11 AM",
      priority: "low",
    },
  ];
  const handleStartNow = (deadlineId) => {
    navigate(`/assignment/${deadlineId}`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#eab308";
      case "low":
        return "#3b82f6";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="card deadlines-card">
      <div className="card-header">
        <h2 className="card-title">Upcoming Deadlines</h2>
        <span className="deadlines-count">{deadlines.length}</span>
      </div>

      <div className="deadlines-list">
        {deadlines.map((deadline, index) => {
          const color = getPriorityColor(deadline.priority);

          return (
            <div
              key={index}
              className="deadline-item"
              style={{
                borderLeft: `4px solid ${color}`,
                backgroundColor: `${color}08`,
              }}
            >
              <div className="deadline-icon">{deadline.icon}</div>

              <div className="deadline-content">
                <div className="deadline-subject">{deadline.subject}</div>

                <h4 className="deadline-title">{deadline.title}</h4>

                <div className="deadline-meta">
                  <span className="due-date">
                    <FaCalendarAlt /> {deadline.dueDate}
                  </span>

                  <span
                    className="priority-badge"
                    style={{
                      backgroundColor: `${color}20`,
                      color: color,
                    }}
                  >
                    {deadline.priority.toUpperCase()}
                  </span>
                </div>
              </div>

              <button
                className="btn btn-primary start-btn"
                onClick={() => handleStartNow(deadline.id)}
              >
                Start Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;
