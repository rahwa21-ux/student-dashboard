"use client";
import { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import {
  BookOpen,
  CheckCircle,
  ChartLine,
  Video,
  FileText,
} from "lucide-react";

export default function LearningCompassPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedGradeId, setSelectedGradeId] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [filter, setFilter] = useState("All"); // "All" or specific subject

  useEffect(() => {
    // Example data, replace with API
    const data = [
      {
        subject: "Math",
        completed: 75,
        videosWatched: 5,
        videosTotal: 8,
        pdfsRead: 3,
        pdfsTotal: 5,
      },
      {
        subject: "Science",
        completed: 50,
        videosWatched: 3,
        videosTotal: 6,
        pdfsRead: 2,
        pdfsTotal: 4,
      },
      {
        subject: "English",
        completed: 90,
        videosWatched: 8,
        videosTotal: 8,
        pdfsRead: 5,
        pdfsTotal: 5,
      },
      {
        subject: "History",
        completed: 60,
        videosWatched: 4,
        videosTotal: 6,
        pdfsRead: 2,
        pdfsTotal: 4,
      },
    ];
    setProgressData(data);
  }, []);

  const getStrokeOffset = (percentage, radius) => {
    const circumference = 2 * Math.PI * radius;
    return circumference - (percentage / 100) * circumference;
  };

  // Filtered subjects based on selection
  const filteredData =
    filter === "All"
      ? progressData
      : progressData.filter((item) => item.subject === filter);

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Topbar */}
      <Topbar
        setOpen={setSidebarOpen}
        selectedGradeId={selectedGradeId}
        setSelectedGradeId={setSelectedGradeId}
      />

      <main className="pt-16 md:ml-64 p-6 space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Learning Compass
        </h1>
        <p className="text-gray-400 mb-6">
          View detailed analytics of your learning progress for each subject.
        </p>

        {/* Subject Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
          >
            All
          </button>
          {progressData.map((item) => (
            <button
              key={item.subject}
              onClick={() => setFilter(item.subject)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === item.subject
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-200 hover:bg-gray-700"
              }`}
            >
              {item.subject}
            </button>
          ))}
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => {
            const videoPercentage =
              (item.videosWatched / item.videosTotal) * 100;
            const pdfPercentage = (item.pdfsRead / item.pdfsTotal) * 100;
            return (
              <div
                key={item.subject}
                className="bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen size={20} className="text-blue-400" />{" "}
                  {item.subject}
                </h3>

                {/* Video Progress */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <svg width="64" height="64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#374151"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#3B82F6"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={getStrokeOffset(videoPercentage, 28)}
                        strokeLinecap="round"
                        transform="rotate(-90 32 32)"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-100 font-semibold">
                      {Math.round(videoPercentage)}%
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Videos Watched</p>
                    <p className="text-gray-100 font-medium">
                      {item.videosWatched}/{item.videosTotal}
                    </p>
                  </div>
                </div>

                {/* PDF Progress */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16">
                    <svg width="64" height="64">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#374151"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="#10B981"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={getStrokeOffset(pdfPercentage, 28)}
                        strokeLinecap="round"
                        transform="rotate(-90 32 32)"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-gray-100 font-semibold">
                      {Math.round(pdfPercentage)}%
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">PDFs Read</p>
                    <p className="text-gray-100 font-medium">
                      {item.pdfsRead}/{item.pdfsTotal}
                    </p>
                  </div>
                </div>

                {/* Overall Subject Completion */}
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-400" />
                  <p className="text-gray-100 text-sm">
                    Overall Completion:{" "}
                    <span className="font-semibold">{item.completed}%</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Progress Summary */}
        <div className="mt-8 bg-gray-800 rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <ChartLine size={24} className="text-blue-400" />
            <h3 className="text-lg font-semibold">Overall Progress</h3>
          </div>
          <p className="text-gray-300">
            You have completed an average of{" "}
            <span className="text-blue-400 font-semibold">
              {Math.round(
                progressData.reduce((sum, item) => sum + item.completed, 0) /
                  (progressData.length || 1),
              )}
              %
            </span>{" "}
            of your subjects. Keep up the great work!
          </p>
        </div>
      </main>
    </div>
  );
}
