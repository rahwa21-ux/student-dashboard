"use client";
import {
  HiOutlineCalculator,
  HiOutlineBeaker,
  HiOutlineChartBar,
  HiOutlineLightningBolt,
} from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function SubjectProgress() {
  const router = useRouter();
  const subjects = [
    {
      name: "Mathematics",
      lastStudied: "2 hours ago",
      grade: "A",
      progress: 85,
      next: "Algebra II",
      color: "bg-blue-500",
      iconBg: "bg-blue-100",
      icon: <HiOutlineCalculator className="text-blue-600 text-xl" />,
    },
    {
      name: "Biology",
      lastStudied: "Yesterday",
      grade: "B+",
      progress: 70,
      next: "Cell Division",
      color: "bg-teal-500",
      iconBg: "bg-teal-100",
      icon: <HiOutlineBeaker className="text-teal-600 text-xl" />,
    },
    {
      name: "Economics",
      lastStudied: "3 days ago",
      grade: "A-",
      progress: 60,
      next: "Market Structures",
      color: "bg-green-500",
      iconBg: "bg-green-100",
      icon: <HiOutlineChartBar className="text-green-600 text-xl" />,
    },
    {
      name: "Physics",
      lastStudied: "Last week",
      grade: "B",
      progress: 45,
      next: "Newton’s Laws",
      color: "bg-purple-500",
      iconBg: "bg-purple-100",
      icon: <HiOutlineLightningBolt className="text-purple-600 text-xl" />,
    },
  ];
  const handleStartNow = () => {
    router.push("/subjects");
  };
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Subject Progress</h2>
        <button className="px-4 py-1.5 text-sm border rounded-full hover:bg-gray-50">
          View All
        </button>
      </div>

      {/* Subject Cards */}
      <div className="space-y-6">
        {subjects.map((subject, index) => (
          <div key={index} className="border rounded-2xl p-5 shadow-sm">
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl ${subject.iconBg}`}
                >
                  {subject.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{subject.name}</h3>
                  <p className="text-sm text-gray-500">
                    Last studied: {subject.lastStudied} &nbsp; | &nbsp; Grade:{" "}
                    <span className="font-medium">{subject.grade}</span>
                  </p>
                </div>
              </div>

              <button
                className="relative bg-gradient-to-r from-green-600 to-emerald-500  text-white px-5 py-2 rounded-xl text-sm font-medium shadow-md group overflow-hidden"
                onClick={handleStartNow}
              >
                <span className="relative z-10">Continue</span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </button>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{subject.progress}%</span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${subject.color}`}
                  style={{ width: `${subject.progress}%` }}
                />
              </div>

              <p className="mt-2 text-sm text-gray-600">
                Next: <span className="font-medium">{subject.next}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
