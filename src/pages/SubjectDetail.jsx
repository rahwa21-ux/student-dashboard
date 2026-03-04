// SubjectDetail.js
import React, { useEffect, useState } from "react";
import "./SubjectDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const SubjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    // Mock data with all subjects (IDs must match SubjectProgress)
    const subjectsData = [
      {
        id: 1,
        name: "Mathematics",
        description:
          "Mathematics includes the study of numbers, formulas, and structures.",
        lastStudy: "2 hours ago",
        grade: "A",
        progress: 85,
        upcoming: "Algebra II",
        color: "#3b82f6",
        lessons: [
          "Algebra Basics",
          "Calculus I",
          "Geometry",
          "Statistics",
          "Algebra II",
        ],
      },
      {
        id: 2,
        name: "Biology",
        description:
          "Biology is the natural science that studies life and living organisms.",
        lastStudy: "Yesterday",
        grade: "B+",
        progress: 70,
        upcoming: "Cell Division",
        color: "#14b8a6",
        lessons: [
          "Cell Biology",
          "Genetics",
          "Evolution",
          "Ecology",
          "Cell Division",
        ],
      },
      {
        id: 3,
        name: "Economics",
        description:
          "Economics is the social science that studies the production, distribution, and consumption of goods and services.",
        lastStudy: "3 days ago",
        grade: "A-",
        progress: 90,
        upcoming: "Market Structures",
        color: "#10b981",
        lessons: [
          "Microeconomics",
          "Macroeconomics",
          "International Trade",
          "Market Structures",
        ],
      },
      {
        id: 4,
        name: "Physics",
        description:
          "Physics is the natural science that studies matter, its motion and behavior through space and time.",
        lastStudy: "1 week ago",
        grade: "B",
        progress: 60,
        upcoming: "Thermodynamics",
        color: "#8b5cf6",
        lessons: [
          "Mechanics",
          "Electromagnetism",
          "Optics",
          "Quantum Physics",
          "Thermodynamics",
        ],
      },
    ];

    const foundSubject = subjectsData.find((sub) => sub.id === parseInt(id));
    if (foundSubject) {
      setSubject(foundSubject);
    } else {
      // Handle subject not found
      console.error(`Subject with id ${id} not found`);
      navigate("/subjects");
    }
  }, [id, navigate]);

  if (!subject) {
    return (
      <div className="subject-detail loading">
        <div>Loading subject details...</div>
      </div>
    );
  }

  return (
    <div className="subject-detail">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <div
        className="subject-header"
        style={{ borderLeftColor: subject.color }}
      >
        <h1>{subject.name}</h1>
        <div className="subject-meta">
          <span className="grade-badge">Grade: {subject.grade}</span>
          <span className="last-study">Last studied: {subject.lastStudy}</span>
        </div>
      </div>

      <div className="subject-content">
        <div className="subject-description">
          <h2>Description</h2>
          <p>{subject.description}</p>
        </div>

        <div className="subject-progress">
          <h2>Progress</h2>
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${subject.progress}%`,
                  backgroundColor: subject.color,
                }}
              ></div>
            </div>
            <span className="progress-text">{subject.progress}% completed</span>
          </div>
        </div>

        <div className="subject-lessons">
          <h2>Lessons</h2>
          <ul className="lessons-list">
            {subject.lessons.map((lesson, index) => (
              <li
                key={index}
                className={lesson === subject.upcoming ? "upcoming-lesson" : ""}
              >
                {lesson}
                {lesson === subject.upcoming && (
                  <span className="upcoming-badge">Up Next</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="subject-actions">
          <button
            className="start-lesson-btn"
            style={{ backgroundColor: subject.color }}
          >
            Start {subject.upcoming} Lesson
          </button>
          <button className="view-resources-btn">View Study Resources</button>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
