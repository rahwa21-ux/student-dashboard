"use client";

import { useState } from "react";

export default function GradeManager() {
  const [grades, setGrades] = useState(["Grade 6", "Grade 8", "Grade 12"]);

  const [selectedGrade, setSelectedGrade] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newGrade, setNewGrade] = useState("");

  const handleAddGrade = () => {
    const trimmed = newGrade.trim();

    if (!trimmed) {
      alert("Grade name is required");
      return;
    }

    if (grades.includes(trimmed)) {
      alert("Grade already exists");
      return;
    }

    setGrades([...grades, trimmed]);
    setNewGrade("");
    setShowModal(false);
  };

  return (
    <div className="p-12 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Grade Management</h2>

      {/* Dropdown + Add Button */}
      <div className="flex gap-3 mb-6">
        <select
          className="border rounded px-3 py-2 w-full"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          <option value="">Select Grade</option>
          {grades.map((grade, index) => (
            <option key={index} value={grade}>
              {grade}
            </option>
          ))}
        </select>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 rounded"
        >
          + Add
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Add New Grade</h3>

            <input
              type="text"
              placeholder="Enter grade name"
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
              className="border w-full px-3 py-2 rounded mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddGrade}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
