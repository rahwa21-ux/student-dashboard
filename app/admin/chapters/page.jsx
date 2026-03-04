"use client";

import { useState } from "react";
import { Trash2, Edit, Check, X } from "lucide-react";

// Mock data
const mockGrades = [
  { id: "1", name: "Grade 6" },
  { id: "2", name: "Grade 8" },
  { id: "3", name: "Grade 12" },
];

const mockSubjects = [
  { id: "101", name: "Math", grade_id: "1" },
  { id: "102", name: "English", grade_id: "1" },
  { id: "103", name: "Science", grade_id: "2" },
  { id: "104", name: "  physics", grade_id: "3" },
  { id: "104", name: "Chemistry", grade_id: "3" },
];

export default function ChaptersPage() {
  const [grades] = useState(mockGrades);
  const [subjects] = useState(mockSubjects);

  const [selectedGrade, setSelectedGrade] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [chapterName, setChapterName] = useState("");

  const [chapters, setChapters] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editChapterName, setEditChapterName] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editGrade, setEditGrade] = useState("");

  // When grade changes, filter subjects
  const handleGradeChange = (gradeId) => {
    setSelectedGrade(gradeId);
    setSelectedSubject(""); // reset subject
    const subs = subjects.filter((s) => s.grade_id === gradeId);
    setFilteredSubjects(subs);
  };

  // Add chapter
  const addChapter = () => {
    if (!chapterName.trim() || !selectedGrade || !selectedSubject) {
      return alert("All fields are required");
    }

    const gradeName = grades.find((g) => g.id === selectedGrade)?.name || "";
    const subjectName =
      subjects.find((s) => s.id === selectedSubject)?.name || "";

    const newChapter = {
      id: Date.now().toString(),
      name: chapterName,
      grade_id: selectedGrade,
      grade_name: gradeName,
      subject_id: selectedSubject,
      subject_name: subjectName,
    };

    setChapters([newChapter, ...chapters]);
    setChapterName("");
    setSelectedGrade("");
    setSelectedSubject("");
    setFilteredSubjects([]);
  };

  // Edit / Delete logic
  const startEdit = (chapter) => {
    setEditingId(chapter.id);
    setEditChapterName(chapter.name);
    setEditGrade(chapter.grade_id);
    setEditSubject(chapter.subject_id);

    // update filtered subjects for the grade
    setFilteredSubjects(
      subjects.filter((s) => s.grade_id === chapter.grade_id),
    );
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditChapterName("");
    setEditGrade("");
    setEditSubject("");
    setFilteredSubjects([]);
  };

  const saveEdit = (id) => {
    if (!editChapterName.trim() || !editGrade || !editSubject)
      return alert("All fields are required");

    const gradeName = grades.find((g) => g.id === editGrade)?.name || "";
    const subjectName = subjects.find((s) => s.id === editSubject)?.name || "";

    const updatedChapter = {
      id,
      name: editChapterName,
      grade_id: editGrade,
      grade_name: gradeName,
      subject_id: editSubject,
      subject_name: subjectName,
    };

    setChapters(chapters.map((c) => (c.id === id ? updatedChapter : c)));
    cancelEdit();
  };

  const deleteChapter = (id) => {
    if (!confirm("Delete this chapter?")) return;
    setChapters(chapters.filter((c) => c.id !== id));
  };

  return (
    <div className="p-12 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chapters</h1>

      {/* Add Chapter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        <input
          type="text"
          placeholder="Chapter name"
          value={chapterName}
          onChange={(e) => setChapterName(e.target.value)}
          className="border rounded px-3 py-2"
        />

        <select
          value={selectedGrade}
          onChange={(e) => handleGradeChange(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Select Grade</option>
          {grades.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border rounded px-3 py-2"
          disabled={!selectedGrade}
        >
          <option value="">Select Subject</option>
          {filteredSubjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={addChapter}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add Chapter
      </button>

      {/* Chapters List */}
      {chapters.length === 0 ? (
        <p>No chapters yet.</p>
      ) : (
        <ul className="space-y-2">
          {chapters.map((c) => (
            <li
              key={c.id}
              className="border p-3 rounded flex justify-between items-center shadow-sm"
            >
              {editingId === c.id ? (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                  <input
                    type="text"
                    value={editChapterName}
                    onChange={(e) => setEditChapterName(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                  <select
                    value={editGrade}
                    onChange={(e) => {
                      setEditGrade(e.target.value);
                      setFilteredSubjects(
                        subjects.filter((s) => s.grade_id === e.target.value),
                      );
                      setEditSubject("");
                    }}
                    className="border rounded px-2 py-1"
                  >
                    <option value="">Select Grade</option>
                    {grades.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="">Select Subject</option>
                    {filteredSubjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="flex-1">
                  <p className="font-bold">{c.name}</p>
                  <p className="text-gray-400 text-sm">
                    Grade: {c.grade_name} | Subject: {c.subject_name}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                {editingId === c.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(c.id)}
                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(c)}
                      className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteChapter(c.id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
