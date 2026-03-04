import {
  HiCheckCircle,
  HiPlay,
  HiArrowUpTray,
  HiChevronRight,
} from "react-icons/hi2";

export default function RecentActivity() {
  const activities = [
    {
      type: "Completed",
      title: "Algebra Quiz",
      time: "2 hours ago",
      icon: <HiCheckCircle />,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      type: "Watched",
      title: "Biology Video Lesson",
      time: "5 hours ago",
      icon: <HiPlay />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      type: "Submitted",
      title: "Physics Assignment",
      time: "Yesterday",
      icon: <HiArrowUpTray />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${activity.bg}`}
              >
                <span className={`text-xl ${activity.color}`}>
                  {activity.icon}
                </span>
              </div>

              <div>
                <p className="text-sm font-medium">
                  {activity.type} • {activity.title}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>

            <HiChevronRight className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
