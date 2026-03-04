import React, { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaBook,
  FaCheckCircle,
  FaTrash,
} from "react-icons/fa";
import "./Subject.css";

const subjectsData = [
  { id: 1, name: "Mathematics", lessons: 24, progress: 68, color: "#4F46E5" },
  { id: 2, name: "Physics", lessons: 18, progress: 52, color: "#10B981" },
  { id: 3, name: "Chemistry", lessons: 22, progress: 81, color: "#F59E0B" },
  { id: 4, name: "Biology", lessons: 20, progress: 35, color: "#F97316" },
  { id: 5, name: "English", lessons: 30, progress: 45, color: "#06B6D4" },
];

const Subjects = () => {
  const [subjects, setSubjects] = useState(subjectsData);
  const [search, setSearch] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const handleAddSubject = () => {
    if (newSubject.trim() === "") return;

    const newItem = {
      id: Date.now(),
      name: newSubject,
      lessons: 0,
      progress: 0,
      color: "#8B5CF6",
    };

    setSubjects([newItem, ...subjects]);
    setNewSubject("");
  };

  const handleDelete = (id) => {
    setSubjects(subjects.filter((item) => item.id !== id));
  };

  const filtered = subjects.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="subjects-page">
      <div className="subjects-header">
        <div className="subjects-title">
          <h2>My Subjects</h2>
          <p>Track your progress and manage your study plan.</p>
        </div>

        <div className="subjects-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="add-box">
            <input
              type="text"
              placeholder="Add new subject"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
            />
            <button onClick={handleAddSubject}>
              <FaPlus /> Add
            </button>
          </div>
        </div>
      </div>

      <div className="subjects-grid">
        {filtered.map((sub) => (
          <div key={sub.id} className="subject-card">
            <div className="subject-top">
              <div
                className="subject-icon"
                style={{ backgroundColor: sub.color }}
              >
                <FaBook />
              </div>

              <div className="subject-actions">
                <button className="check-btn">
                  <FaCheckCircle />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(sub.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <div className="subject-body">
              <h3>{sub.name}</h3>
              <p>{sub.lessons} Lessons</p>

              <div className="progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${sub.progress}%`,
                    backgroundColor: sub.color,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
