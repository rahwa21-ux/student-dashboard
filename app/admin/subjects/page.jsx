"use client";

import { useState } from "react";
import { Trash2, Edit, Check, X } from "lucide-react";

export default function SubjectsPage() {
  // Mock grades
  const [grades] = useState([
    { id: 1, name: "Grade 6" },
    { id: 2, name: "Grade 8" },
    { id: 3, name: "Grade 12" },
  ]);

  // Mock subjects
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Mathematics",
      description: "Numbers & Algebra",
      grade_id: 1,
    },
    { id: 2, name: "English", description: "Grammar & Writing", grade_id: 1 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editGrade, setEditGrade] = useState("");

  // Add Subject
  const addSubject = () => {
    const trimmed = name.trim();

    if (!trimmed || !selectedGrade)
      return alert("Subject name and grade are required");

    // Prevent duplicate per grade
    const duplicate = subjects.find(
      (s) =>
        s.name.toLowerCase() === trimmed.toLowerCase() &&
        String(s.grade_id) === String(selectedGrade),
    );

    if (duplicate) return alert("Subject already exists in this grade");

    const newSubject = {
      id: Date.now(),
      name: trimmed,
      description,
      grade_id: Number(selectedGrade),
    };

    setSubjects([newSubject, ...subjects]);
    setName("");
    setDescription("");
    setSelectedGrade("");
    setShowModal(false);
  };

  // Delete
  const deleteSubject = (id) => {
    if (!confirm("Delete this subject?")) return;
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  // Start edit
  const startEdit = (sub) => {
    setEditingId(sub.id);
    setEditName(sub.name);
    setEditDescription(sub.description);
    setEditGrade(sub.grade_id);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Save edit
  const saveEdit = (id) => {
    const trimmed = editName.trim();

    if (!trimmed || !editGrade) return alert("Subject name and grade required");

    const duplicate = subjects.find(
      (s) =>
        s.id !== id &&
        s.name.toLowerCase() === trimmed.toLowerCase() &&
        String(s.grade_id) === String(editGrade),
    );

    if (duplicate)
      return alert("Another subject with this name exists in this grade");

    setSubjects(
      subjects.map((s) =>
        s.id === id
          ? {
              ...s,
              name: trimmed,
              description: editDescription,
              grade_id: Number(editGrade),
            }
          : s,
      ),
    );

    cancelEdit();
  };

  const getGradeName = (gradeId) => {
    const grade = grades.find((g) => g.id === gradeId);
    return grade ? grade.name : "Unknown";
  };

  return (
    <div className="p-12 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Subjects</h1>

      <button
        onClick={() => setShowModal(true)}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Subject
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-lg font-semibold mb-3">Add New Subject</h2>

            <input
              type="text"
              placeholder="Subject name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border w-full px-3 py-2 mb-3 rounded"
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border w-full px-3 py-2 mb-3 rounded"
            />

            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="border w-full px-3 py-2 mb-4 rounded"
            >
              <option value="">Select Grade</option>
              {grades.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={addSubject}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subjects List */}
      <ul className="space-y-3">
        {subjects.map((sub) => (
          <li
            key={sub.id}
            className="border p-4 rounded shadow-sm flex justify-between items-center"
          >
            {editingId === sub.id ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-1">
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <select
                  value={editGrade}
                  onChange={(e) => setEditGrade(e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  {grades.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <p className="font-bold">{sub.name}</p>
                <p className="text-sm text-gray-500">{sub.description}</p>
                <p className="text-sm text-gray-400">
                  Grade: {getGradeName(sub.grade_id)}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              {editingId === sub.id ? (
                <>
                  <button
                    onClick={() => saveEdit(sub.id)}
                    className="bg-green-500 text-white p-2 rounded"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white p-2 rounded"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(sub)}
                    className="bg-yellow-500 text-white p-2 rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteSubject(sub.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
