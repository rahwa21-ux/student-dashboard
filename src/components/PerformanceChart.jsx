import React from "react";
import "./PerformanceChart.css";

const PerformanceChart = () => {
  const data = [
    { day: "Mon", score: 75 },
    { day: "Tue", score: 85 },
    { day: "Wed", score: 65 },
    { day: "Thu", score: 90 },
    { day: "Fri", score: 80 },
    { day: "Sat", score: 70 },
    { day: "Sun", score: 95 },
  ];

  const maxScore = Math.max(...data.map((d) => d.score));

  const getBarColor = (score) => {
    if (score > 80) return "#10b981";
    if (score > 60) return "#3b82f6";
    return "#f59e0b";
  };

  return (
    <div className="card chart-card">
      <div className="card-header">
        <h2 className="card-title">Weekly Performance</h2>
        <select className="time-select">
          <option>This Week</option>
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="chart-container">
        <div className="chart-y-axis">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>

        <div className="chart-bars">
          {data.map((item, index) => {
            const barHeight = (item.score / maxScore) * 100;
            const color = getBarColor(item.score);
            return (
              <div key={index} className="chart-bar-group">
                <div
                  className="chart-bar"
                  style={{
                    height: `${barHeight}%`,
                    background: `linear-gradient(to top, ${color}, ${color}dd)`,
                  }}
                />
                <div className="chart-label">{item.day}</div>
                <div className="chart-value">{item.score}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
