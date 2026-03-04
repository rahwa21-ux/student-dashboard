"use client";

import { useState } from "react";
import UserGrowthChart from "@/app/admin/components/UserGrowthChart";
import Link from "next/link";
import {
  FaUsers,
  FaChartLine,
  FaBook,
  FaSchool,
  FaMoneyBill,
  FaDatabase,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaEnvelope,
  FaEdit,
  FaTrash,
  FaEye,
  FaGraduationCap,
  FaBookOpen,
  FaLayerGroup,
  FaFileAlt,
} from "react-icons/fa";

const AdminDashboard = () => {
  const stats = {
    totalUsers: 15432,
    activeUsers: 8321,
    totalRevenue: 2450000,
    pendingApprovals: 24,
  };

  const recentUsers = [
    {
      id: 1,
      name: "Alemayehu Bekele",
      email: "alemayehu@example.com",
      role: "Student",
      grade: "12",
      status: "active",
    },
    {
      id: 2,
      name: "Sara Mohammed",
      email: "sara@example.com",
      role: "Teacher",
      status: "active",
    },
    {
      id: 3,
      name: "Yonas Tadesse",
      email: "yonas@example.com",
      role: "Parent",
      status: "active",
    },
  ];

  const recentActivities = [
    {
      action: "New user registration",
      user: "Mikael Habte",
      time: "2 mins ago",
      type: "user",
    },
    {
      action: "Content uploaded",
      user: "Teacher Sarah",
      time: "15 mins ago",
      type: "content",
    },
  ];

  return (
    <div className="space-y-6 ">
      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border rounded-xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-xl sm:text-2xl font-bold">
                {stats.totalUsers.toLocaleString()}
              </p>
            </div>
            <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaUsers className="text-blue-600 text-lg" />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border rounded-xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-xl sm:text-2xl font-bold">
                {stats.activeUsers.toLocaleString()}
              </p>
            </div>
            <div className="w-11 h-11 bg-green-100 rounded-lg flex items-center justify-center">
              <FaChartLine className="text-green-600 text-lg" />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border rounded-xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-xl sm:text-2xl font-bold">
                ETB {stats.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="w-11 h-11 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaMoneyBill className="text-purple-600 text-lg" />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border rounded-xl p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Pending Approvals</p>
              <p className="text-xl sm:text-2xl font-bold">
                {stats.pendingApprovals}
              </p>
            </div>
            <div className="w-11 h-11 bg-orange-100 rounded-lg flex items-center justify-center">
              <FaExclamationTriangle className="text-orange-600 text-lg" />
            </div>
          </div>
        </div>
      </div>
      {/* ================= CHART ================= */}

      <div className="bg-white border rounded-xl p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">User Growth</h2>
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
        <UserGrowthChart />
      </div>

      {/* ================= GRID SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white border rounded-xl">
          <div className="p-5 border-b flex justify-between items-center">
            <h2 className="font-bold text-lg">Recent Activities</h2>
            <Link href="#" className="text-green-600 text-sm">
              View All →
            </Link>
          </div>

          <div className="p-5 space-y-4">
            {recentActivities.map((activity, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-lg hover:bg-gray-50"
              >
                <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <FaUsers />
                </div>
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border rounded-xl p-6">
          <h2 className="font-bold text-lg mb-4">Quick Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="bg-green-50 border rounded-xl p-4 flex flex-col items-center">
              <FaGraduationCap className="text-green-600 text-xl" />
              <span className="font-medium">Add Grade</span>
            </button>

            <button className="bg-blue-50 border rounded-xl p-4 flex flex-col items-center">
              <FaBookOpen className="text-blue-600 text-xl" />
              <span className="font-medium">Add Subject</span>
            </button>

            <button className="bg-purple-50 border rounded-xl p-4 flex flex-col items-center">
              <FaLayerGroup className="text-purple-600 text-xl" />
              <span className="font-medium">Create Chapter</span>
            </button>

            <button className="bg-orange-50 border rounded-xl p-4 flex flex-col items-center">
              <FaFileAlt className="text-orange-600 text-xl" />
              <span className="font-medium">Create Quiz</span>
            </button>
          </div>
        </div>
      </div>
      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </td>

                  <td className="px-4 py-3">{user.role}</td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      {user.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 flex gap-3">
                    <FaEye className="text-blue-600 cursor-pointer" />
                    <FaEdit className="text-green-600 cursor-pointer" />
                    <FaTrash className="text-red-600 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
