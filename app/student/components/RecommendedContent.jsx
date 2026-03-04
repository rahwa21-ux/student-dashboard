import { FaPlayCircle, FaBookOpen, FaFileAlt } from "react-icons/fa";

export default function RecommendedContent() {
  const recommendations = [
    {
      id: 1,
      title: "Understanding Algebra Basics",
      subject: "Mathematics",
      duration: "12 min video",
      icon: <FaPlayCircle />,
      color: "text-blue-500 bg-blue-50",
    },
    {
      id: 2,
      title: "Biology: Cell Structure Notes",
      subject: "Biology",
      duration: "PDF • 8 pages",
      icon: <FaFileAlt />,
      color: "text-green-500 bg-green-50",
    },
    {
      id: 3,
      title: "Economics Market Summary",
      subject: "Economics",
      duration: "Article • 5 min read",
      icon: <FaBookOpen />,
      color: "text-purple-500 bg-purple-50",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm pl-2 pr-2">
      <h3 className="text-lg font-semibold text-gray-800 mt-2">
        Recommended for You
      </h3>

      <div className="space-y-4">
        {recommendations.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${item.color}`}
              >
                {item.icon}
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {item.subject} • {item.duration}
                </p>
              </div>
            </div>

            <span className="text-xs text-green-600 font-medium">View →</span>
          </div>
        ))}
      </div>
    </div>
  );
}
