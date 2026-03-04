import React from "react";
import { useNavigate } from "react-router-dom";
import "./SubjectProgress.css";
import { FaCalculator, FaLeaf, FaChartLine, FaAtom } from "react-icons/fa";

const SubjectProgress = () => {
  const navigate = useNavigate();
  const subjects = [
    {
      id: 1,
      icon: <FaCalculator />,
      name: "Mathematics",
      lastStudy: "2 hours ago",
      grade: "A",
      progress: 85,
      upcoming: "Algebra II",
      color: "#3b82f6",
    },
    {
      id: 2,
      icon: <FaLeaf />,
      name: "Biology",
      lastStudy: "Yesterday",
      grade: "B+",
      progress: 70,
      upcoming: "Cell Division",
      color: "#14b8a6",
    },
    {
      id: 3,
      icon: <FaChartLine />,
      name: "Economics",
      lastStudy: "3 days ago",
      grade: "A-",
      progress: 90,
      upcoming: "Market Structures",
      color: "#10b981",
    },
    {
      id: 4,
      icon: <FaAtom />,
      name: "Physics",
      lastStudy: "1 week ago",
      grade: "B",
      progress: 60,
      upcoming: "Thermodynamics",
      color: "#8b5cf6",
    },
  ];

  const handleViewAll = () => {
    navigate("/subjects");
  };
  const handleContinue = (subjectId) => {
    navigate(`/subject/${subjectId}`);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Subject Progress</h2>
        <button className="btn btn-secondary" onClick={handleViewAll}>
          View All
        </button>
      </div>

      <div className="subject-list">
        {subjects.map((subject, index) => (
          <div key={index} className="subject-item">
            <div className="subject-header">
              <div
                className="subject-icon"
                style={{ backgroundColor: `${subject.color}20` }}
              >
                <span style={{ color: subject.color }}>{subject.icon}</span>
              </div>

              <div className="subject-info">
                <h3 className="subject-name">{subject.name}</h3>
                <div className="subject-meta">
                  <span className="last-study">
                    Last studied: {subject.lastStudy}
                  </span>
                  <span className="subject-grade">Grade: {subject.grade}</span>
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => handleContinue(subject.id)}
              >
                Continue
              </button>
            </div>

            <div className="progress-section">
              <div className="progress-info">
                <span>Progress</span>
                <span>{subject.progress}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${subject.progress}%`,
                    backgroundColor: subject.color,
                  }}
                />
              </div>

              <div className="upcoming-lesson">Next: {subject.upcoming}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectProgress;
