"use client";

import { useState, useEffect } from "react";
import {
  FaChalkboardTeacher,
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
  FaCalendar,
  FaStar,
  FaUserCheck,
  FaUserTimes,
  FaGraduationCap,
  FaFileAlt,
  FaVideo,
  FaUsers,
  FaMoneyBill,
  FaClock,
} from "react-icons/fa";
import { FiUserX, FiUserCheck } from "react-icons/fi";
import { MdOutlineRateReview, MdSubject } from "react-icons/md";

const InstructorsPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [selectedInstructors, setSelectedInstructors] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data for instructors
  const sampleInstructors = [
    {
      id: 1,
      name: "Dr. Sara Mohammed",
      email: "sara@example.com",
      phone: "+251 92 234 5678",
      title: "PhD in Mathematics",
      subjects: ["Mathematics", "Physics", "Calculus"],
      coursesTaught: 8,
      totalStudents: 450,
      rating: 4.8,
      reviews: 124,
      status: "active",
      joinDate: "2023-11-20",
      lastActive: "2024-02-15",
      salary: "ETB 25,000",
      availability: "Full-time",
      expertise: ["Advanced Mathematics", "Physics", "Statistics"],
      qualifications: ["PhD Mathematics", "MSc Physics", "BSc Education"],
      bio: "Experienced mathematics instructor with 10+ years of teaching experience. Specialized in advanced calculus and physics.",
      profileImage: "SM",
    },
    {
      id: 2,
      name: "Prof. Daniel Bekele",
      email: "daniel@example.com",
      phone: "+251 96 678 9012",
      title: "MSc in Chemistry",
      subjects: ["Chemistry", "Biology"],
      coursesTaught: 4,
      totalStudents: 320,
      rating: 4.5,
      reviews: 89,
      status: "inactive",
      joinDate: "2023-10-15",
      lastActive: "2024-01-20",
      salary: "ETB 20,000",
      availability: "Part-time",
      expertise: ["Organic Chemistry", "Biochemistry"],
      qualifications: ["MSc Chemistry", "BSc Biology"],
      bio: "Chemistry specialist with focus on organic chemistry and laboratory techniques.",
      profileImage: "DB",
    },
    {
      id: 3,
      name: "Teacher Sarah Johnson",
      email: "sarah@example.com",
      phone: "+251 98 890 1234",
      title: "MA in English Literature",
      subjects: ["English", "History", "Literature"],
      coursesTaught: 7,
      totalStudents: 380,
      rating: 4.9,
      reviews: 156,
      status: "active",
      joinDate: "2023-11-30",
      lastActive: "2024-02-15",
      salary: "ETB 22,000",
      availability: "Full-time",
      expertise: ["English Grammar", "Creative Writing", "History"],
      qualifications: ["MA English", "BA Education"],
      bio: "Passionate English teacher with expertise in literature and creative writing.",
      profileImage: "SJ",
    },
    {
      id: 4,
      name: "Dr. Michael Tadesse",
      email: "michael@example.com",
      phone: "+251 91 111 2233",
      title: "PhD in Computer Science",
      subjects: ["Computer Science", "Programming", "IT"],
      coursesTaught: 6,
      totalStudents: 280,
      rating: 4.7,
      reviews: 95,
      status: "active",
      joinDate: "2024-01-10",
      lastActive: "2024-02-14",
      salary: "ETB 30,000",
      availability: "Full-time",
      expertise: ["Python Programming", "Web Development", "AI Basics"],
      qualifications: ["PhD Computer Science", "MSc IT"],
      bio: "Computer science expert with industry experience in software development.",
      profileImage: "MT",
    },
    {
      id: 5,
      name: "Ms. Hanna Solomon",
      email: "hanna@example.com",
      phone: "+251 93 333 4444",
      title: "MSc in Physics",
      subjects: ["Physics", "Mathematics"],
      coursesTaught: 5,
      totalStudents: 310,
      rating: 4.6,
      reviews: 78,
      status: "pending",
      joinDate: "2024-02-01",
      lastActive: "Never",
      salary: "ETB 18,000",
      availability: "Part-time",
      expertise: ["Classical Physics", "Mechanics"],
      qualifications: ["MSc Physics", "BSc Education"],
      bio: "Physics teacher with focus on practical applications and experiments.",
      profileImage: "HS",
    },
    {
      id: 6,
      name: "Mr. Yohannes Alemu",
      email: "yohannes@example.com",
      phone: "+251 94 555 6666",
      title: "BA in History",
      subjects: ["History", "Geography", "Civics"],
      coursesTaught: 3,
      totalStudents: 210,
      rating: 4.4,
      reviews: 56,
      status: "active",
      joinDate: "2023-12-15",
      lastActive: "2024-02-13",
      salary: "ETB 16,000",
      availability: "Full-time",
      expertise: ["World History", "Ethiopian History", "Geography"],
      qualifications: ["BA History", "Teaching Certificate"],
      bio: "History teacher with focus on Ethiopian and world history.",
      profileImage: "YA",
    },
    {
      id: 7,
      name: "Dr. Elizabeth Wondimu",
      email: "elizabeth@example.com",
      phone: "+251 97 777 8888",
      title: "PhD in Biology",
      subjects: ["Biology", "Chemistry", "Health Science"],
      coursesTaught: 9,
      totalStudents: 520,
      rating: 4.9,
      reviews: 198,
      status: "active",
      joinDate: "2023-09-01",
      lastActive: "2024-02-15",
      salary: "ETB 28,000",
      availability: "Full-time",
      expertise: ["Genetics", "Microbiology", "Anatomy"],
      qualifications: ["PhD Biology", "MSc Chemistry"],
      bio: "Biology expert with research background in genetics and microbiology.",
      profileImage: "EW",
    },
    {
      id: 8,
      name: "Mr. Samuel Kebede",
      email: "samuel@example.com",
      phone: "+251 99 999 0000",
      title: "BSc in Physical Education",
      subjects: ["Physical Education", "Health"],
      coursesTaught: 2,
      totalStudents: 180,
      rating: 4.3,
      reviews: 42,
      status: "suspended",
      joinDate: "2023-11-10",
      lastActive: "2024-01-05",
      salary: "ETB 14,000",
      availability: "Part-time",
      expertise: ["Sports Science", "Fitness Training"],
      qualifications: ["BSc Physical Education"],
      bio: "Physical education teacher with focus on fitness and sports.",
      profileImage: "SK",
    },
  ];

  const subjectOptions = [
    { value: "all", label: "All Subjects" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
    { value: "English", label: "English" },
    { value: "History", label: "History" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Geography", label: "Geography" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending Approval" },
    { value: "suspended", label: "Suspended" },
    { value: "on-leave", label: "On Leave" },
  ];

  const availabilityOptions = [
    { value: "all", label: "All Availability" },
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "remote", label: "Remote" },
  ];

  // Statistics
  const instructorStats = {
    total: sampleInstructors.length,
    active: sampleInstructors.filter((i) => i.status === "active").length,
    pending: sampleInstructors.filter((i) => i.status === "pending").length,
    onLeave: sampleInstructors.filter((i) => i.status === "on-leave").length,
    fullTime: sampleInstructors.filter((i) => i.availability === "Full-time")
      .length,
    totalCourses: sampleInstructors.reduce(
      (sum, i) => sum + i.coursesTaught,
      0,
    ),
    totalStudents: sampleInstructors.reduce(
      (sum, i) => sum + i.totalStudents,
      0,
    ),
    avgRating: (
      sampleInstructors.reduce((sum, i) => sum + i.rating, 0) /
      sampleInstructors.length
    ).toFixed(1),
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setInstructors(sampleInstructors);
      setFilteredInstructors(sampleInstructors);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let filtered = [...instructors];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (instructor) =>
          instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          instructor.phone.includes(searchTerm) ||
          instructor.subjects.some((subject) =>
            subject.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    // Apply subject filter
    if (selectedSubject !== "all") {
      filtered = filtered.filter((instructor) =>
        instructor.subjects.includes(selectedSubject),
      );
    }

    // Apply status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (instructor) => instructor.status === selectedStatus,
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "courses":
          return b.coursesTaught - a.coursesTaught;
        case "students":
          return b.totalStudents - a.totalStudents;
        case "date":
          return new Date(b.joinDate) - new Date(a.joinDate);
        default:
          return 0;
      }
    });

    setFilteredInstructors(filtered);
  }, [searchTerm, selectedSubject, selectedStatus, sortBy, instructors]);

  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800 border border-green-200",
      inactive: "bg-gray-100 text-gray-800 border border-gray-200",
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      suspended: "bg-red-100 text-red-800 border border-red-200",
      "on-leave": "bg-blue-100 text-blue-800 border border-blue-200",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  const getAvailabilityBadge = (availability) => {
    const styles = {
      "Full-time": "bg-purple-100 text-purple-800",
      "Part-time": "bg-indigo-100 text-indigo-800",
      Contract: "bg-pink-100 text-pink-800",
      Remote: "bg-teal-100 text-teal-800",
    };
    return styles[availability] || "bg-gray-100 text-gray-800";
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-600";
    if (rating >= 4.0) return "text-yellow-600";
    if (rating >= 3.0) return "text-orange-600";
    return "text-red-600";
  };

  const handleSelectInstructor = (id) => {
    if (selectedInstructors.includes(id)) {
      setSelectedInstructors(
        selectedInstructors.filter((instructorId) => instructorId !== id),
      );
    } else {
      setSelectedInstructors([...selectedInstructors, id]);
    }
  };

  const handleBulkAction = (action) => {
    if (selectedInstructors.length === 0) return;

    switch (action) {
      case "approve":
        alert(`Approving ${selectedInstructors.length} instructor(s)`);
        break;
      case "activate":
        alert(`Activating ${selectedInstructors.length} instructor(s)`);
        break;
      case "deactivate":
        alert(`Deactivating ${selectedInstructors.length} instructor(s)`);
        break;
      case "export":
        alert(`Exporting ${selectedInstructors.length} instructor(s)`);
        break;
      case "message":
        alert(`Sending message to ${selectedInstructors.length} instructor(s)`);
        break;
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-sm ${
            i <= Math.floor(rating)
              ? "text-yellow-400"
              : i <= rating
                ? "text-yellow-300"
                : "text-gray-300"
          }`}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading instructors...</p>
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
            Instructors Management
          </h1>
          <p className="text-gray-600">
            Manage all instructors, their courses, and teaching assignments
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaUserPlus /> Add New Instructor
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FaDownload /> Export List
          </button>
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "bg-white"}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "bg-white"}`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="bg-white border rounded-xl p-3">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-xl font-bold">{instructorStats.total}</p>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-3">
          <div className="text-center">
            <p className="text-sm text-green-600">Active</p>
            <p className="text-xl font-bold text-green-700">
              {instructorStats.active}
            </p>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
          <div className="text-center">
            <p className="text-sm text-yellow-600">Pending</p>
            <p className="text-xl font-bold text-yellow-700">
              {instructorStats.pending}
            </p>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
          <div className="text-center">
            <p className="text-sm text-blue-600">Full-time</p>
            <p className="text-xl font-bold text-blue-700">
              {instructorStats.fullTime}
            </p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-3">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Courses</p>
            <p className="text-xl font-bold">{instructorStats.totalCourses}</p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-3">
          <div className="text-center">
            <p className="text-sm text-gray-500">Students</p>
            <p className="text-xl font-bold">
              {instructorStats.totalStudents.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-3">
          <div className="text-center">
            <p className="text-sm text-gray-500">Avg Rating</p>
            <p className="text-xl font-bold">{instructorStats.avgRating}</p>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-3">
          <div className="text-center">
            <p className="text-sm text-gray-500">On Leave</p>
            <p className="text-xl font-bold">{instructorStats.onLeave}</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white border rounded-xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or subject..."
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
            <option value="name">Sort by Name</option>
            <option value="rating">Sort by Rating</option>
            <option value="courses">Sort by Courses</option>
            <option value="students">Sort by Students</option>
            <option value="date">Sort by Join Date</option>
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaFilter /> More Filters
          </button>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaCalendar /> Schedule View
          </button>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <MdSubject /> By Subject
          </button>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaClock /> Availability
          </button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedInstructors.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FaChalkboardTeacher className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-blue-800">
                  {selectedInstructors.length} instructor
                  {selectedInstructors.length > 1 ? "s" : ""} selected
                </p>
                <p className="text-sm text-blue-600">
                  Choose an action to perform on selected instructors
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleBulkAction("approve")}
                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
              >
                <FiUserCheck /> Approve
              </button>
              <button
                onClick={() => handleBulkAction("activate")}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
              >
                <FaUserCheck /> Activate
              </button>
              <button
                onClick={() => handleBulkAction("deactivate")}
                className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm flex items-center gap-2"
              >
                <FaUserTimes /> Deactivate
              </button>
              <button
                onClick={() => handleBulkAction("message")}
                className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center gap-2"
              >
                <FaEnvelope /> Message
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

      {/* Instructors Grid/List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstructors.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {instructor.profileImage}
                    </div>
                    {instructor.status === "active" && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {instructor.name}
                    </h3>
                    <p className="text-sm text-gray-500">{instructor.title}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(instructor.status)}`}
                  >
                    {instructor.status}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getAvailabilityBadge(instructor.availability)}`}
                  >
                    {instructor.availability}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaEnvelope className="text-gray-400" />
                  <span className="truncate">{instructor.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaPhone className="text-gray-400" />
                  {instructor.phone}
                </div>
              </div>

              {/* Subjects */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaBook className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Subjects
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {instructor.subjects.map((subject, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-500">Courses</p>
                  <p className="font-bold text-lg">
                    {instructor.coursesTaught}
                  </p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <p className="text-xs text-gray-500">Students</p>
                  <p className="font-bold text-lg">
                    {instructor.totalStudents.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded-lg">
                  <p className="text-xs text-gray-500">Rating</p>
                  <div className="flex items-center justify-center gap-1">
                    <span
                      className={`font-bold text-lg ${getRatingColor(instructor.rating)}`}
                    >
                      {instructor.rating}
                    </span>
                    <div className="flex">{renderStars(instructor.rating)}</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {instructor.reviews} reviews
                  </p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-500">Salary</p>
                  <p className="font-bold text-sm">{instructor.salary}</p>
                </div>
              </div>

              {/* Bio Preview */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {instructor.bio}
                </p>
              </div>

              {/* Actions */}
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
                <button className="p-2 hover:bg-purple-50 rounded-lg text-purple-600">
                  <FaChartLine />
                </button>
                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-600">
                  <FaEnvelope />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subjects
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInstructors.map((instructor) => (
                  <tr key={instructor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          {instructor.profileImage}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {instructor.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {instructor.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <FaEnvelope className="text-gray-400 text-xs" />
                            <p className="text-xs text-gray-500">
                              {instructor.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {instructor.subjects.slice(0, 3).map((subject, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {subject}
                          </span>
                        ))}
                        {instructor.subjects.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{instructor.subjects.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-700">
                            Courses: {instructor.coursesTaught}
                          </span>
                          <span className="text-sm text-gray-700">
                            Students: {instructor.totalStudents}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {renderStars(instructor.rating)}
                          </div>
                          <span
                            className={`text-sm font-medium ${getRatingColor(instructor.rating)}`}
                          >
                            {instructor.rating}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({instructor.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(instructor.status)}`}
                        >
                          {instructor.status}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getAvailabilityBadge(instructor.availability)}`}
                        >
                          {instructor.availability}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-700">
                          Joined:{" "}
                          {new Date(instructor.joinDate).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-700">
                          Last active:{" "}
                          {instructor.lastActive === "Never"
                            ? "Never"
                            : new Date(
                                instructor.lastActive,
                              ).toLocaleDateString()}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {instructor.salary}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-blue-50 rounded text-blue-600">
                          <FaEye />
                        </button>
                        <button className="p-1.5 hover:bg-green-50 rounded text-green-600">
                          <FaEdit />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded text-red-600">
                          <FaTrash />
                        </button>
                        <button className="p-1.5 hover:bg-purple-50 rounded text-purple-600">
                          <FaEnvelope />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Instructor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Add New Instructor
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter instructor name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subjects
                  </label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    multiple
                  >
                    {subjectOptions.slice(1).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Hold Ctrl/Cmd to select multiple subjects
                  </p>
                </div>
                <div className="flex gap-4 pt-4">
                  <button className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add Instructor
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

export default InstructorsPage;
