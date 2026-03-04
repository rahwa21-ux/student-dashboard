"use client";

import { useState } from "react";
import { Trash2, Edit, Check, X } from "lucide-react";

export default function LessonsPage() {
  // Mock grades, subjects, chapters
  const mockGrades = [
    { id: "1", name: "Grade 6" },
    { id: "2", name: "Grade 7" },
    { id: "3", name: "Grade 8" },
  ];

  const mockSubjects = [
    { id: "101", name: "Math", grade_id: "1" },
    { id: "102", name: "English", grade_id: "1" },
    { id: "103", name: "Science", grade_id: "2" },
  ];

  const mockChapters = [
    { id: "1001", title: "Algebra", subject_id: "101", grade_id: "1" },
    { id: "1002", title: "Geometry", subject_id: "101", grade_id: "1" },
    { id: "1003", title: "Grammar", subject_id: "102", grade_id: "1" },
  ];

  const [grades] = useState(mockGrades);
  const [subjects] = useState(mockSubjects);
  const [chapters] = useState(mockChapters);
  const [lessons, setLessons] = useState([]);

  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoPath, setVideoPath] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  // Filtered subjects and chapters based on selection
  const filteredSubjects = subjects.filter((s) => s.grade_id === selectedGrade);
  const filteredChapters = chapters.filter(
    (c) => c.subject_id === selectedSubject,
  );

  // Add or update lesson
  const saveLesson = () => {
    if (!title || !selectedChapter) return alert("Title and Chapter required");

    const chapter = chapters.find((c) => c.id === selectedChapter);
    const subject = subjects.find((s) => s.id === selectedSubject);
    const grade = grades.find((g) => g.id === selectedGrade);

    const newLesson = {
      id: editingId || Date.now().toString(),
      title,
      description,
      video_path: videoPath || "",
      chapter_id: selectedChapter,
      chapter_name: chapter?.title || "",
      subject_id: selectedSubject,
      subject_name: subject?.name || "",
      grade_id: selectedGrade,
      grade_name: grade?.name || "",
    };

    if (editingId) {
      setLessons(lessons.map((l) => (l.id === editingId ? newLesson : l)));
    } else {
      setLessons([newLesson, ...lessons]);
    }

    // Reset form
    setTitle("");
    setDescription("");
    setVideoPath("");
    setSelectedGrade("");
    setSelectedSubject("");
    setSelectedChapter("");
    setEditingId(null);
    setShowAdd(false);
  };

  // Edit lesson
  const handleEdit = (lesson) => {
    setShowAdd(true);
    setTitle(lesson.title);
    setDescription(lesson.description);
    setVideoPath(lesson.video_path);
    setSelectedGrade(lesson.grade_id);
    setSelectedSubject(lesson.subject_id);
    setSelectedChapter(lesson.chapter_id);
    setEditingId(lesson.id);
  };

  // Delete lesson
  const handleDelete = (id) => {
    if (!confirm("Are you sure?")) return;
    setLessons(lessons.filter((l) => l.id !== id));
  };

  return (
    <div className="p-12 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lessons</h1>

      <button
        onClick={() => setShowAdd(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {editingId ? "Edit Lesson" : "Add Lesson"}
      </button>

      {showAdd && (
        <div className="border p-4 rounded mb-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
            <select
              value={selectedGrade}
              onChange={(e) => {
                setSelectedGrade(e.target.value);
                setSelectedSubject("");
                setSelectedChapter("");
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
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedChapter("");
              }}
              className="border rounded px-2 py-1"
            >
              <option value="">Select Subject</option>
              {filteredSubjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">Select Chapter</option>
              {filteredChapters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Lesson Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-2 py-1 mb-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-2 py-1 mb-2 w-full"
          />
          <input
            type="text"
            placeholder="Video Path (mock)"
            value={videoPath}
            onChange={(e) => setVideoPath(e.target.value)}
            className="border rounded px-2 py-1 mb-2 w-full"
          />

          <div className="flex gap-2">
            <button
              onClick={saveLesson}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {editingId ? "Update Lesson" : "Add Lesson"}
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Lessons List */}
      {lessons.length === 0 ? (
        <p>No lessons yet.</p>
      ) : (
        <ul className="space-y-4">
          {lessons.map((l) => (
            <li
              key={l.id}
              className="border p-3 rounded shadow flex justify-between items-start"
            >
              <div>
                <p className="font-bold">{l.title}</p>
                <p className="text-gray-500">{l.description}</p>
                <p className="text-gray-400 text-sm">
                  {l.grade_name} / {l.subject_name} / {l.chapter_name}
                </p>
                {l.video_path && (
                  <video controls className="mt-2 w-full max-h-60">
                    <source src={l.video_path} type="video/mp4" />
                  </video>
                )}
              </div>
              <div className="flex gap-2 ml-4 mt-1">
                <button
                  onClick={() => handleEdit(l)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(l.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
