import React, { useState } from "react";
import "./Assignments.css";

const assignmentsData = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Calculus Homework",
    due: "Tomorrow 10:00 AM",
    status: "Pending",
    progress: 35,
    color: "#4F46E5",
  },
  {
    id: 2,
    subject: "Biology",
    title: "Lab Report",
    due: "Dec 15, 2:00 PM",
    status: "In Progress",
    progress: 60,
    color: "#10B981",
  },
  {
    id: 3,
    subject: "Economics",
    title: "Market Analysis",
    due: "Dec 18, 11:00 AM",
    status: "Completed",
    progress: 100,
    color: "#F59E0B",
  },
];

const Assignments = () => {
  const [assignments] = useState(assignmentsData);

  return (
    <div className="assignments-page">
      <div className="assignments-header">
        <h2>Assignments</h2>
        <p>Track all your tasks & deadlines in one place.</p>
      </div>

      <div className="assignments-grid">
        {assignments.map((item) => (
          <div className="assignment-card" key={item.id}>
            <div className="assignment-top">
              <div className="assignment-subject" style={{ color: item.color }}>
                {item.subject}
              </div>
              <span
                className={`status ${item.status.toLowerCase().replace(" ", "-")}`}
              >
                {item.status}
              </span>
            </div>

            <h3 className="assignment-title">{item.title}</h3>
            <p className="assignment-due">Due: {item.due}</p>

            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${item.progress}%`,
                  backgroundColor: item.color,
                }}
              ></div>
            </div>

            <div className="assignment-footer">
              <button className="btn btn-primary">Start</button>
              <button className="btn btn-secondary">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
