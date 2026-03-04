"use client";

import {
  HiOutlinePlay,
  HiOutlineQuestionMarkCircle,
  HiOutlineDesktopComputer,
  HiOutlineDocumentDownload,
} from "react-icons/hi";

export default function QuickActions() {
  const actions = [
    {
      title: "Continue Learning",
      desc: "Pick up where you left off",
      icon: HiOutlinePlay,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Take Quiz",
      desc: "Test your understanding",
      icon: HiOutlineQuestionMarkCircle,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Watch Lesson",
      desc: "Learn with video lessons",
      icon: HiOutlineDesktopComputer,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "Download PDF",
      desc: "Access offline materials",
      icon: HiOutlineDocumentDownload,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-5">
        Quick Actions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition cursor-pointer"
            >
              <div
                className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center ${action.bg}`}
              >
                <Icon className={`w-7 h-7 ${action.color}`} />
              </div>

              <h4 className="mt-4 font-semibold text-gray-900">
                {action.title}
              </h4>
              <p className="text-sm text-gray-500 mt-1">{action.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
