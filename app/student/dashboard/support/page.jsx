"use client";
import React, { useState } from "react";
import {
  FaHeadphones,
  FaQuestionCircle,
  FaComments,
  FaBook,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaUsers,
  FaVideo,
  FaDownload,
  FaSearch,
  FaPaperPlane,
} from "react-icons/fa";
import DashboardLayout from "@/app/student/components/DashboardLayout";

const Support = () => {
  const [activeTab, setActiveTab] = useState("contact");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("General");

  // FAQ data
  const faqData = [
    {
      id: 1,
      question: "How do I reset my password?",
      answer:
        "Go to Settings > Account > Security and click 'Reset Password'. You'll receive an email with instructions to create a new password.",
      category: "Account",
    },
    {
      id: 2,
      question: "Can I download my course materials?",
      answer:
        "Yes! Most course materials are downloadable. Go to the course page and click the download icon next to each resource. Some materials may have download limits.",
      category: "Courses",
    },
    {
      id: 3,
      question: "How do I join a study group?",
      answer:
        "Visit the 'Study Groups' section in your dashboard, browse available groups, and click 'Join Group'. You can also create your own study group.",
      category: "Community",
    },
    {
      id: 4,
      question: "What should I do if I can't access a course?",
      answer:
        "First, try refreshing the page. If the issue persists, check your internet connection and clear your browser cache. If still having issues, contact support.",
      category: "Technical",
    },
    {
      id: 5,
      question: "How are assignments graded?",
      answer:
        "Assignments are typically graded within 3-5 business days. Some auto-graded quizzes are instant. You'll receive notifications when grades are available.",
      category: "Assignments",
    },
    {
      id: 6,
      question: "Can I change my enrolled courses?",
      answer:
        "Yes, during the add/drop period. Go to 'My Courses' and use the 'Change Course' option. After the deadline, contact academic advisors for assistance.",
      category: "Courses",
    },
  ];

  // Support options
  const supportOptions = [
    {
      id: 1,
      title: "Live Chat",
      description: "Chat with a support agent in real-time",
      icon: <FaComments className="text-blue-500" size={24} />,
      action: "Start Chat",
      color: "bg-blue-50 border-blue-200",
      available: true,
    },
    {
      id: 2,
      title: "Email Support",
      description: "Send us an email and get response within 24 hours",
      icon: <FaEnvelope className="text-green-500" size={24} />,
      action: "Send Email",
      color: "bg-green-50 border-green-200",
      available: true,
    },
    {
      id: 3,
      title: "Phone Support",
      description: "Call our support line for immediate assistance",
      icon: <FaPhone className="text-purple-500" size={24} />,
      action: "Call Now",
      color: "bg-purple-50 border-purple-200",
      available: true,
    },
    {
      id: 4,
      title: "Video Tutorials",
      description: "Watch step-by-step video guides and tutorials",
      icon: <FaVideo className="text-red-500" size={24} />,
      action: "Browse Videos",
      color: "bg-red-50 border-red-200",
      available: true,
    },
  ];

  // Quick resources
  const quickResources = [
    { id: 1, title: "User Guide", icon: "📚", link: "#" },
    { id: 2, title: "Video Tutorials", icon: "🎬", link: "#" },
    { id: 3, title: "System Requirements", icon: "💻", link: "#" },
    { id: 4, title: "Troubleshooting", icon: "🔧", link: "#" },
    { id: 5, title: "FAQ", icon: "❓", link: "#" },
    { id: 6, title: "Download Center", icon: "📥", link: "#" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert("Support ticket submitted! We'll get back to you soon.");
    setMessage("");
    setSubject("");
    setEmail("");
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaHeadphones className="text-indigo-600" size={28} />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Support Center
            </h1>
          </div>
          <p className="text-gray-600">
            Get help, report issues, or ask questions. We're here to help you
            succeed.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Response Time</p>
                <p className="text-2xl font-bold text-gray-900">2.4 hours</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FaClock className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Support Agents</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FaUsers className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Satisfaction Rate</p>
                <p className="text-2xl font-bold text-gray-900">96%</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <FaHeadphones className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors duration-200 ${
              activeTab === "contact"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("contact")}
          >
            Contact Support
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors duration-200 ${
              activeTab === "faq"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("faq")}
          >
            FAQ
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors duration-200 ${
              activeTab === "resources"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("resources")}
          >
            Resources
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "contact" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Options */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                How can we help you?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`${option.color} border rounded-xl p-5 hover:shadow-md transition-shadow duration-200`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      {option.icon}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {option.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <button className="w-full bg-white border border-gray-300 text-gray-800 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      {option.action}
                    </button>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Send us a message
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="General">General Inquiry</option>
                        <option value="Technical">Technical Issue</option>
                        <option value="Billing">Billing/Payment</option>
                        <option value="Academic">Academic Support</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Please describe your issue in detail..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <FaPaperPlane /> Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Quick Help Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-5 shadow-lg mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  Need immediate help?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-white" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm opacity-90">+ (251) 939 098 222</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-white" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm opacity-90">
                        support@masterplatform.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaClock className="text-white" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-sm opacity-90">
                        24/7 Support Available
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Quick Resources
                </h3>
                <div className="space-y-3">
                  {quickResources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.link}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="text-xl">{resource.icon}</span>
                      <span className="text-gray-700">{resource.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* FAQ Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                "All",
                "Account",
                "Courses",
                "Technical",
                "Assignments",
                "Community",
              ].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedCategory === category
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {faqData
                .filter(
                  (faq) =>
                    selectedCategory === "All" ||
                    faq.category === selectedCategory,
                )
                .map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      className="w-full text-left p-5 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => {
                        // Toggle answer visibility (you could add state for this)
                        const answerEl = document.getElementById(
                          `answer-${faq.id}`,
                        );
                        answerEl.classList.toggle("hidden");
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <FaQuestionCircle className="text-indigo-500 mt-0.5" />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {faq.question}
                          </h3>
                          <span className="text-xs text-gray-500 mt-1">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-gray-400">▼</span>
                    </button>
                    <div
                      id={`answer-${faq.id}`}
                      className="hidden p-5 pt-0 border-t border-gray-100"
                    >
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Didn't find answer */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-100 border border-emerald-200 rounded-xl p-5 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">
                Didn't find what you were looking for?
              </h3>
              <p className="text-gray-700 mb-4">
                Our support team is ready to help you with any questions.
              </p>
              <button
                onClick={() => setActiveTab("contact")}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-6 rounded-lg inline-flex items-center gap-2 transition-colors duration-200"
              >
                <FaHeadphones /> Contact Support
              </button>
            </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Resource Cards */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="font-semibold text-gray-900 mb-2">User Guides</h3>
              <p className="text-gray-700 mb-4 text-sm">
                Comprehensive guides for all platform features.
              </p>
              <button className="flex items-center gap-2 text-blue-600 font-medium">
                <FaBook /> View Guides
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Video Tutorials
              </h3>
              <p className="text-gray-700 mb-4 text-sm">
                Step-by-step video tutorials for visual learners.
              </p>
              <button className="flex items-center gap-2 text-purple-600 font-medium">
                <FaVideo /> Watch Tutorials
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Troubleshooting
              </h3>
              <p className="text-gray-700 mb-4 text-sm">
                Common issues and their solutions.
              </p>
              <button className="flex items-center gap-2 text-green-600 font-medium">
                <FaQuestionCircle /> Fix Issues
              </button>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-5">
              <div className="text-4xl mb-4">📥</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Download Center
              </h3>
              <p className="text-gray-700 mb-4 text-sm">
                Download software, apps, and resources.
              </p>
              <button className="flex items-center gap-2 text-red-600 font-medium">
                <FaDownload /> Download Files
              </button>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-5">
              <div className="text-4xl mb-4">📖</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Documentation
              </h3>
              <p className="text-gray-700 mb-4 text-sm">
                Technical documentation and API references.
              </p>
              <button className="flex items-center gap-2 text-yellow-600 font-medium">
                <FaBook /> Read Docs
              </button>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-xl p-5">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Community Forum
              </h3>
              <p className="text-gray-700 mb-4 text-sm">
                Connect with other students and teachers.
              </p>
              <button className="flex items-center gap-2 text-indigo-600 font-medium">
                <FaUsers /> Join Community
              </button>
            </div>
          </div>
        )}

        {/* Support Hours */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Support Hours
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">Weekdays</p>
              <p className="text-sm text-gray-600">9:00 AM - 8:00 PM EST</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">Weekends</p>
              <p className="text-sm text-gray-600">10:00 AM - 6:00 PM EST</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">Emergency</p>
              <p className="text-sm text-gray-600">24/7 via Live Chat</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
