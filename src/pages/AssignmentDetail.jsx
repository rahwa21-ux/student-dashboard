// AssignmentDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AssignmentDetail.css";
import {
  FaArrowLeft,
  FaClock,
  FaCalendarAlt,
  FaFileAlt,
  FaUpload,
  FaCheckCircle,
  FaBook,
  FaFlag,
} from "react-icons/fa";

const AssignmentDetail = () => {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [file, setFile] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("not_started"); // not_started, in_progress, submitted

  const assignmentsData = [
    {
      id: 1,
      subject: "Mathematics",
      title: "Calculus Assignment",
      description:
        "Complete problems 1-10 on differentiation and integration. Show all work and include step-by-step solutions.",
      dueDate: "2023-12-14T10:00:00",
      priority: "high",
      type: "assignment",
      instructions: `
        1. Solve problems 1-10 from Chapter 5
        2. Show all intermediate steps
        3. Include graphical representations where applicable
        4. Check your answers using differentiation rules
        5. Submit as a single PDF file
      `,
      estimatedTime: "2 hours",
      totalMarks: 100,
      attachments: ["Chapter5_Problems.pdf", "Sample_Solutions.pdf"],
      status: "pending",
      createdAt: "2023-12-10",
    },
    {
      id: 2,
      subject: "Biology",
      title: "Lab Report",
      description:
        "Write a comprehensive lab report on the cell division experiment conducted in class.",
      dueDate: "2023-12-15T14:00:00",
      priority: "medium",
      type: "lab",
      instructions: `
        1. Introduction: Explain cell division process
        2. Methodology: Describe experiment steps
        3. Results: Present findings with images
        4. Discussion: Analyze results and implications
        5. Conclusion: Summarize key findings
        6. References: Cite at least 3 scientific papers
      `,
      estimatedTime: "3 hours",
      totalMarks: 100,
      attachments: ["Lab_Guidelines.pdf", "Sample_Report.docx"],
      status: "pending",
      createdAt: "2023-12-10",
    },
    {
      id: 3,
      subject: "Economics",
      title: "Market Analysis",
      description:
        "Analyze current market trends for a chosen industry and predict future developments.",
      dueDate: "2023-12-18T11:00:00",
      priority: "low",
      type: "project",
      instructions: `
        1. Choose an industry (tech, healthcare, automotive, etc.)
        2. Analyze supply and demand factors
        3. Study current market trends
        4. Predict future market developments
        5. Include data visualizations
        6. Maximum 2000 words
      `,
      estimatedTime: "4 hours",
      totalMarks: 100,
      attachments: ["Market_Data.xlsx", "Formatting_Guidelines.pdf"],
      status: "pending",
      createdAt: "2023-12-10",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundAssignment = assignmentsData.find(
        (a) => a.id === parseInt(id),
      );
      if (foundAssignment) {
        setAssignment(foundAssignment);
      } else {
        navigate("/"); // Redirect if not found
      }
    }, 300);
  }, [id, navigate]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      setSubmissionStatus("submitted");
      alert(`Assignment "${assignment.title}" submitted successfully!`);
    } else {
      alert("Please upload a file before submitting.");
    }
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

  if (!assignment) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading assignment details...</p>
      </div>
    );
  }

  const priorityColor = getPriorityColor(assignment.priority);

  return (
    <div className="assignment-detail-container">
      {/* Header Section */}
      <div className="assignment-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <div className="header-content">
          <div className="subject-tag">
            <FaBook /> {assignment.subject}
          </div>
          <h1>{assignment.title}</h1>
          <div className="header-meta">
            <span
              className="priority-tag"
              style={{
                backgroundColor: `${priorityColor}20`,
                color: priorityColor,
              }}
            >
              <FaFlag /> {assignment.priority.toUpperCase()} PRIORITY
            </span>
            <span className="due-date">
              <FaCalendarAlt /> Due:{" "}
              {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="assignment-content">
        {/* Left Column */}
        <div className="left-column">
          {/* Description */}
          <div className="section-card">
            <h2 className="section-title">
              <FaFileAlt /> Description
            </h2>
            <p className="description-text">{assignment.description}</p>
          </div>

          {/* Instructions */}
          <div className="section-card">
            <h2 className="section-title">Instructions</h2>
            <div className="instructions-box">
              <pre>{assignment.instructions}</pre>
            </div>
          </div>

          {/* Attachments */}
          {assignment.attachments && assignment.attachments.length > 0 && (
            <div className="section-card">
              <h2 className="section-title">Attachments</h2>
              <div className="attachments-list">
                {assignment.attachments.map((attachment, index) => (
                  <div key={index} className="attachment-item">
                    <FaFileAlt />
                    <span>{attachment}</span>
                    <button className="download-btn">Download</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Timer Section */}
          <div className="timer-card">
            <h3 className="timer-title">
              <FaClock /> Study Timer
            </h3>
            <div className="timer-display">
              <span className="time">{formatTime(timer)}</span>
            </div>
            <div className="timer-controls">
              <button
                className={`timer-btn ${isTimerRunning ? "stop" : "start"}`}
                onClick={toggleTimer}
              >
                {isTimerRunning ? "Pause Timer" : "Start Timer"}
              </button>
              <button className="timer-btn reset" onClick={() => setTimer(0)}>
                Reset
              </button>
            </div>
            <div className="estimated-time">
              Estimated time: {assignment.estimatedTime}
            </div>
          </div>

          {/* Submission Section */}
          <div className="submission-card">
            <h3 className="submission-title">
              <FaUpload /> Submission
            </h3>

            <div className="upload-area">
              <input
                type="file"
                id="file-upload"
                className="file-input"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt"
              />
              <label htmlFor="file-upload" className="upload-label">
                {file ? file.name : "Click to upload or drag and drop"}
              </label>
              {file && (
                <div className="file-info">
                  <span>Selected: {file.name}</span>
                  <span>Size: {(file.size / 1024).toFixed(2)} KB</span>
                </div>
              )}
            </div>

            <div className="submission-status">
              Status:{" "}
              <span className={`status-badge status-${submissionStatus}`}>
                {submissionStatus.replace("_", " ").toUpperCase()}
              </span>
            </div>

            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={submissionStatus === "submitted"}
            >
              <FaCheckCircle /> Submit Assignment
            </button>

            <div className="marks-info">
              Total Marks:{" "}
              <span className="marks-value">{assignment.totalMarks}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="actions-card">
            <h3>Quick Actions</h3>
            <button className="action-btn">Save as Draft</button>
            <button className="action-btn">Request Extension</button>
            <button className="action-btn">Ask for Help</button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-section">
        <div className="progress-info">
          <span>Assignment Progress</span>
          <span>{submissionStatus === "submitted" ? "100%" : "0%"}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: submissionStatus === "submitted" ? "100%" : "0%",
              backgroundColor: priorityColor,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetail;
