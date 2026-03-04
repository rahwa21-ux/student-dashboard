"use client";
import React, { useState } from "react";
import {
  FaPlay,
  FaPause,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaEllipsisV,
  FaTrash,
  FaEdit,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaPlus,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/student/components/DashboardLayout";
const assignmentsData = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Calculus Homework",
    due: "Tomorrow 10:00 AM",
    status: "Pending",
    progress: 35,
    color: "#4F46E5",
    priority: "High",
    description: "Complete Chapter 5 exercises",
    estimatedTime: "2 hours",
    isActive: false,
    timer: 0,
    completed: false,
  },
  {
    id: 2,
    subject: "Biology",
    title: "Lab Report",
    due: "Dec 15, 2:00 PM",
    status: "In Progress",
    progress: 60,
    color: "#10B981",
    priority: "Medium",
    description: "Write lab report for experiment 3",
    estimatedTime: "3 hours",
    isActive: false,
    timer: 0,
    completed: false,
  },
  {
    id: 3,
    subject: "Economics",
    title: "Market Analysis",
    due: "Dec 18, 11:00 AM",
    status: "Completed",
    progress: 100,
    color: "#F59E0B",
    priority: "Low",
    description: "Analyze current market trends",
    estimatedTime: "4 hours",
    isActive: false,
    timer: 0,
    completed: true,
  },
  {
    id: 4,
    subject: "Physics",
    title: "Quantum Mechanics Quiz",
    due: "Today 3:00 PM",
    status: "Pending",
    progress: 25,
    color: "#8B5CF6",
    priority: "High",
    description: "Prepare for quiz on quantum mechanics",
    estimatedTime: "1 hour",
    isActive: false,
    timer: 0,
    completed: false,
  },
  {
    id: 5,
    subject: "Chemistry",
    title: "Organic Compounds Assignment",
    due: "Dec 17, 9:00 AM",
    status: "In Progress",
    progress: 75,
    color: "#EF4444",
    priority: "Medium",
    description: "Study organic compounds naming",
    estimatedTime: "5 hours",
    isActive: false,
    timer: 0,
    completed: false,
  },
  {
    id: 6,
    subject: "English",
    title: "Shakespeare Essay",
    due: "Dec 20, 4:00 PM",
    status: "Pending",
    progress: 10,
    color: "#06B6D4",
    priority: "Medium",
    description: "Write essay on Macbeth",
    estimatedTime: "6 hours",
    isActive: false,
    timer: 0,
    completed: false,
  },
];

const Assignments = () => {
  const [assignments, setAssignments] = useState(assignmentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTimer, setActiveTimer] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const router = useRouter();

  // Filter assignments based on search and status
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || assignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Timer functions
  const startTimer = (id) => {
    if (activeTimer && activeTimer !== id) {
      // Pause the currently active timer
      const updatedAssignments = assignments.map((assignment) => {
        if (assignment.id === activeTimer) {
          return { ...assignment, isActive: false };
        }
        return assignment;
      });
      setAssignments(updatedAssignments);
      clearInterval(timerInterval);
    }

    // Start new timer
    setActiveTimer(id);
    const interval = setInterval(() => {
      setAssignments((prev) =>
        prev.map((assignment) => {
          if (assignment.id === id && assignment.isActive) {
            const newTimer = assignment.timer + 1;
            const progress = Math.min(100, Math.floor((newTimer / 60) * 100));
            return {
              ...assignment,
              timer: newTimer,
              progress:
                progress > assignment.progress ? progress : assignment.progress,
              status: "In Progress",
            };
          }
          return assignment;
        }),
      );
    }, 1000);

    setTimerInterval(interval);

    // Update assignment state
    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id === id) {
          return { ...assignment, isActive: true, status: "In Progress" };
        }
        return assignment;
      }),
    );
  };

  const pauseTimer = (id) => {
    clearInterval(timerInterval);
    setActiveTimer(null);
    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id === id) {
          return { ...assignment, isActive: false };
        }
        return assignment;
      }),
    );
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const markAsComplete = (id) => {
    setAssignments((prev) =>
      prev.map((assignment) => {
        if (assignment.id === id) {
          return {
            ...assignment,
            completed: true,
            progress: 100,
            status: "Completed",
            isActive: false,
          };
        }
        return assignment;
      }),
    );

    if (activeTimer === id) {
      clearInterval(timerInterval);
      setActiveTimer(null);
    }
  };

  const deleteAssignment = (id) => {
    setAssignments((prev) => prev.filter((assignment) => assignment.id !== id));
    if (activeTimer === id) {
      clearInterval(timerInterval);
      setActiveTimer(null);
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Assignments
          </h1>
          <p className="text-gray-600 mt-2">
            Track all your tasks & deadlines in one place.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3">
            <FaFilter className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="outline-none bg-transparent text-gray-700"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignments.length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FaChartLine className="text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {assignments.filter((a) => a.status === "Pending").length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <FaClock className="text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-green-600">
                  {assignments.filter((a) => a.status === "In Progress").length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FaPlay className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {assignments.filter((a) => a.status === "Completed").length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <FaCheckCircle className="text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className={`bg-white rounded-xl border-2 ${
                assignment.isActive
                  ? "border-green-500 shadow-lg"
                  : "border-gray-200"
              } p-5 shadow-sm hover:shadow-md transition-all duration-200`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: assignment.color }}
                  >
                    {assignment.subject.charAt(0)}
                  </div>
                  <div>
                    <div
                      className="font-semibold text-sm"
                      style={{ color: assignment.color }}
                    >
                      {assignment.subject}
                    </div>
                    <div
                      className={`text-xs px-2 py-0.5 rounded-full mt-1 ${getPriorityClass(assignment.priority)}`}
                    >
                      {assignment.priority} Priority
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border ${getStatusClass(assignment.status)}`}
                  >
                    {assignment.status}
                  </span>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === assignment.id ? null : assignment.id,
                        )
                      }
                      className="p-1.5 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                      <FaEllipsisV />
                    </button>

                    {expandedId === assignment.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                        <button
                          onClick={() => {
                            // Edit functionality
                            setExpandedId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <FaEdit className="text-blue-600" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteAssignment(assignment.id);
                            setExpandedId(null);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {assignment.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {assignment.description}
              </p>

              {/* Due Date & Time */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <FaCalendarAlt className="text-gray-400" />
                <span className="font-medium">Due:</span> {assignment.due}
                {assignment.estimatedTime && (
                  <span className="ml-4 font-medium">Est:</span>
                )}
                {assignment.estimatedTime && (
                  <span> {assignment.estimatedTime}</span>
                )}
              </div>

              {/* Timer Display for Active Assignment */}
              {assignment.isActive && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-700">
                      Time spent:
                    </span>
                    <span className="text-lg font-bold text-green-700">
                      {formatTime(assignment.timer)}
                    </span>
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    Timer is running...
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              <div className="mb-5">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Progress</span>
                  <span
                    className="font-medium"
                    style={{ color: assignment.color }}
                  >
                    {assignment.progress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${assignment.progress}%`,
                      backgroundColor: assignment.color,
                    }}
                  />
                </div>
              </div>

              {/* Card Footer - Action Buttons */}
              <div className="flex justify-between gap-3">
                {/* Start/Pause Button */}
                {!assignment.completed ? (
                  assignment.isActive ? (
                    <button
                      onClick={() => pauseTimer(assignment.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                    >
                      <FaPause /> Pause
                    </button>
                  ) : (
                    <button
                      onClick={() => startTimer(assignment.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                    >
                      <FaPlay /> Start Now
                    </button>
                  )
                ) : (
                  <button
                    className="flex-1 bg-gray-100 text-gray-600 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2"
                    disabled
                  >
                    <FaCheckCircle /> Completed
                  </button>
                )}

                {/* Details Button */}
                <button
                  onClick={() => router.push(`/assignments/${assignment.id}`)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAssignments.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              {searchTerm ? "No assignments found" : "No assignments yet"}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              {searchTerm
                ? `No assignments match "${searchTerm}". Try a different search term.`
                : "Create your first assignment to get started."}
            </p>
          </div>
        )}

        {/* Active Timer Notice */}
        {activeTimer && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-xl shadow-lg z-50">
            <div className="flex items-center gap-3">
              <div className="animate-pulse">
                <FaPlay />
              </div>
              <div>
                <p className="font-medium">Timer is running</p>
                <p className="text-sm opacity-90">Working on assignment</p>
              </div>
              <button
                onClick={() => pauseTimer(activeTimer)}
                className="ml-4 bg-white text-green-600 px-3 py-1 rounded-lg text-sm font-medium"
              >
                Pause
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Assignments;
