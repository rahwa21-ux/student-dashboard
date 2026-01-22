import React from "react";
import "./RecentActivity.css";
import { FaCheckCircle, FaTv, FaPaperPlane } from "react-icons/fa";

const RecentActivity = () => {
  const activities = [
    {
      type: "completed",
      icon: <FaCheckCircle />,
      action: "Completed",
      item: "Algebra Quiz",
      time: "2 hours ago",
      color: "#10b981",
    },
    {
      type: "watched",
      icon: <FaTv />,
      action: "Watched",
      item: "Cell Biology Lecture",
      time: "5 hours ago",
      color: "#3b82f6",
    },
    {
      type: "submitted",
      icon: <FaPaperPlane />,
      action: "Submitted",
      item: "Physics Assignment",
      time: "1 day ago",
      color: "#f59e0b",
    },
    {
      type: "completed",
      icon: <FaCheckCircle />,
      action: "Completed",
      item: "Economics Case Study",
      time: "2 days ago",
      color: "#10b981",
    },
    {
      type: "watched",
      icon: <FaTv />,
      action: "Watched",
      item: "Math Tutorial",
      time: "3 days ago",
      color: "#3b82f6",
    },
  ];

  return (
    <div className="card activity-card">
      <div className="card-header">
        <h2 className="card-title">Recent Activity</h2>
        <button className="btn btn-secondary">See All →</button>
      </div>

      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div
              className="activity-icon"
              style={{ backgroundColor: `${activity.color}20` }}
            >
              <span style={{ color: activity.color }}>{activity.icon}</span>
            </div>

            <div className="activity-content">
              <div className="activity-text">
                <span className="activity-action">{activity.action}</span>
                <span className="activity-item">{activity.item}</span>
              </div>
              <div className="activity-time">{activity.time}</div>
            </div>

            <button className="activity-chevron">›</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
