"use client";

import { useState, useEffect } from "react";
import {
  FaImage,
  FaVideo,
  FaFilePdf,
  FaFileAlt,
  FaMusic,
  FaArchive,
  FaSearch,
  FaFilter,
  FaDownload,
  FaTrash,
  FaEye,
  FaShare,
  FaPlus,
  FaSort,
  FaFolder,
  FaClock,
  FaUser,
  FaTags,
  FaExternalLinkAlt,
} from "react-icons/fa";

const MediaLibraryPage = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [selectedItems, setSelectedItems] = useState([]);

  // Mock data for media library
  const sampleMedia = [
    {
      id: 1,
      name: "Algebra Introduction Video",
      type: "video",
      format: "mp4",
      size: "45.2 MB",
      uploadedBy: "Dr. Sara Mohammed",
      uploadDate: "2024-02-15",
      lastAccessed: "2024-02-18",
      subject: "Mathematics",
      grade: "Grade 10",
      duration: "45:30",
      thumbnail: "📹",
      views: 450,
      downloads: 120,
      tags: ["algebra", "introduction", "video"],
    },
    {
      id: 2,
      name: "Physics Formula Sheet",
      type: "document",
      format: "pdf",
      size: "3.8 MB",
      uploadedBy: "Prof. Michael Tadesse",
      uploadDate: "2024-02-14",
      lastAccessed: "2024-02-17",
      subject: "Physics",
      grade: "Grade 11",
      pages: 12,
      thumbnail: "📄",
      views: 380,
      downloads: 210,
      tags: ["formulas", "reference", "physics"],
    },
    {
      id: 3,
      name: "Chemistry Lab Safety",
      type: "image",
      format: "jpg",
      size: "2.1 MB",
      uploadedBy: "Dr. Elizabeth Wondimu",
      uploadDate: "2024-02-13",
      lastAccessed: "2024-02-16",
      subject: "Chemistry",
      grade: "Grade 10",
      dimensions: "1920x1080",
      thumbnail: "🖼️",
      views: 420,
      downloads: 95,
      tags: ["safety", "lab", "chemistry"],
    },
    {
      id: 4,
      name: "Biology Cell Structure 3D Model",
      type: "interactive",
      format: "glb",
      size: "18.5 MB",
      uploadedBy: "Dr. Elizabeth Wondimu",
      uploadDate: "2024-02-12",
      lastAccessed: "2024-02-15",
      subject: "Biology",
      grade: "Grade 12",
      thumbnail: "🎮",
      views: 320,
      downloads: 85,
      tags: ["3d", "cell", "biology"],
    },
    {
      id: 5,
      name: "English Grammar Rules",
      type: "document",
      format: "docx",
      size: "1.8 MB",
      uploadedBy: "Teacher Sarah Johnson",
      uploadDate: "2024-02-11",
      lastAccessed: "2024-02-14",
      subject: "English Language",
      grade: "Grade 9",
      pages: 8,
      thumbnail: "📝",
      views: 510,
      downloads: 180,
      tags: ["grammar", "rules", "english"],
    },
    {
      id: 6,
      name: "Programming Tutorial",
      type: "video",
      format: "mp4",
      size: "120.5 MB",
      uploadedBy: "Prof. Michael Tadesse",
      uploadDate: "2024-02-10",
      lastAccessed: "2024-02-13",
      subject: "Computer Science",
      grade: "Grade 11",
      duration: "60:15",
      thumbnail: "💻",
      views: 280,
      downloads: 75,
      tags: ["programming", "tutorial", "python"],
    },
    {
      id: 7,
      name: "Ancient Egypt Presentation",
      type: "presentation",
      format: "pptx",
      size: "15.3 MB",
      uploadedBy: "Mr. Yohannes Alemu",
      uploadDate: "2024-02-09",
      lastAccessed: "2024-02-12",
      subject: "History",
      grade: "Grade 11",
      slides: 25,
      thumbnail: "📊",
      views: 190,
      downloads: 60,
      tags: ["history", "egypt", "presentation"],
    },
    {
      id: 8,
      name: "World Map High Resolution",
      type: "image",
      format: "png",
      size: "8.7 MB",
      uploadedBy: "Mr. Yohannes Alemu",
      uploadDate: "2024-02-08",
      lastAccessed: "2024-02-11",
      subject: "Geography",
      grade: "Grade 10",
      dimensions: "3840x2160",
      thumbnail: "🗺️",
      views: 210,
      downloads: 90,
      tags: ["map", "world", "geography"],
    },
    {
      id: 9,
      name: "Exercise Demonstration Video",
      type: "video",
      format: "mov",
      size: "85.6 MB",
      uploadedBy: "Mr. Samuel Kebede",
      uploadDate: "2024-02-07",
      lastAccessed: "2024-02-10",
      subject: "Physical Education",
      grade: "Grade 9",
      duration: "35:45",
      thumbnail: "🏃",
      views: 180,
      downloads: 50,
      tags: ["exercise", "fitness", "pe"],
    },
    {
      id: 10,
      name: "Amharic Alphabet Audio",
      type: "audio",
      format: "mp3",
      size: "12.3 MB",
      uploadedBy: "Ms. Alemitu Bekele",
      uploadDate: "2024-02-06",
      lastAccessed: "2024-02-09",
      subject: "Amharic Language",
      grade: "Grade 9",
      duration: "28:20",
      thumbnail: "🎵",
      views: 350,
      downloads: 110,
      tags: ["audio", "amharic", "alphabet"],
    },
    {
      id: 11,
      name: "Mathematics Quiz Template",
      type: "document",
      format: "pdf",
      size: "2.5 MB",
      uploadedBy: "Dr. Sara Mohammed",
      uploadDate: "2024-02-05",
      lastAccessed: "2024-02-08",
      subject: "Mathematics",
      grade: "Grade 10",
      pages: 6,
      thumbnail: "📋",
      views: 280,
      downloads: 95,
      tags: ["quiz", "template", "mathematics"],
    },
    {
      id: 12,
      name: "Science Experiments Compilation",
      type: "video",
      format: "mp4",
      size: "250.8 MB",
      uploadedBy: "Prof. Michael Tadesse",
      uploadDate: "2024-02-04",
      lastAccessed: "2024-02-07",
      subject: "Physics",
      grade: "Grade 11",
      duration: "120:30",
      thumbnail: "🔬",
      views: 320,
      downloads: 85,
      tags: ["experiments", "science", "compilation"],
    },
  ];

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "video", label: "Video" },
    { value: "image", label: "Image" },
    { value: "document", label: "Document" },
    { value: "audio", label: "Audio" },
    { value: "presentation", label: "Presentation" },
    { value: "interactive", label: "Interactive" },
    { value: "archive", label: "Archive" },
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

  const sortOptions = [
    { value: "date", label: "Upload Date" },
    { value: "name", label: "Name" },
    { value: "size", label: "Size" },
    { value: "views", label: "Views" },
    { value: "downloads", label: "Downloads" },
  ];

  // Statistics
  const mediaStats = {
    total: sampleMedia.length,
    totalSize: "550.8 MB",
    videos: sampleMedia.filter((m) => m.type === "video").length,
    images: sampleMedia.filter((m) => m.type === "image").length,
    documents: sampleMedia.filter((m) => m.type === "document").length,
    totalViews: sampleMedia.reduce((sum, m) => sum + m.views, 0),
    totalDownloads: sampleMedia.reduce((sum, m) => sum + m.downloads, 0),
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setMediaItems(sampleMedia);
      setFilteredMedia(sampleMedia);
      setLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    let filtered = [...mediaItems];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((item) => item.type === selectedType);
    }

    // Apply subject filter
    if (selectedSubject !== "all") {
      filtered = filtered.filter((item) => item.subject === selectedSubject);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "size":
          return parseFloat(b.size) - parseFloat(a.size);
        case "views":
          return b.views - a.views;
        case "downloads":
          return b.downloads - a.downloads;
        case "date":
        default:
          return new Date(b.uploadDate) - new Date(a.uploadDate);
      }
    });

    setFilteredMedia(filtered);
  }, [searchTerm, selectedType, selectedSubject, sortBy, mediaItems]);

  const getTypeIcon = (type) => {
    const icons = {
      video: <FaVideo className="text-red-500" />,
      image: <FaImage className="text-blue-500" />,
      document: <FaFilePdf className="text-green-500" />,
      audio: <FaMusic className="text-purple-500" />,
      presentation: <FaFileAlt className="text-orange-500" />,
      interactive: <FaArchive className="text-teal-500" />,
      archive: <FaArchive className="text-gray-500" />,
    };
    return icons[type] || <FaFileAlt className="text-gray-500" />;
  };

  const getTypeBadge = (type) => {
    const styles = {
      video: "bg-red-100 text-red-800",
      image: "bg-blue-100 text-blue-800",
      document: "bg-green-100 text-green-800",
      audio: "bg-purple-100 text-purple-800",
      presentation: "bg-orange-100 text-orange-800",
      interactive: "bg-teal-100 text-teal-800",
      archive: "bg-gray-100 text-gray-800",
    };
    return styles[type] || "bg-gray-100 text-gray-800";
  };

  const formatFileSize = (size) => {
    return size;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading media library...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Media Library</h1>
          <p className="text-gray-600">
            Manage all educational media files, videos, documents, and resources
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <FaPlus /> Upload Media
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FaFolder /> Create Folder
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FaDownload /> Bulk Download
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Files</p>
              <p className="text-xl font-bold">{mediaStats.total}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaArchive className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Size</p>
              <p className="text-xl font-bold">{mediaStats.totalSize}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FaFolder className="text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Videos</p>
              <p className="text-xl font-bold">{mediaStats.videos}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <FaVideo className="text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Images</p>
              <p className="text-xl font-bold">{mediaStats.images}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaImage className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-xl font-bold">
                {mediaStats.totalViews.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FaEye className="text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Downloads</p>
              <p className="text-xl font-bold">
                {mediaStats.totalDownloads.toLocaleString()}
              </p>
            </div>
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <FaDownload className="text-teal-600" />
            </div>
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
              placeholder="Search files by name or tags..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaTags /> By Tags
          </button>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaUser /> By Uploader
          </button>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaClock /> Recent
          </button>
          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <FaFilter /> Advanced
          </button>
        </div>
      </div>

      {/* Media Grid/List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Media Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  {item.thumbnail}
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 hover:bg-gray-100 rounded">
                    <FaEye className="text-gray-500" />
                  </button>
                  <button className="p-1.5 hover:bg-gray-100 rounded">
                    <FaDownload className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Media Info */}
              <div className="mb-3">
                <h3 className="font-medium text-gray-800 truncate">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getTypeBadge(item.type)}`}
                  >
                    {item.type.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">{item.format}</span>
                </div>
              </div>

              {/* Media Details */}
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className="font-medium">{item.size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subject:</span>
                  <span className="font-medium">{item.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span>Grade:</span>
                  <span className="font-medium">{item.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span>Uploaded by:</span>
                  <span className="font-medium">{item.uploadedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span>Upload date:</span>
                  <span className="font-medium">
                    {formatDate(item.uploadDate)}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between mb-4">
                <div className="text-center">
                  <div className="font-bold text-gray-800">{item.views}</div>
                  <div className="text-xs text-gray-500">Views</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-800">
                    {item.downloads}
                  </div>
                  <div className="text-xs text-gray-500">Downloads</div>
                </div>
                {item.duration && (
                  <div className="text-center">
                    <div className="font-bold text-gray-800">
                      {item.duration}
                    </div>
                    <div className="text-xs text-gray-500">Duration</div>
                  </div>
                )}
                {item.pages && (
                  <div className="text-center">
                    <div className="font-bold text-gray-800">{item.pages}</div>
                    <div className="text-xs text-gray-500">Pages</div>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{item.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4 border-t">
                <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">
                  <FaEye />
                </button>
                <button className="p-2 hover:bg-green-50 rounded-lg text-green-600">
                  <FaDownload />
                </button>
                <button className="p-2 hover:bg-purple-50 rounded-lg text-purple-600">
                  <FaShare />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                  <FaTrash />
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
                    File
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMedia.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl mr-3">
                          {item.thumbnail}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${getTypeBadge(item.type)}`}
                            >
                              {item.type}
                            </span>
                            <span className="text-xs text-gray-500">
                              {item.format} • {item.size}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.tags.slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-900">
                          {item.subject} • {item.grade}
                        </p>
                        <p className="text-sm text-gray-500">
                          Uploaded by: {item.uploadedBy}
                        </p>
                        <p className="text-sm text-gray-500">
                          Date: {formatDate(item.uploadDate)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Last accessed: {formatDate(item.lastAccessed)}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Views:</span>
                          <span className="font-medium">{item.views}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Downloads:
                          </span>
                          <span className="font-medium">{item.downloads}</span>
                        </div>
                        {item.duration && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Duration:
                            </span>
                            <span className="font-medium">{item.duration}</span>
                          </div>
                        )}
                        {item.pages && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              Pages:
                            </span>
                            <span className="font-medium">{item.pages}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center gap-2 justify-center">
                          <FaEye /> Preview
                        </button>
                        <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-2 justify-center">
                          <FaDownload /> Download
                        </button>
                        <button className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 flex items-center gap-2 justify-center">
                          <FaShare /> Share
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
    </div>
  );
};

export default MediaLibraryPage;
