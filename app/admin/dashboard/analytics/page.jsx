"use client";

import { useState, useEffect } from "react";
import {
  FaChartLine,
  FaUsers,
  FaEye,
  FaClock,
  FaMoneyBill,
  FaBook,
  FaGraduationCap,
  FaFilter,
  FaDownload,
  FaCalendar,
  FaUserCheck,
  FaVideo,
  FaFileAlt,
  FaChartBar,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaDesktop,
  FaTabletAlt,
  FaPercentage,
  FaCertificate,
  FaComments,
  FaStar,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("30days");
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);

  // Key Performance Indicators
  const kpis = {
    engagementRate: { value: "68%", change: "+12%", target: "70%" },
    completionRate: { value: "72%", change: "+8%", target: "75%" },
    avgScore: { value: "84/100", change: "+5%", target: "85/100" },
    retentionRate: { value: "89%", change: "+4%", target: "90%" },
    satisfactionScore: { value: "4.7/5", change: "+0.3", target: "4.8/5" },
    activeInstructors: { value: "42", change: "+15%", target: "45" },
  };

  // Enrollment Data for Chart
  const enrollmentData = [
    { month: "Jan", students: 1200, teachers: 45, courses: 12 },
    { month: "Feb", students: 1450, teachers: 52, courses: 15 },
    { month: "Mar", students: 1650, teachers: 58, courses: 18 },
    { month: "Apr", students: 1820, teachers: 62, courses: 22 },
    { month: "May", students: 2100, teachers: 68, courses: 25 },
    { month: "Jun", students: 2350, teachers: 72, courses: 28 },
    { month: "Jul", students: 2580, teachers: 78, courses: 30 },
  ];

  // Course Performance Data
  const coursePerformance = [
    {
      course: "Mathematics Grade 6",
      enrollments: 450,
      completion: 78,
      avgScore: 82,
    },
    {
      course: "Physics Grade 8",
      enrollments: 380,
      completion: 72,
      avgScore: 79,
    },
    {
      course: "Chemistry Grade 12",
      enrollments: 320,
      completion: 85,
      avgScore: 88,
    },
    {
      course: "Biology Grade 12",
      enrollments: 290,
      completion: 68,
      avgScore: 76,
    },
    {
      course: "English Grade 6",
      enrollments: 410,
      completion: 82,
      avgScore: 85,
    },
    {
      course: "History Grade 8",
      enrollments: 260,
      completion: 74,
      avgScore: 80,
    },
  ];

  // Geographic Distribution
  const geographicData = [
    { region: "Addis Ababa", students: 1850, percentage: 35 },
    { region: "Oromia", students: 1250, percentage: 24 },
    { region: "Amhara", students: 980, percentage: 19 },
    { region: "SNNPR", students: 650, percentage: 12 },
    { region: "Tigray", students: 320, percentage: 6 },
    { region: "Other", students: 250, percentage: 4 },
  ];

  // Device Usage
  const deviceData = [
    { name: "Mobile", value: 62, color: "#3B82F6" },
    { name: "Desktop", value: 32, color: "#10B981" },
    { name: "Tablet", value: 6, color: "#8B5CF6" },
  ];

  // Traffic Sources
  const trafficData = [
    { source: "Direct", value: 35, color: "#6366F1" },
    { source: "Google", value: 28, color: "#EC4899" },
    { source: "Social Media", value: 22, color: "#F59E0B" },
    { source: "Referral", value: 15, color: "#10B981" },
  ];

  // Learning Activity Timeline
  const activityData = [
    { time: "6 AM", activity: 120 },
    { time: "9 AM", activity: 450 },
    { time: "12 PM", activity: 320 },
    { time: "3 PM", activity: 580 },
    { time: "6 PM", activity: 720 },
    { time: "9 PM", activity: 380 },
    { time: "12 AM", activity: 150 },
  ];

  // Top Performing Students
  const topStudents = [
    {
      id: 1,
      name: "Mikael Tekle",
      grade: "Grade 12",
      avgScore: 96,
      completed: 8,
    },
    {
      id: 2,
      name: "Sara Mohammed",
      grade: "Grade 11",
      avgScore: 94,
      completed: 7,
    },
    {
      id: 3,
      name: "Yonas Tadesse",
      grade: "Grade 10",
      avgScore: 92,
      completed: 6,
    },
    {
      id: 4,
      name: "Hanna Solomon",
      grade: "Grade 12",
      avgScore: 91,
      completed: 8,
    },
    {
      id: 5,
      name: "Daniel Bekele",
      grade: "Grade 11",
      avgScore: 90,
      completed: 7,
    },
  ];

  // Content Performance
  const contentPerformance = [
    {
      type: "Video Lectures",
      views: 12500,
      avgWatchTime: "18m",
      completion: 72,
    },
    { type: "PDF Documents", views: 8900, avgReadTime: "12m", completion: 65 },
    { type: "Quizzes", attempts: 5600, avgScore: 78, completion: 82 },
    { type: "Assignments", submissions: 4200, avgScore: 84, completion: 76 },
    {
      type: "Live Sessions",
      attendance: 3100,
      avgDuration: "45m",
      satisfaction: 4.5,
    },
  ];

  // Assessment Analytics
  const assessmentData = [
    { assessment: "Mid-term Exam", avgScore: 75, passRate: 68, students: 450 },
    { assessment: "Final Exam", avgScore: 72, passRate: 65, students: 420 },
    { assessment: "Quiz 1", avgScore: 82, passRate: 78, students: 480 },
    { assessment: "Quiz 2", avgScore: 79, passRate: 74, students: 460 },
    { assessment: "Assignment 1", avgScore: 85, passRate: 81, students: 470 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Learning Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive insights into platform performance and learning
            outcomes
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            {["7days", "30days", "90days", "year"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-md text-sm capitalize transition-colors ${
                  timeRange === range
                    ? "bg-white shadow border border-gray-300"
                    : "hover:bg-gray-200"
                }`}
              >
                {range.replace("days", " Days").replace("year", "Year")}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FaDownload /> Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <FaFilter /> Filter Data
          </button>
        </div>
      </div>

      {/* Analytics Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-4 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: <FaChartLine /> },
            { id: "engagement", label: "Engagement", icon: <FaUsers /> },
            {
              id: "performance",
              label: "Performance",
              icon: <FaGraduationCap />,
            },
            { id: "content", label: "Content", icon: <FaBook /> },
            { id: "revenue", label: "Revenue", icon: <FaMoneyBill /> },
            { id: "geographic", label: "Geographic", icon: <FaMapMarkerAlt /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 bg-blue-50"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          {
            title: "Engagement Rate",
            value: kpis.engagementRate.value,
            change: kpis.engagementRate.change,
            target: `Target: ${kpis.engagementRate.target}`,
            icon: <FaPercentage className="text-blue-600" />,
            color: "blue",
          },
          {
            title: "Course Completion",
            value: kpis.completionRate.value,
            change: kpis.completionRate.change,
            target: `Target: ${kpis.completionRate.target}`,
            icon: <FaCertificate className="text-green-600" />,
            color: "green",
          },
          {
            title: "Average Score",
            value: kpis.avgScore.value,
            change: kpis.avgScore.change,
            target: `Target: ${kpis.avgScore.target}`,
            icon: <FaStar className="text-purple-600" />,
            color: "purple",
          },
          {
            title: "Retention Rate",
            value: kpis.retentionRate.value,
            change: kpis.retentionRate.change,
            target: `Target: ${kpis.retentionRate.target}`,
            icon: <FaUserCheck className="text-orange-600" />,
            color: "orange",
          },
          {
            title: "Satisfaction Score",
            value: kpis.satisfactionScore.value,
            change: kpis.satisfactionScore.change,
            target: `Target: ${kpis.satisfactionScore.target}`,
            icon: <FaComments className="text-pink-600" />,
            color: "pink",
          },
          {
            title: "Active Instructors",
            value: kpis.activeInstructors.value,
            change: kpis.activeInstructors.change,
            target: `Target: ${kpis.activeInstructors.target}`,
            icon: <FaUsers className="text-teal-600" />,
            color: "teal",
          },
        ].map((kpi, index) => (
          <div key={index} className="bg-white border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-gray-500">{kpi.title}</p>
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
              </div>
              <div className={`p-2 rounded-lg bg-${kpi.color}-50`}>
                {kpi.icon}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span
                className={`text-sm ${kpi.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
              >
                {kpi.change}
              </span>
              <span className="text-xs text-gray-500">{kpi.target}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Growth Chart */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              Enrollment Growth
            </h2>
            <div className="text-sm text-gray-500">
              Total:{" "}
              {enrollmentData
                .reduce((sum, month) => sum + month.students, 0)
                .toLocaleString()}{" "}
              students
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.2}
                  name="Students"
                />
                <Area
                  type="monotone"
                  dataKey="teachers"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.2}
                  name="Teachers"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Performance Chart */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">
              Course Performance
            </h2>
            <select className="border rounded-lg px-3 py-1.5 text-sm">
              <option>By Completion Rate</option>
              <option>By Average Score</option>
              <option>By Enrollment</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coursePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="course"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="enrollments" name="Enrollments" fill="#6366F1" />
                <Bar dataKey="completion" name="Completion %" fill="#10B981" />
                <Bar dataKey="avgScore" name="Avg Score" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Geographic Distribution */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Geographic Distribution
          </h2>
          <div className="space-y-4">
            {geographicData.map((region, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-400" />
                    {region.region}
                  </span>
                  <span>
                    {region.percentage}% ({region.students.toLocaleString()})
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${region.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Usage */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Device Usage</h2>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            {deviceData.map((device, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: device.color }}
                ></div>
                <span className="text-sm">
                  {device.name} ({device.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Activity Timeline */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Learning Activity Timeline
          </h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="activity"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Active Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Peak learning hours: 6 PM - 9 PM
          </div>
        </div>
      </div>

      {/* Assessment Analytics */}
      <div className="bg-white border rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">
              Assessment Analytics
            </h2>
            <button className="text-blue-600 text-sm hover:text-blue-700">
              View Detailed Report →
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assessment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pass Rate
                </th>
                <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assessmentData.map((assessment, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {assessment.assessment}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="font-bold text-gray-900">
                        {assessment.avgScore}/100
                      </span>
                      <div className="ml-2 w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-green-600"
                          style={{ width: `${assessment.avgScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        assessment.passRate >= 75
                          ? "bg-green-100 text-green-800"
                          : assessment.passRate >= 60
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {assessment.passRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {assessment.students.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {index % 3 === 0
                      ? "📈 Improving"
                      : index % 3 === 1
                        ? "📊 Stable"
                        : "📉 Declining"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Students */}
        <div className="bg-white border rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">
                Top Performing Students
              </h2>
              <button className="text-blue-600 text-sm hover:text-blue-700">
                View All →
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {student.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {student.grade} • {student.completed} courses completed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      {student.avgScore}/100
                    </div>
                    <div className="text-sm text-green-600">Top 5%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Performance */}
        <div className="bg-white border rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">
                Content Performance
              </h2>
              <button className="text-blue-600 text-sm hover:text-blue-700">
                View Details →
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {contentPerformance.map((content, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        index === 0
                          ? "bg-blue-100 text-blue-600"
                          : index === 1
                            ? "bg-green-100 text-green-600"
                            : index === 2
                              ? "bg-purple-100 text-purple-600"
                              : index === 3
                                ? "bg-orange-100 text-orange-600"
                                : "bg-pink-100 text-pink-600"
                      }`}
                    >
                      {index === 0 ? (
                        <FaVideo />
                      ) : index === 1 ? (
                        <FaFileAlt />
                      ) : index === 2 ? (
                        <FaBook />
                      ) : index === 3 ? (
                        <FaGraduationCap />
                      ) : (
                        <FaComments />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {content.type}
                      </p>
                      {content.views && (
                        <p className="text-sm text-gray-500">
                          {content.views.toLocaleString()} views
                        </p>
                      )}
                      {content.attempts && (
                        <p className="text-sm text-gray-500">
                          {content.attempts.toLocaleString()} attempts
                        </p>
                      )}
                      {content.submissions && (
                        <p className="text-sm text-gray-500">
                          {content.submissions.toLocaleString()} submissions
                        </p>
                      )}
                      {content.attendance && (
                        <p className="text-sm text-gray-500">
                          {content.attendance.toLocaleString()} attended
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      {content.completion}%
                    </div>
                    <div className="text-sm text-gray-500">
                      {content.avgWatchTime ||
                        content.avgReadTime ||
                        content.avgScore ||
                        content.avgDuration ||
                        content.satisfaction}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaChartBar /> Insights & Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border">
            <h3 className="font-bold text-gray-800 mb-2">📈 Positive Trends</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Student engagement increased by 12% this month
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Mobile usage growing (62% of total traffic)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Video lectures have highest completion rate (72%)
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <h3 className="font-bold text-gray-800 mb-2">
              ⚠️ Areas for Improvement
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Biology Grade 12 has lowest completion rate (68%)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Tigray region has low enrollment (6% of total)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Tablet usage declined by 15% from last quarter
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 bg-white rounded-lg p-4 border">
          <h3 className="font-bold text-gray-800 mb-2">🎯 Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="font-medium">Targeted Content</p>
              <p className="text-gray-600">
                Create more video content for Biology Grade 12
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="font-medium">Regional Campaign</p>
              <p className="text-gray-600">
                Launch marketing campaign in Tigray region
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="font-medium">Mobile Optimization</p>
              <p className="text-gray-600">
                Improve mobile app features based on user feedback
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
