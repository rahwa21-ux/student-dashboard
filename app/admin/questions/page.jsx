"use client";

import { useState, useEffect } from "react";
import {
  FaQuestionCircle,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSort,
  FaBook,
  FaTag,
  FaGraduationCap,
  FaBrain,
  FaClone,
  FaDownload,
  FaUpload,
  FaExchangeAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaChartLine,
  FaListOl,
  FaDotCircle,
  FaAlignLeft,
} from "react-icons/fa";

const QuestionBankPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [viewMode, setViewMode] = useState("table");
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data for question bank
  const sampleQuestions = [
    {
      id: 1,
      question: "Solve for x: 2x + 5 = 13",
      subject: "Mathematics",
      topic: "Algebra",
      type: "multiple_choice",
      difficulty: "Easy",
      points: 5,
      status: "approved",
      createdBy: "Dr. Sara Mohammed",
      createdAt: "2024-02-15",
      lastUsed: "2024-02-18",
      usageCount: 45,
      tags: ["algebra", "equation", "solve"],
      options: ["x = 4", "x = 5", "x = 6", "x = 7"],
      correctAnswer: "x = 4",
      explanation:
        "Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4",
    },
    {
      id: 2,
      question: "What is Newton's First Law of Motion?",
      subject: "Physics",
      topic: "Mechanics",
      type: "multiple_choice",
      difficulty: "Easy",
      points: 5,
      status: "approved",
      createdBy: "Prof. Michael Tadesse",
      createdAt: "2024-02-14",
      lastUsed: "2024-02-17",
      usageCount: 38,
      tags: ["physics", "newton", "laws"],
      options: [
        "An object at rest stays at rest",
        "F = ma",
        "For every action, there is an equal and opposite reaction",
        "Energy cannot be created or destroyed",
      ],
      correctAnswer: "An object at rest stays at rest",
      explanation:
        "Newton's First Law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force.",
    },
    {
      id: 3,
      question: "Balance the chemical equation: H₂ + O₂ → H₂O",
      subject: "Chemistry",
      topic: "Chemical Reactions",
      type: "fill_in_blank",
      difficulty: "Medium",
      points: 10,
      status: "approved",
      createdBy: "Dr. Elizabeth Wondimu",
      createdAt: "2024-02-13",
      lastUsed: "2024-02-16",
      usageCount: 32,
      tags: ["chemistry", "balancing", "equations"],
      correctAnswer: "2H₂ + O₂ → 2H₂O",
      explanation:
        "The balanced equation requires 2 molecules of hydrogen and 1 molecule of oxygen to produce 2 molecules of water.",
    },
    {
      id: 4,
      question: "Describe the process of photosynthesis.",
      subject: "Biology",
      topic: "Plant Biology",
      type: "essay",
      difficulty: "Hard",
      points: 20,
      status: "review",
      createdBy: "Dr. Elizabeth Wondimu",
      createdAt: "2024-02-12",
      lastUsed: "Never",
      usageCount: 0,
      tags: ["biology", "photosynthesis", "plants"],
      wordLimit: 250,
      explanation:
        "Photosynthesis is the process by which plants convert light energy into chemical energy in the form of glucose.",
    },
    {
      id: 5,
      question:
        "Identify the grammatical error in the sentence: 'He go to school every day.'",
      subject: "English Language",
      topic: "Grammar",
      type: "multiple_choice",
      difficulty: "Easy",
      points: 5,
      status: "approved",
      createdBy: "Teacher Sarah Johnson",
      createdAt: "2024-02-11",
      lastUsed: "2024-02-14",
      usageCount: 52,
      tags: ["english", "grammar", "verbs"],
      options: [
        "'go' should be 'goes'",
        "'every day' should be 'everyday'",
        "No error",
        "'He' should be 'Him'",
      ],
      correctAnswer: "'go' should be 'goes'",
      explanation:
        "The subject 'He' is third person singular, so the verb should be 'goes'.",
    },
    {
      id: 6,
      question:
        "Write a Python function to calculate the factorial of a number.",
      subject: "Computer Science",
      topic: "Programming",
      type: "coding",
      difficulty: "Medium",
      points: 15,
      status: "approved",
      createdBy: "Prof. Michael Tadesse",
      createdAt: "2024-02-10",
      lastUsed: "2024-02-13",
      usageCount: 28,
      tags: ["python", "programming", "functions"],
      language: "python",
      explanation:
        "A factorial function can be implemented using recursion or iteration.",
    },
    {
      id: 7,
      question: "Match the historical events with their dates:",
      subject: "History",
      topic: "World History",
      type: "matching",
      difficulty: "Medium",
      points: 12,
      status: "approved",
      createdBy: "Mr. Yohannes Alemu",
      createdAt: "2024-02-09",
      lastUsed: "2024-02-12",
      usageCount: 18,
      tags: ["history", "matching", "dates"],
      pairs: [
        { left: "American Revolution", right: "1776" },
        { left: "French Revolution", right: "1789" },
        { left: "World War I", right: "1914" },
        { left: "World War II", right: "1939" },
      ],
      explanation: "These are key dates in world history.",
    },
    {
      id: 8,
      question: "True or False: The capital of Ethiopia is Addis Ababa.",
      subject: "Geography",
      topic: "Countries & Capitals",
      type: "true_false",
      difficulty: "Easy",
      points: 3,
      status: "approved",
      createdBy: "Mr. Yohannes Alemu",
      createdAt: "2024-02-08",
      lastUsed: "2024-02-11",
      usageCount: 25,
      tags: ["geography", "capitals", "truefalse"],
      correctAnswer: "True",
      explanation: "Addis Ababa has been the capital of Ethiopia since 1889.",
    },
    {
      id: 9,
      question: "List three benefits of regular exercise.",
      subject: "Physical Education",
      topic: "Health & Fitness",
      type: "short_answer",
      difficulty: "Easy",
      points: 8,
      status: "draft",
      createdBy: "Mr. Samuel Kebede",
      createdAt: "2024-02-07",
      lastUsed: "Never",
      usageCount: 0,
      tags: ["exercise", "health", "fitness"],
      expectedAnswers: [
        "Improved cardiovascular health",
        "Weight management",
        "Reduced stress",
      ],
      explanation:
        "Regular exercise provides numerous physical and mental health benefits.",
    },
    {
      id: 10,
      question: "Translate to Amharic: 'Good morning, how are you?'",
      subject: "Amharic Language",
      topic: "Translation",
      type: "translation",
      difficulty: "Medium",
      points: 10,
      status: "approved",
      createdBy: "Ms. Alemitu Bekele",
      createdAt: "2024-02-06",
      lastUsed: "2024-02-09",
      usageCount: 35,
      tags: ["amharic", "translation", "greetings"],
      correctAnswer: "እንደምን አደርክ, በሕግ እንደምን አደርክ?",
      explanation: "Common Amharic greeting for morning.",
    },
  ];

  const subjectOptions = [
    { value: "all", label: "All Subjects" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
    { value: "English Language", label: "English" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "History", label: "History" },
    { value: "Geography", label: "Geography" },
    { value: "Physical Education", label: "PE" },
    { value: "Amharic Language", label: "Amharic" },
  ];

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "multiple_choice", label: "Multiple Choice" },
    { value: "true_false", label: "True/False" },
    { value: "fill_in_blank", label: "Fill in Blank" },
    { value: "short_answer", label: "Short Answer" },
    { value: "essay", label: "Essay" },
    { value: "matching", label: "Matching" },
    { value: "coding", label: "Coding" },
    { value: "translation", label: "Translation" },
  ];

  const difficultyOptions = [
    { value: "all", label: "All Difficulties" },
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "approved", label: "Approved" },
    { value: "review", label: "Under Review" },
    { value: "draft", label: "Draft" },
    { value: "archived", label: "Archived" },
  ];

  // Statistics
  const questionStats = {
    total: sampleQuestions.length,
    approved: sampleQuestions.filter((q) => q.status === "approved").length,
    multipleChoice: sampleQuestions.filter((q) => q.type === "multiple_choice")
      .length,
    totalPoints: sampleQuestions.reduce((sum, q) => sum + q.points, 0),
    totalUsage: sampleQuestions.reduce((sum, q) => sum + q.usageCount, 0),
    avgDifficulty: "Medium",
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setQuestions(sampleQuestions);
      setFilteredQuestions(sampleQuestions);
      setLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    let filtered = [...questions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ) ||
          q.explanation.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply subject filter
    if (selectedSubject !== "all") {
      filtered = filtered.filter((q) => q.subject === selectedSubject);
    }

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((q) => q.type === selectedType);
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((q) => q.difficulty === selectedDifficulty);
    }

    // Apply status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((q) => q.status === selectedStatus);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "question":
          return a.question.localeCompare(b.question);
        case "points":
          return b.points - a.points;
        case "usage":
          return b.usageCount - a.usageCount;
        case "difficulty":
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
          return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
        case "date":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredQuestions(filtered);
  }, [
    searchTerm,
    selectedSubject,
    selectedType,
    selectedDifficulty,
    selectedStatus,
    sortBy,
    questions,
  ]);

  const getTypeIcon = (type) => {
    const icons = {
      multiple_choice: <FaDotCircle className="text-blue-500" />,
      true_false: <FaExchangeAlt className="text-green-500" />,
      fill_in_blank: <FaAlignLeft className="text-purple-500" />,
      short_answer: <FaListOl className="text-orange-500" />,
      essay: <FaBook className="text-red-500" />,
      matching: <FaClone className="text-teal-500" />,
      coding: <FaBrain className="text-indigo-500" />,
      translation: <FaExchangeAlt className="text-amber-500" />,
    };
    return icons[type] || <FaQuestionCircle className="text-gray-500" />;
  };

  const getTypeBadge = (type) => {
    const typeNames = {
      multiple_choice: "Multiple Choice",
      true_false: "True/False",
      fill_in_blank: "Fill in Blank",
      short_answer: "Short Answer",
      essay: "Essay",
      matching: "Matching",
      coding: "Coding",
      translation: "Translation",
    };

    const styles = {
      multiple_choice: "bg-blue-100 text-blue-800",
      true_false: "bg-green-100 text-green-800",
      fill_in_blank: "bg-purple-100 text-purple-800",
      short_answer: "bg-orange-100 text-orange-800",
      essay: "bg-red-100 text-red-800",
      matching: "bg-teal-100 text-teal-800",
      coding: "bg-indigo-100 text-indigo-800",
      translation: "bg-amber-100 text-amber-800",
    };
    return {
      text: typeNames[type] || type,
      style: styles[type] || "bg-gray-100 text-gray-800",
    };
  };

  const getDifficultyBadge = (difficulty) => {
    const styles = {
      Easy: "bg-green-100 text-green-800 border border-green-200",
      Medium: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      Hard: "bg-red-100 text-red-800 border border-red-200",
    };
    return styles[difficulty] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status) => {
    const styles = {
      approved: "bg-green-100 text-green-800 border border-green-200",
      review: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      draft: "bg-blue-100 text-blue-800 border border-blue-200",
      archived: "bg-gray-100 text-gray-800 border border-gray-200",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleSelectQuestion = (id) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(
        selectedQuestions.filter((questionId) => questionId !== id),
      );
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const handleBulkAction = (action) => {
    if (selectedQuestions.length === 0) return;

    switch (action) {
      case "approve":
        alert(`Approving ${selectedQuestions.length} question(s)`);
        break;
      case "archive":
        alert(`Archiving ${selectedQuestions.length} question(s)`);
        break;
      case "duplicate":
        alert(`Duplicating ${selectedQuestions.length} question(s)`);
        break;
      case "export":
        alert(`Exporting ${selectedQuestions.length} question(s)`);
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading question bank...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Question Bank</h1>
          <p className="text-gray-600">
            Manage all questions, create question pools, and organize by topics
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPlus /> Add Question
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FaUpload /> Import Questions
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FaDownload /> Export Questions
          </button>
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("table")}
              className={`px-3 py-2 ${viewMode === "table" ? "bg-blue-100 text-blue-600" : "bg-white"}`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-2 ${viewMode === "cards" ? "bg-blue-100 text-blue-600" : "bg-white"}`}
            >
              Cards
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Questions</p>
              <p className="text-xl font-bold">{questionStats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaQuestionCircle className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-xl font-bold">{questionStats.approved}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FaCheckCircle className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Multiple Choice</p>
              <p className="text-xl font-bold">
                {questionStats.multipleChoice}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaDotCircle className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Points</p>
              <p className="text-xl font-bold">{questionStats.totalPoints}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <FaChartLine className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Usage</p>
              <p className="text-xl font-bold">{questionStats.totalUsage}</p>
            </div>
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <FaBrain className="text-teal-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Avg Difficulty</p>
              <p className="text-xl font-bold">{questionStats.avgDifficulty}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 font-bold">M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedQuestions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FaQuestionCircle className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-800">
                  {selectedQuestions.length} question
                  {selectedQuestions.length > 1 ? "s" : ""} selected
                </p>
                <p className="text-sm text-blue-600">
                  Perform actions on selected questions
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleBulkAction("approve")}
                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
              >
                <FaCheckCircle /> Approve
              </button>
              <button
                onClick={() => handleBulkAction("archive")}
                className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm flex items-center gap-2"
              >
                <FaTimesCircle /> Archive
              </button>
              <button
                onClick={() => handleBulkAction("duplicate")}
                className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center gap-2"
              >
                <FaClone /> Duplicate
              </button>
              <button
                onClick={() => handleBulkAction("export")}
                className="px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm flex items-center gap-2"
              >
                <FaDownload /> Export
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-white border rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative md:col-span-2">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions by content, topic, or tags..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="question">Sort by Question</option>
            <option value="points">Sort by Points</option>
            <option value="usage">Sort by Usage</option>
            <option value="difficulty">Sort by Difficulty</option>
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <select
            className="border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficultyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className="border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaTag /> By Tags
          </button>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaGraduationCap /> By Topic
          </button>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaBrain /> By Difficulty
          </button>
        </div>
      </div>

      {/* Questions View */}
      {viewMode === "table" ? (
        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedQuestions(
                            filteredQuestions.map((q) => q.id),
                          );
                        } else {
                          setSelectedQuestions([]);
                        }
                      }}
                      checked={
                        selectedQuestions.length === filteredQuestions.length &&
                        filteredQuestions.length > 0
                      }
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Question
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type & Difficulty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Usage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredQuestions.map((q) => {
                  const typeInfo = getTypeBadge(q.type);

                  return (
                    <tr key={q.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedQuestions.includes(q.id)}
                          onChange={() => handleSelectQuestion(q.id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <p className="font-medium text-gray-900">
                            {truncateText(q.question, 80)}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {q.tags.slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {q.tags.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{q.tags.length - 2}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            {truncateText(q.explanation, 60)}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-900">
                            {q.subject}
                          </p>
                          <p className="text-sm text-gray-500">{q.topic}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">
                              {q.points} points
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <FaGraduationCap className="text-gray-400" />
                            <span>By: {q.createdBy}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 flex items-center justify-center">
                              {getTypeIcon(q.type)}
                            </div>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${typeInfo.style}`}
                            >
                              {typeInfo.text}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getDifficultyBadge(q.difficulty)}`}
                          >
                            {q.difficulty}
                          </span>
                          {q.options && (
                            <div className="text-xs text-gray-500">
                              {q.options.length} options
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(q.status)}`}
                          >
                            {q.status}
                          </span>
                          <div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Usage:</span>
                              <span className="font-medium">
                                {q.usageCount}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className="bg-blue-600 h-1.5 rounded-full"
                                style={{
                                  width: `${Math.min((q.usageCount / 50) * 100, 100)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Last used:{" "}
                            {q.lastUsed === "Never"
                              ? "Never"
                              : new Date(q.lastUsed).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-2">
                          <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2 justify-center">
                            <FaEye /> Preview
                          </button>
                          <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-2 justify-center">
                            <FaEdit /> Edit
                          </button>
                          <button className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 flex items-center gap-2 justify-center">
                            <FaClone /> Duplicate
                          </button>
                          <button className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 flex items-center gap-2 justify-center">
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuestions.map((q) => {
            const typeInfo = getTypeBadge(q.type);

            return (
              <div
                key={q.id}
                className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Question Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getTypeIcon(q.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">
                        {truncateText(q.question, 60)}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {q.subject} • {q.topic}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(q.status)}`}
                  >
                    {q.status}
                  </span>
                </div>

                {/* Question Body */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-3">
                    {truncateText(q.explanation, 80)}
                  </p>

                  {/* Options Preview (for multiple choice) */}
                  {q.options && (
                    <div className="space-y-1 mb-3">
                      <p className="text-xs font-medium text-gray-700">
                        Options:
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {q.options.slice(0, 2).map((option, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-gray-600 bg-gray-50 p-1 rounded"
                          >
                            {truncateText(option, 30)}
                          </div>
                        ))}
                        {q.options.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{q.options.length - 2} more options
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Correct Answer */}
                  {q.correctAnswer && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-gray-700">
                        Correct Answer:
                      </p>
                      <p className="text-xs text-green-600 bg-green-50 p-2 rounded mt-1">
                        {truncateText(q.correctAnswer, 50)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {q.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {q.tags.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{q.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats and Info */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <div className="font-bold text-gray-800">{q.points}</div>
                    <div className="text-xs text-gray-500">Points</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <div className="font-bold text-gray-800">
                      {q.usageCount}
                    </div>
                    <div className="text-xs text-gray-500">Usage</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 rounded-lg">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getDifficultyBadge(q.difficulty)}`}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-4 border-t">
                  <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">
                    <FaEye />
                  </button>
                  <button className="p-2 hover:bg-green-50 rounded-lg text-green-600">
                    <FaEdit />
                  </button>
                  <button className="p-2 hover:bg-purple-50 rounded-lg text-purple-600">
                    <FaClone />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Add New Question
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Type *
                  </label>
                  <select className="w-full border rounded-lg px-3 py-2">
                    <option value="">Select Question Type</option>
                    {typeOptions.slice(1).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Text *
                  </label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 h-32"
                    placeholder="Enter your question here..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <select className="w-full border rounded-lg px-3 py-2">
                      <option value="">Select Subject</option>
                      {subjectOptions.slice(1).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Topic
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="e.g., Algebra, Grammar, etc."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Points
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="e.g., 5"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty
                    </label>
                    <select className="w-full border rounded-lg px-3 py-2">
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Explanation (Optional)
                  </label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 h-24"
                    placeholder="Enter explanation or solution..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g., algebra, equation, solve"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBankPage;
