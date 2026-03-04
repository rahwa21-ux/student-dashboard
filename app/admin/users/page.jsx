"use client";

import { useState, useEffect } from "react";
import {
  FaUsers,
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaEye,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaUserCheck,
  FaUserTimes,
  FaDownload,
  FaUpload,
  FaUserPlus,
  FaCog,
} from "react-icons/fa";

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const usersPerPage = 10;

  // Sample user data - in real app, this would come from API
  const sampleUsers = [
    {
      id: 1,
      name: "Alemayehu Bekele",
      email: "alemayehu@example.com",
      phone: "+251 91 123 4567",
      role: "student",
      status: "active",
      joinDate: "2024-01-15",
      lastLogin: "2024-02-15",
      courses: 5,
      grade: "Grade 12",
    },
    {
      id: 2,
      name: "Sara Mohammed",
      email: "sara@example.com",
      phone: "+251 92 234 5678",
      role: "instructor",
      status: "active",
      joinDate: "2023-11-20",
      lastLogin: "2024-02-14",
      courses: 8,
      subjects: ["Mathematics", "Physics"],
    },
    {
      id: 3,
      name: "Yonas Tadesse",
      email: "yonas@example.com",
      phone: "+251 93 345 6789",
      role: "parent",
      status: "active",
      joinDate: "2024-01-10",
      lastLogin: "2024-02-13",
      children: ["Mikael Habte", "Hanna Solomon"],
    },
    {
      id: 4,
      name: "Mikael Habte",
      email: "mikael@example.com",
      phone: "+251 94 456 7890",
      role: "student",
      status: "pending",
      joinDate: "2024-02-01",
      lastLogin: "Never",
      courses: 0,
      grade: "Grade 8",
    },
    {
      id: 5,
      name: "Hanna Solomon",
      email: "hanna@example.com",
      phone: "+251 95 567 8901",
      role: "student",
      status: "active",
      joinDate: "2023-12-05",
      lastLogin: "2024-02-14",
      courses: 6,
      grade: "Grade 6",
    },
    {
      id: 6,
      name: "Daniel Bekele",
      email: "daniel@example.com",
      phone: "+251 96 678 9012",
      role: "instructor",
      status: "inactive",
      joinDate: "2023-10-15",
      lastLogin: "2024-01-20",
      courses: 4,
      subjects: ["Chemistry", "Biology"],
    },
    {
      id: 7,
      name: "Admin User",
      email: "admin@kuraz.edu",
      phone: "+251 97 789 0123",
      role: "admin",
      status: "active",
      joinDate: "2023-09-01",
      lastLogin: "2024-02-15",
      permissions: "Super Admin",
    },
    {
      id: 8,
      name: "Teacher Sarah",
      email: "sarah@example.com",
      phone: "+251 98 890 1234",
      role: "instructor",
      status: "active",
      joinDate: "2023-11-30",
      lastLogin: "2024-02-15",
      courses: 7,
      subjects: ["English", "History"],
    },
    {
      id: 9,
      name: "Parent John",
      email: "john@example.com",
      phone: "+251 99 901 2345",
      role: "parent",
      status: "active",
      joinDate: "2024-01-20",
      lastLogin: "2024-02-12",
      children: ["Alemayehu Bekele"],
    },
    {
      id: 10,
      name: "Test Student",
      email: "test@example.com",
      phone: "+251 90 012 3456",
      role: "student",
      status: "suspended",
      joinDate: "2024-01-25",
      lastLogin: "2024-02-10",
      courses: 2,
      grade: "Grade 8",
    },
  ];

  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "student", label: "Students" },
    { value: "instructor", label: "Instructors" },
    { value: "parent", label: "Parents" },
    { value: "admin", label: "Administrators" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "suspended", label: "Suspended" },
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setUsers(sampleUsers);
      setFilteredUsers(sampleUsers);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.includes(searchTerm),
      );
    }

    // Apply role filter
    if (selectedRole !== "all") {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }

    // Apply status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter((user) => user.status === selectedStatus);
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedRole, selectedStatus, users]);

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const getRoleBadge = (role) => {
    const colors = {
      student: "bg-blue-100 text-blue-800",
      instructor: "bg-green-100 text-green-800",
      parent: "bg-purple-100 text-purple-800",
      admin: "bg-red-100 text-red-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      pending: "bg-yellow-100 text-yellow-800",
      suspended: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(currentUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) return;

    switch (action) {
      case "activate":
        // API call to activate users
        alert(`Activating ${selectedUsers.length} users`);
        break;
      case "deactivate":
        // API call to deactivate users
        alert(`Deactivating ${selectedUsers.length} users`);
        break;
      case "delete":
        if (
          confirm(
            `Are you sure you want to delete ${selectedUsers.length} users?`,
          )
        ) {
          // API call to delete users
          alert(`Deleting ${selectedUsers.length} users`);
        }
        break;
      case "export":
        // Export selected users
        alert(`Exporting ${selectedUsers.length} users`);
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">All Users</h1>
          <p className="text-gray-600">
            Manage all users in the system ({filteredUsers.length} total users)
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <FaUserPlus /> Add New User
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FaUpload /> Bulk Import
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FaDownload /> Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-xl font-bold">{users.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaUsers className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-xl font-bold">
                {users.filter((u) => u.status === "active").length}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FaUserCheck className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Pending Approval</p>
              <p className="text-xl font-bold">
                {users.filter((u) => u.status === "pending").length}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FaCalendar className="text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Inactive Users</p>
              <p className="text-xl font-bold">
                {users.filter((u) => u.status === "inactive").length}
              </p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <FaUserTimes className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border rounded-xl p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or phone..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roleOptions.map((option) => (
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
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <FaFilter /> More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-blue-800">
                {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""}{" "}
                selected
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleBulkAction("activate")}
                className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction("deactivate")}
                className="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Deactivate
              </button>
              <button
                onClick={() => handleBulkAction("export")}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Export Selected
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    onChange={handleSelectAll}
                    checked={
                      selectedUsers.length === currentUsers.length &&
                      currentUsers.length > 0
                    }
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
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
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <FaEnvelope className="text-gray-400 text-xs" />
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <FaPhone className="text-gray-400 text-xs" />
                          <p className="text-sm text-gray-500">{user.phone}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${getRoleBadge(user.role)}`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                    {user.grade && (
                      <p className="text-xs text-gray-500 mt-1">{user.grade}</p>
                    )}
                    {user.subjects && (
                      <p className="text-xs text-gray-500 mt-1">
                        {user.subjects.join(", ")}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${getStatusBadge(user.status)}`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Joined: {new Date(user.joinDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">
                      {user.lastLogin === "Never"
                        ? "Never"
                        : new Date(user.lastLogin).toLocaleDateString()}
                    </p>
                    {user.lastLogin !== "Never" && (
                      <p className="text-xs text-gray-500">
                        {new Date(user.lastLogin).toLocaleTimeString()}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "student" && (
                      <p className="text-sm text-gray-900">
                        Enrolled in {user.courses} course
                        {user.courses !== 1 ? "s" : ""}
                      </p>
                    )}
                    {user.role === "instructor" && (
                      <p className="text-sm text-gray-900">
                        Teaching {user.courses} course
                        {user.courses !== 1 ? "s" : ""}
                      </p>
                    )}
                    {user.role === "parent" && (
                      <p className="text-sm text-gray-900">
                        {user.children.length} child
                        {user.children.length !== 1 ? "ren" : ""}
                      </p>
                    )}
                    {user.role === "admin" && (
                      <p className="text-sm text-gray-900">
                        {user.permissions}
                      </p>
                    )}
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
                      <button className="p-1.5 hover:bg-gray-50 rounded text-gray-600">
                        <FaCog />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastUser, filteredUsers.length)}
                </span>{" "}
                of <span className="font-medium">{filteredUsers.length}</span>{" "}
                users
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 border rounded-lg ${
                      currentPage === page
                        ? "bg-blue-600 text-white border-blue-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsersPage;
