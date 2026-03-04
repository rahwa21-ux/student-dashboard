"use client";

import { useState, useEffect } from "react";
import {
  FaGraduationCap,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaEye,
  FaEnvelope,
  FaPhone,
  FaBook,
  FaChartLine,
  FaUserPlus,
  FaDownload,
  FaSort,
} from "react-icons/fa";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

  const sampleStudents = [
    {
      id: 1,
      name: "Alemayehu Bekele",
      email: "alemayehu@example.com",
      phone: "+251 91 123 4567",
      grade: "Grade 12",
      status: "active",
      enrollmentDate: "2024-01-15",
      coursesEnrolled: 5,
      averageScore: 88,
      attendance: "92%",
      parentName: "Yonas Tadesse",
      parentPhone: "+251 93 345 6789",
    },
    {
      id: 2,
      name: "Mikael Habte",
      email: "mikael@example.com",
      phone: "+251 94 456 7890",
      grade: "Grade 8",
      status: "pending",
      enrollmentDate: "2024-02-01",
      coursesEnrolled: 0,
      averageScore: 0,
      attendance: "0%",
      parentName: "John Doe",
      parentPhone: "+251 99 999 9999",
    },
    {
      id: 3,
      name: "Hanna Solomon",
      email: "hanna@example.com",
      phone: "+251 95 567 8901",
      grade: "Grade 6",
      status: "active",
      enrollmentDate: "2023-12-05",
      coursesEnrolled: 6,
      averageScore: 92,
      attendance: "95%",
      parentName: "Parent Name",
      parentPhone: "+251 98 888 8888",
    },
    // Add more students...
  ];

  const gradeOptions = [
    { value: "all", label: "All Grades" },
    { value: "Grade 6", label: "Grade 6" },
    { value: "Grade 8", label: "Grade 8" },

    { value: "Grade 12", label: "Grade 12" },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setStudents(sampleStudents);
      setLoading(false);
    }, 500);
  }, []);

  const getPerformanceColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Students Management
          </h1>
          <p className="text-gray-600">
            Manage all student accounts and academic progress
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <FaUserPlus /> Enroll Student
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FaDownload /> Export List
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
          >
            {gradeOptions.map((option) => (
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
            <option value="name">Sort by Name</option>
            <option value="grade">Sort by Grade</option>
            <option value="score">Sort by Score</option>
            <option value="enrollment">Sort by Enrollment Date</option>
          </select>
        </div>
      </div>

      {/* Students Grid/List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="bg-white border rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.grade}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  student.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {student.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaEnvelope className="text-gray-400" />
                {student.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FaPhone className="text-gray-400" />
                {student.phone}
              </div>
              <div className="text-sm text-gray-600">
                Parent: {student.parentName} ({student.parentPhone})
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Courses</p>
                <p className="font-bold text-lg">{student.coursesEnrolled}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Avg Score</p>
                <p
                  className={`font-bold text-lg ${getPerformanceColor(student.averageScore)}`}
                >
                  {student.averageScore}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Attendance</p>
                <p className="font-bold text-lg">{student.attendance}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Enrolled</p>
                <p className="font-bold text-sm">
                  {new Date(student.enrollmentDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t">
              <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">
                <FaEye />
              </button>
              <button className="p-2 hover:bg-green-50 rounded-lg text-green-600">
                <FaEdit />
              </button>
              <button className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                <FaTrash />
              </button>
              <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-600">
                <FaChartLine />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsPage;
