"use client";
import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaBell,
  FaPalette,
  FaShieldAlt,
  FaLanguage,
  FaMoon,
  FaSun,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaUpload,
  FaTrash,
  FaDownload,
  FaGlobe,
  FaVolumeUp,
  FaEnvelope,
  FaMobileAlt,
} from "react-icons/fa";
import DashboardLayout from "@/app/student/components/DashboardLayout";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weeklyReport: true,
    assignmentReminders: true,
    gradeNotifications: true,
    studyReminders: false,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showOnlineStatus: true,
    showActivity: true,
    allowMessages: "followers",
    dataSharing: true,
  });
  const [formData, setFormData] = useState({
    name: " your name",
    email: "your email",
    phone: "phone number",
    bio: "about your self",
    location: "your location",
    language: "your language",
    timezone: "your time zone",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Settings tabs
  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "account", label: "Account", icon: <FaLock /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
    { id: "appearance", label: "Appearance", icon: <FaPalette /> },
    { id: "privacy", label: "Privacy", icon: <FaShieldAlt /> },
    { id: "preferences", label: "Preferences", icon: <FaLanguage /> },
  ];

  // Language options
  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
    { value: "japanese", label: "Japanese" },
  ];

  // Timezone options
  const timezones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Europe/Paris", label: "Paris (CET)" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  ];

  // Theme options
  const themes = [
    {
      id: "light",
      label: "Light",
      icon: <FaSun />,
      description: "Default light theme",
    },
    {
      id: "dark",
      label: "Dark",
      icon: <FaMoon />,
      description: "Dark mode for night studying",
    },
    {
      id: "system",
      label: "System",
      icon: <FaGlobe />,
      description: "Follow system settings",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key, value) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  const handleThemeChange = (themeId) => {
    setTheme(themeId);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    alert("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleExportData = () => {
    alert("Your data will be exported and sent to your email.");
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      alert(
        "Account deletion scheduled. You'll receive an email confirmation.",
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="lg:w-64">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`${activeTab === tab.id ? "text-indigo-600" : "text-gray-500"}`}
                    >
                      {tab.icon}
                    </span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Account Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Account Actions
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={handleExportData}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    <FaDownload /> Export My Data
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <FaTrash /> Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Profile Information
                  </h2>
                  <button
                    onClick={handleSaveProfile}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200"
                  >
                    <FaSave /> Save Changes
                  </button>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                        RG
                      </div>
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-2 shadow-sm hover:bg-gray-50"
                      >
                        <FaUpload size={14} />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Profile Photo
                      </h3>
                      <p className="text-sm text-gray-600">
                        JPG, PNG or GIF, max 2MB
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </form>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-6">
                {/* Change Password */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Change Password
                  </h2>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    {[
                      {
                        label: "Current Password",
                        name: "currentPassword",
                        field: "current",
                      },
                      {
                        label: "New Password",
                        name: "newPassword",
                        field: "new",
                      },
                      {
                        label: "Confirm New Password",
                        name: "confirmPassword",
                        field: "confirm",
                      },
                    ].map((item) => (
                      <div key={item.name}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {item.label}
                        </label>
                        <div className="relative">
                          <input
                            type={
                              showPasswords[item.field] ? "text" : "password"
                            }
                            name={item.name}
                            value={passwordData[item.name]}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(item.field)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPasswords[item.field] ? (
                              <FaEyeSlash />
                            ) : (
                              <FaEye />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Update Password
                    </button>
                  </form>
                </div>

                {/* Connected Accounts */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Connected Accounts
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Google",
                        email: "rahwa@gmail.com",
                        connected: true,
                      },
                      { name: "GitHub", email: "rahwa", connected: true },
                      {
                        name: "Microsoft",
                        email: "rahwa@gmail.com",
                        connected: false,
                      },
                    ].map((account) => (
                      <div
                        key={account.name}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-gray-900">
                            {account.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            {account.email}
                          </div>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-lg font-medium ${
                            account.connected
                              ? "bg-red-50 text-red-600 hover:bg-red-100"
                              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                          } transition-colors duration-200`}
                        >
                          {account.connected ? "Disconnect" : "Connect"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Notification Preferences
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Notification Channels
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "email",
                          label: "Email Notifications",
                          icon: <FaEnvelope />,
                          description: "Receive notifications via email",
                        },
                        {
                          key: "push",
                          label: "Push Notifications",
                          icon: <FaMobileAlt />,
                          description:
                            "Receive push notifications on your device",
                        },
                        {
                          key: "sms",
                          label: "SMS Notifications",
                          icon: <FaMobileAlt />,
                          description: "Receive text message notifications",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-3 rounded-lg ${notifications[item.key] ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}
                            >
                              {item.icon}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {item.label}
                              </div>
                              <div className="text-sm text-gray-600">
                                {item.description}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleNotification(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                              notifications[item.key]
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                notifications[item.key]
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Notification Types
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "weeklyReport",
                          label: "Weekly Progress Report",
                        },
                        {
                          key: "assignmentReminders",
                          label: "Assignment Reminders",
                        },
                        {
                          key: "gradeNotifications",
                          label: "Grade Notifications",
                        },
                        { key: "studyReminders", label: "Study Reminders" },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-700">{item.label}</span>
                          <button
                            onClick={() => toggleNotification(item.key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                              notifications[item.key]
                                ? "bg-indigo-500"
                                : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                notifications[item.key]
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "appearance" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Appearance Settings
                </h2>

                {/* Theme Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Theme
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {themes.map((themeOption) => (
                      <button
                        key={themeOption.id}
                        onClick={() => handleThemeChange(themeOption.id)}
                        className={`p-4 border-2 rounded-xl text-left transition-all duration-200 ${
                          theme === themeOption.id
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`p-2 rounded-lg ${
                              theme === themeOption.id
                                ? "bg-indigo-100 text-indigo-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {themeOption.icon}
                          </div>
                          <span className="font-medium text-gray-900">
                            {themeOption.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {themeOption.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Font Size
                  </h3>
                  <div className="flex items-center justify-between max-w-md">
                    <span className="text-sm text-gray-600">Small</span>
                    <div className="flex-1 mx-4">
                      <input
                        type="range"
                        min="12"
                        max="18"
                        defaultValue="14"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <span className="text-sm text-gray-600">Large</span>
                  </div>
                </div>

                {/* Display Density */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Display Density
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {["Comfortable", "Compact", "Spacious"].map((density) => (
                      <button
                        key={density}
                        className={`px-4 py-2 rounded-lg border ${
                          density === "Comfortable"
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {density}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Privacy Settings
                </h2>
                <div className="space-y-6">
                  {/* Privacy Options */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Privacy Options
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          key: "showOnlineStatus",
                          label: "Show Online Status",
                        },
                        {
                          key: "showActivity",
                          label: "Show Learning Activity",
                        },
                        {
                          key: "dataSharing",
                          label: "Allow Data Sharing for Research",
                        },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium text-gray-900">
                              {item.label}
                            </div>
                            <div className="text-sm text-gray-600">
                              {item.key === "dataSharing"
                                ? "Help improve our platform with anonymous data"
                                : "Allow others to see your status and activity"}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              togglePrivacy(item.key, !privacy[item.key])
                            }
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                              privacy[item.key]
                                ? "bg-indigo-500"
                                : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                privacy[item.key]
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-6">
                {/* Language & Region */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Language & Region
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {languages.map((lang) => (
                          <option key={lang.value} value={lang.value}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {timezones.map((tz) => (
                          <option key={tz.value} value={tz.value}>
                            {tz.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Audio Preferences */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Audio Preferences
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          Sound Effects Volume
                        </label>
                        <span className="text-sm text-gray-600">75%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="75"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          Video Volume
                        </label>
                        <span className="text-sm text-gray-600">85%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="85"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">
                          Mute All Sounds
                        </div>
                        <div className="text-sm text-gray-600">
                          Turn off all audio notifications
                        </div>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors duration-300">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Study Preferences */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Study Preferences
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Study Session Duration
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>25 minutes (Pomodoro)</option>
                        <option>45 minutes (Standard)</option>
                        <option>60 minutes (Extended)</option>
                        <option>90 minutes (Deep Focus)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Break Duration
                      </label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>5 minutes</option>
                        <option>10 minutes</option>
                        <option>15 minutes</option>
                        <option>20 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
