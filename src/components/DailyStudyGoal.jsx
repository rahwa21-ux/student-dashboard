import React from "react";
import "./DailyStudyGoal.css";

const DailyStudyGoal = () => {
  const progress = 75;
  const timeSpent = "3h 45m";
  const timeGoal = "5h";

  const tasks = [
    { label: "Completed", count: 3, color: "#10b981" },
    { label: "In Progress", count: 2, color: "#3b82f6" },
    { label: "Pending", count: 1, color: "#9ca3af" },
  ];

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="card study-goal-card">
      <div className="card-header">
        <h2 className="card-title">Daily Study Goal</h2>
      </div>

      <div className="goal-progress">
        <div className="progress-circle">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="12"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#10b981"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="progress-text">
            <span className="progress-percent">{progress}%</span>
          </div>
        </div>

        <div className="goal-details">
          <div className="time-info">
            <div className="time-spent">
              <span className="time-value">{timeSpent}</span>
              <span className="time-label">Time Spent</span>
            </div>
            <div className="time-goal">
              <span className="time-value">{timeGoal}</span>
              <span className="time-label">Daily Goal</span>
            </div>
          </div>

          <div className="task-breakdown">
            {tasks.map((task, index) => (
              <div key={index} className="task-item">
                <div
                  className="task-color"
                  style={{ backgroundColor: task.color }}
                />
                <div className="task-info">
                  <span className="task-label">{task.label}</span>
                  <span className="task-count">{task.count} tasks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyStudyGoal;
