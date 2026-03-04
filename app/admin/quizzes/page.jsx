"use client";

import { useState, useEffect } from "react";
import {
  FaClipboardList,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaSort,
  FaClock,
  FaCalendar,
  FaBook,
  FaUsers,
  FaChartLine,
  FaQuestionCircle,
  FaPercentage,
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaShare,
  FaPlay,
  FaGraduationCap,
  FaBrain,
} from "react-icons/fa";

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for quizzes
  const sampleQuizzes = [
    {
      id: 1,
      title: "Algebra Basics Quiz",
      subject: "Mathematics",
      grade: "Grade 10",
      questions: 20,
      duration: "30 minutes",
      totalPoints: 100,
      attempts: 320,
      avgScore: 78,
      passRate: 85,
      difficulty: "Medium",
      status: "active",
      createdBy: "Dr. Sara Mohammed",
      createdAt: "2024-02-15",
      dueDate: "2024-02-25",
      description: "Basic algebraic equations and expressions",
      tags: ["algebra", "basics", "quiz"],
      type: "graded",
      shuffleQuestions: true,
      showAnswers: "after_submission",
      timeLimit: true,
    },
    {
      id: 2,
      title: "Physics Laws Quiz",
      subject: "Physics",
      grade: "Grade 11",
      questions: 25,
      duration: "45 minutes",
      totalPoints: 100,
      attempts: 280,
      avgScore: 72,
      passRate: 78,
      difficulty: "Hard",
      status: "active",
      createdBy: "Prof. Michael Tadesse",
      createdAt: "2024-02-14",
      dueDate: "2024-02-24",
      description: "Newton's laws and basic physics principles",
      tags: ["physics", "laws", "principles"],
      type: "graded",
      shuffleQuestions: true,
      showAnswers: "never",
      timeLimit: true,
    },
    {
      id: 3,
      title: "Chemistry Elements Test",
      subject: "Chemistry",
      grade: "Grade 10",
      questions: 15,
      duration: "20 minutes",
      totalPoints: 50,
      attempts: 350,
      avgScore: 85,
      passRate: 92,
      difficulty: "Easy",
      status: "active",
      createdBy: "Dr. Elizabeth Wondimu",
      createdAt: "2024-02-13",
      dueDate: "2024-02-23",
      description: "Periodic table and element properties",
      tags: ["chemistry", "elements", "periodic"],
      type: "practice",
      shuffleQuestions: false,
      showAnswers: "immediately",
      timeLimit: false,
    },
    {
      id: 4,
      title: "Biology Cell Structure Quiz",
      subject: "Biology",
      grade: "Grade 12",
      questions: 30,
      duration: "60 minutes",
      totalPoints: 150,
      attempts: 210,
      avgScore: 68,
      passRate: 72,
      difficulty: "Hard",
      status: "draft",
      createdBy: "Dr. Elizabeth Wondimu",
      createdAt: "2024-02-12",
      dueDate: "2024-03-01",
      description: "Cell organelles and their functions",
      tags: ["biology", "cell", "structure"],
      type: "graded",
      shuffleQuestions: true,
      showAnswers: "after_due_date",
      timeLimit: true,
    },
    {
      id: 5,
      title: "English Grammar Quiz",
      subject: "English Language",
      grade: "Grade 9",
      questions: 20,
      duration: "25 minutes",
      totalPoints: 100,
      attempts: 420,
      avgScore: 82,
      passRate: 88,
      difficulty: "Medium",
      status: "active",
      createdBy: "Teacher Sarah Johnson",
      createdAt: "2024-02-11",
      dueDate: "2024-02-21",
      description: "Grammar rules and sentence structure",
      tags: ["english", "grammar", "quiz"],
      type: "graded",
      shuffleQuestions: true,
      showAnswers: "after_submission",
      timeLimit: true,
    },
    {
      id: 6,
      title: "Programming Fundamentals",
      subject: "Computer Science",
      grade: "Grade 11",
      questions: 25,
      duration: "40 minutes",
      totalPoints: 125,
      attempts: 190,
      avgScore: 74,
      passRate: 80,
      difficulty: "Medium",
      status: "active",
      createdBy: "Prof. Michael Tadesse",
      createdAt: "2024-02-10",
      dueDate: "2024-02-20",
      description: "Basic programming concepts and logic",
      tags: ["programming", "fundamentals", "coding"],
      type: "graded",
      shuffleQuestions: true,
      showAnswers: "after_due_date",
      timeLimit: true,
    },
    {
      id: 7,
      title: "History Ancient Civilizations",
      subject: "History",
      grade: "Grade 11",
      questions: 18,
      duration: "35 minutes",
      totalPoints: 90,
      attempts: 150,
      avgScore: 76,
      passRate: 82,
      difficulty: "Medium",
      status: "archived",
      createdBy: "Mr. Yohannes Alemu",
      createdAt: "2024-02-09",
      dueDate: "2024-02-19",
      description: "Ancient Egyptian and Mesopotamian civilizations",
      tags: ["history", "ancient", "civilizations"],
      type: "practice",
      shuffleQuestions: false,
      showAnswers: "immediately",
      timeLimit: false,
    },
    {
      id: 8,
      title: "Geography Capitals Quiz",
      subject: "Geography",
      grade: "Grade 10",
      questions: 10,
      duration: "15 minutes",
      totalPoints: 50,
      attempts: 180,
      avgScore: 88,
      passRate: 94,
      difficulty: "Easy",
      status: "active",
      createdBy: "Mr. Yohannes Alemu",
      createdAt: "2024-02-08",
      dueDate: "2024-02-18",
      description: "World capitals and countries",
      tags: ["geography", "capitals", "countries"],
      type: "practice",
      shuffleQuestions: true,
      showAnswers: "immediately",
      timeLimit: true,
    },
    {
      id: 9,
      title: "PE Sports Rules",
      subject: "Physical Education",
      grade: "Grade 9",
      questions: 12,
      duration: "20 minutes",
      totalPoints: 60,
      attempts: 160,
      avgScore: 85,
      passRate: 90,
      difficulty: "Easy",
      status: "active",
      createdBy: "Mr. Samuel Kebede",
      createdAt: "2024-02-07",
      dueDate: "2024-02-17",
      description: "Rules of various sports and games",
      tags: ["sports", "rules", "pe"],
      type: "practice",
      shuffleQuestions: false,
      showAnswers: "immediately",
      timeLimit: false,
    },
    {
      id: 10,
      title: "Amharic Vocabulary Test",
      subject: "Amharic Language",
      grade: "Grade 9",
      questions: 22,
      duration: "30 minutes",
      totalPoints: 110,
      attempts: 320,
      avgScore: 80,
      passRate: 86,
      difficulty: "Medium",
      status: "active",
      createdBy: "Ms. Alemitu Bekele",
      createdAt: "2024-02-06",
      dueDate: "2024-02-16",
      description: "Amharic vocabulary and word usage",
      tags: ["amharic", "vocabulary", "language"],
      type: "graded",
      shuffleQuestions: true,
      showAnswers: "after_submission",
      timeLimit: true,
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

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
    { value: "archived", label: "Archived" },
    { value: "scheduled", label: "Scheduled" },
  ];

  const difficultyOptions = [
    { value: "all", label: "All Difficulties" },
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "graded", label: "Graded" },
    { value: "practice", label: "Practice" },
    { value: "diagnostic", label: "Diagnostic" },
  ];

  // Statistics
  const quizStats = {
    total: sampleQuizzes.length,
    active: sampleQuizzes.filter((q) => q.status === "active").length,
    totalQuestions: sampleQuizzes.reduce((sum, q) => sum + q.questions, 0),
    totalAttempts: sampleQuizzes.reduce((sum, q) => sum + q.attempts, 0),
    avgScore: Math.round(
      sampleQuizzes.reduce((sum, q) => sum + q.avgScore, 0) /
        sampleQuizzes.length,
    ),
    avgPassRate: Math.round(
      sampleQuizzes.reduce((sum, q) => sum + q.passRate, 0) /
        sampleQuizzes.length,
    ),
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setQuizzes(sampleQuizzes);
      setFilteredQuizzes(sampleQuizzes);
      setLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    let filtered = [...quizzes];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    // Apply subject filter
    if (selectedSubject !== "all") {
      filtered = filtered.filter((quiz) => quiz.subject === selectedSubject);
    }

    // Apply status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((quiz) => quiz.status === selectedStatus);
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (quiz) => quiz.difficulty === selectedDifficulty,
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "attempts":
          return b.attempts - a.attempts;
        case "avgScore":
          return b.avgScore - a.avgScore;
        case "questions":
          return b.questions - a.questions;
        case "date":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredQuizzes(filtered);
  }, [
    searchTerm,
    selectedSubject,
    selectedStatus,
    selectedDifficulty,
    sortBy,
    quizzes,
  ]);

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
      active: "bg-green-100 text-green-800 border border-green-200",
      draft: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      archived: "bg-gray-100 text-gray-800 border border-gray-200",
      scheduled: "bg-blue-100 text-blue-800 border border-blue-200",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  const getTypeBadge = (type) => {
    const styles = {
      graded: "bg-purple-100 text-purple-800",
      practice: "bg-blue-100 text-blue-800",
      diagnostic: "bg-teal-100 text-teal-800",
    };
    return styles[type] || "bg-gray-100 text-gray-800";
  };

  const calculateDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateStatus = (dueDate) => {
    const daysRemaining = calculateDaysRemaining(dueDate);
    if (daysRemaining < 0)
      return { text: "Overdue", color: "text-red-600", bg: "bg-red-100" };
    if (daysRemaining === 0)
      return {
        text: "Due today",
        color: "text-orange-600",
        bg: "bg-orange-100",
      };
    if (daysRemaining <= 3)
      return {
        text: `${daysRemaining} days`,
        color: "text-yellow-600",
        bg: "bg-yellow-100",
      };
    return {
      text: `${daysRemaining} days`,
      color: "text-green-600",
      bg: "bg-green-100",
    };
  };

  const handleSelectQuiz = (id) => {
    if (selectedQuizzes.includes(id)) {
      setSelectedQuizzes(selectedQuizzes.filter((quizId) => quizId !== id));
    } else {
      setSelectedQuizzes([...selectedQuizzes, id]);
    }
  };

  const handleBulkAction = (action) => {
    if (selectedQuizzes.length === 0) return;

    switch (action) {
      case "publish":
        alert(`Publishing ${selectedQuizzes.length} quiz(zes)`);
        break;
      case "archive":
        alert(`Archiving ${selectedQuizzes.length} quiz(zes)`);
        break;
      case "duplicate":
        alert(`Duplicating ${selectedQuizzes.length} quiz(zes)`);
        break;
      case "export":
        alert(`Exporting ${selectedQuizzes.length} quiz(zes)`);
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Quizzes Management
          </h1>
          <p className="text-gray-600">
            Create, manage, and analyze quizzes and assessments
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaPlus /> Create Quiz
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FaDownload /> Export Results
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FaShare /> Share Templates
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Quizzes</p>
              <p className="text-xl font-bold">{quizStats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaClipboardList className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Active Quizzes</p>
              <p className="text-xl font-bold">{quizStats.active}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FaCheckCircle className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Questions</p>
              <p className="text-xl font-bold">{quizStats.totalQuestions}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaQuestionCircle className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Attempts</p>
              <p className="text-xl font-bold">
                {quizStats.totalAttempts.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <FaUsers className="text-orange-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Avg Score</p>
              <p className="text-xl font-bold">{quizStats.avgScore}%</p>
            </div>
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <FaPercentage className="text-teal-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Avg Pass Rate</p>
              <p className="text-xl font-bold">{quizStats.avgPassRate}%</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FaChartLine className="text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedQuizzes.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FaClipboardList className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-800">
                  {selectedQuizzes.length} quiz
                  {selectedQuizzes.length > 1 ? "zes" : ""} selected
                </p>
                <p className="text-sm text-blue-600">
                  Perform actions on selected quizzes
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleBulkAction("publish")}
                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
              >
                <FaCheckCircle /> Publish
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
                <FaPlus /> Duplicate
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
              placeholder="Search quizzes by title, description, or tags..."
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
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusOptions.map((option) => (
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
            <option value="title">Sort by Title</option>
            <option value="attempts">Sort by Attempts</option>
            <option value="avgScore">Sort by Avg Score</option>
            <option value="questions">Sort by Questions</option>
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
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaBrain /> By Difficulty
          </button>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaGraduationCap /> By Type
          </button>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaCalendar /> By Due Date
          </button>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaClock /> By Duration
          </button>
        </div>
      </div>

      {/* Quizzes Table */}
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
                        setSelectedQuizzes(filteredQuizzes.map((q) => q.id));
                      } else {
                        setSelectedQuizzes([]);
                      }
                    }}
                    checked={
                      selectedQuizzes.length === filteredQuizzes.length &&
                      filteredQuizzes.length > 0
                    }
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quiz Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions & Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status & Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredQuizzes.map((quiz) => {
                const dueDateStatus = getDueDateStatus(quiz.dueDate);

                return (
                  <tr key={quiz.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedQuizzes.includes(quiz.id)}
                        onChange={() => handleSelectQuiz(quiz.id)}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {quiz.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {quiz.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm font-medium text-gray-700">
                            {quiz.subject}
                          </span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">
                            {quiz.grade}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {quiz.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <FaGraduationCap className="text-gray-400 text-xs" />
                          <span className="text-xs text-gray-500">
                            Created by: {quiz.createdBy}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Questions:
                            </span>
                            <span className="font-medium">
                              {quiz.questions}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Duration:
                            </span>
                            <span className="font-medium">{quiz.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Total Points:
                            </span>
                            <span className="font-medium">
                              {quiz.totalPoints}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getTypeBadge(quiz.type)}`}
                            >
                              {quiz.type}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getDifficultyBadge(quiz.difficulty)}`}
                            >
                              {quiz.difficulty}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {quiz.timeLimit ? "Timed" : "No time limit"} •{" "}
                            {quiz.shuffleQuestions ? "Shuffled" : "Fixed order"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Attempts:
                            </span>
                            <span className="font-medium">{quiz.attempts}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full"
                              style={{
                                width: `${(quiz.attempts / 500) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Avg Score:
                            </span>
                            <span className="font-medium">
                              {quiz.avgScore}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div
                              className="bg-green-600 h-1.5 rounded-full"
                              style={{ width: `${quiz.avgScore}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Pass Rate:
                            </span>
                            <span className="font-medium">
                              {quiz.passRate}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div
                              className="bg-teal-600 h-1.5 rounded-full"
                              style={{ width: `${quiz.passRate}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-3">
                        <div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(quiz.status)}`}
                          >
                            {quiz.status}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <FaCalendar className="text-gray-400" />
                            <span className="text-sm font-medium">
                              {new Date(quiz.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div
                            className={`px-2 py-1 text-xs rounded-full ${dueDateStatus.bg} ${dueDateStatus.color} mt-1 inline-block`}
                          >
                            {dueDateStatus.text}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Created:{" "}
                          {new Date(quiz.createdAt).toLocaleDateString()}
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
                          <FaPlay /> Launch
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

      {/* Create Quiz Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Create New Quiz
                </h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quiz Title *
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter quiz title"
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
                      Grade Level
                    </label>
                    <select className="w-full border rounded-lg px-3 py-2">
                      <option value="Grade 9">Grade 6</option>
                      <option value="Grade 10">Grade 8</option>

                      <option value="Grade 12">Grade 12</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 h-24"
                    placeholder="Enter quiz description..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Questions
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="e.g., 20"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="e.g., 30"
                      min="1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Points
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="e.g., 100"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty Level
                    </label>
                    <select className="w-full border rounded-lg px-3 py-2">
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quiz Type
                    </label>
                    <select className="w-full border rounded-lg px-3 py-2">
                      <option value="graded">Graded</option>
                      <option value="practice">Practice</option>
                      <option value="diagnostic">Diagnostic</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      Shuffle Questions
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Time Limit</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      Allow Multiple Attempts
                    </span>
                  </label>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Create Quiz
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

export default QuizzesPage;
