"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaSignOutAlt,
  FaMoon,
  FaUser,
  FaLock,
  FaTimes,
  FaCheck,
  FaQuestionCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import DashboardLayout from "@/app/student/components/DashboardLayout";

const Logout = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [logoutReason, setLogoutReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberChoice, setRememberChoice] = useState(false);

  const logoutOptions = [
    {
      id: "logout",
      title: "Logout",
      description: "Sign out of your account on this device",
      icon: <FaSignOutAlt className="text-indigo-600" />,
      action: "logout",
      color: "bg-indigo-50 border-indigo-100",
    },
    {
      id: "switch",
      title: "Switch Account",
      description: "Logout and switch to a different account",
      icon: <FaUser className="text-blue-600" />,
      action: "switch",
      color: "bg-blue-50 border-blue-100",
    },
    {
      id: "lock",
      title: "Lock Session",
      description: "Lock your session and require password to continue",
      icon: <FaLock className="text-green-600" />,
      action: "lock",
      color: "bg-green-50 border-green-100",
    },
  ];

  const logoutReasons = [
    { id: "session", label: "Ending study session" },
    { id: "security", label: "Security reasons" },
    { id: "device", label: "Using a shared device" },
    { id: "break", label: "Taking a break" },
    { id: "other", label: "Other reason" },
  ];

  const handleLogout = async (action = "logout") => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log(`${action} action performed with reason: ${logoutReason}`);

      // Clear any user data (in a real app, you would clear cookies/tokens)
      localStorage.removeItem("userToken");
      sessionStorage.clear();

      // Redirect to dashboard page
      router.push("/");
      setIsLoading(false);
    }, 1500);
  };

  const handleAction = (action) => {
    if (action === "logout" || action === "switch") {
      setShowModal(true);
    } else if (action === "lock") {
      // Lock session logic
      alert("Session locked. You'll need to enter your password to continue.");
    }
  };

  const handleConfirmLogout = () => {
    handleLogout();
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <FaSignOutAlt className="text-red-500 text-3xl" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Leaving so soon?
            </h1>
            <p className="text-gray-600">
              Are you sure you want to log out? Choose an option below.
            </p>
          </div>

          {/* Options Cards */}
          <div className="space-y-4 mb-8">
            {logoutOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAction(option.action)}
                disabled={isLoading}
                className={`${option.color} w-full border rounded-xl p-5 text-left hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white">{option.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {option.description}
                    </p>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </button>
            ))}
          </div>

          {/* Stay Signed In Option */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
            <div className="flex items-center gap-3">
              <FaMoon className="text-gray-600" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Stay Signed In?</h3>
                <p className="text-sm text-gray-600">
                  Keep your session active for faster access
                </p>
              </div>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 px-5 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                Stay
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="text-center text-sm text-gray-500 space-y-1">
            <p>Current session: 2 hours, 15 minutes</p>
            <p>Last login: Today at 9:30 AM</p>
          </div>

          {/* Logout Confirmation Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
                {/* Modal Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <FaExclamationTriangle className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Confirm Logout
                    </h3>
                    <p className="text-sm text-gray-600">
                      This will end your current session
                    </p>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for logout (optional)
                    </label>
                    <select
                      value={logoutReason}
                      onChange={(e) => setLogoutReason(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Select a reason</option>
                      {logoutReasons.map((reason) => (
                        <option key={reason.id} value={reason.id}>
                          {reason.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="rememberChoice"
                      checked={rememberChoice}
                      onChange={(e) => setRememberChoice(e.target.checked)}
                      className="rounded text-red-600 focus:ring-red-500"
                    />
                    <label
                      htmlFor="rememberChoice"
                      className="text-sm text-gray-700"
                    >
                      Remember my choice on this device
                    </label>
                  </div>

                  {/* Warning Message */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <FaQuestionCircle className="text-yellow-600 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium">Before you go...</p>
                        <p>
                          Make sure to save any unsaved work in your
                          assignments.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    disabled={isLoading}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <FaTimes /> Cancel
                  </button>
                  <button
                    onClick={handleConfirmLogout}
                    disabled={isLoading}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Logging out...
                      </>
                    ) : (
                      <>
                        <FaCheck /> Confirm Logout
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Alternative Logout Methods */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Other Options
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => router.push("/settings")}
                className="text-sm text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-50 rounded-lg"
              >
                Account Settings
              </button>
              <button
                onClick={() => router.push("/support")}
                className="text-sm text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-50 rounded-lg"
              >
                Get Help
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Logout;
