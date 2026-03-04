"use client";

import { useEffect, useState } from "react";

export default function NotesPage() {
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [file, setFile] = useState(null);

  // Fetch grades
  useEffect(() => {
    const fetchGrades = async () => {
      const res = await fetch("/api/grades");
      const data = await res.json();
      setGrades(data);
    };
    fetchGrades();
  }, []);

  // Fetch subjects when grade changes
  useEffect(() => {
    if (!selectedGrade) return setSubjects([]);
    const fetchSubjects = async () => {
      const res = await fetch("/api/subjects");
      const data = await res.json();
      setSubjects(data.filter((s) => s.grade_id === parseInt(selectedGrade)));
      setSelectedSubject("");
      setChapters([]);
      setSelectedChapter("");
    };
    fetchSubjects();
  }, [selectedGrade]);

  // Fetch chapters when subject changes
  useEffect(() => {
    if (!selectedSubject) return setChapters([]);
    const fetchChapters = async () => {
      const res = await fetch("/api/chapters");
      const data = await res.json();
      setChapters(
        data.filter((c) => c.subject_id === parseInt(selectedSubject)),
      );
      setSelectedChapter("");
    };
    fetchChapters();
  }, [selectedSubject]);

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // Add note
  const addNote = async () => {
    if (!title || !selectedChapter) return alert("Title and Chapter required");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("chapter_id", selectedChapter);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to add note");

      const newNote = await res.json();
      setNotes([newNote, ...notes]);

      // Reset form
      setTitle("");
      setDescription("");
      setSelectedGrade("");
      setSelectedSubject("");
      setSelectedChapter("");
      setFile(null);
      setChapters([]);
      setShowAdd(false);
    } catch (err) {
      console.error(err);
      alert("Error adding note");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>

      <button
        onClick={() => setShowAdd(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Note
      </button>

      {showAdd && (
        <div className="border p-4 rounded mb-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
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
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
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
              {chapters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Title"
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
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-2"
          />

          <button
            onClick={addNote}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Note
          </button>
        </div>
      )}

      {/* Notes List */}
      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((n) => (
            <li
              key={n.id}
              className="border p-3 rounded flex flex-col md:flex-row justify-between shadow-sm"
            >
              <div>
                <p className="font-bold">{n.title}</p>

                <p className="text-gray-500 text-sm">{n.description}</p>
                <p className="text-gray-400 text-sm">
                  Chapter: {n.chapter_name || "—"}
                </p>
              </div>
              {n.file_path && (
                <a
                  href={n.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2"
                >
                  View File
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
