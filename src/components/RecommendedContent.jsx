import React from "react";
import "./RecommendedContent.css";
import { FaBookOpen, FaDna, FaChartBar, FaPlay } from "react-icons/fa";

const RecommendedContent = () => {
  const recommendations = [
    {
      icon: <FaBookOpen />,
      title: "Advanced Calculus",
      duration: "45 min",
      type: "Video Lesson",
      subject: "Mathematics",
    },
    {
      icon: <FaDna />,
      title: "Genetics 101",
      duration: "30 min",
      type: "Interactive Quiz",
      subject: "Biology",
    },
    {
      icon: <FaChartBar />,
      title: "Market Trends",
      duration: "1 hour",
      type: "Case Study",
      subject: "Economics",
    },
  ];

  return (
    <div className="card recommendations-card">
      <div className="card-header">
        <h2 className="card-title">Recommended</h2>
        <button className="btn btn-secondary">View All</button>
      </div>

      <div className="recommendations-list">
        {recommendations.map((rec, index) => (
          <div key={index} className="recommendation-item">
            <div className="recommendation-icon">{rec.icon}</div>

            <div className="recommendation-content">
              <h4 className="recommendation-title">{rec.title}</h4>

              <div className="recommendation-meta">
                <span className="duration">
                  {rec.duration} • {rec.type}
                </span>
                <span className="subject">{rec.subject}</span>
              </div>
            </div>

            <button className="recommendation-play">
              <FaPlay />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedContent;
