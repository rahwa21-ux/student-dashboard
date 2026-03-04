"use client";
import { useRouter } from "next/navigation";

export default function UpcomingDeadlines() {
  const router = useRouter();

  const deadlines = [
    {
      id: 1,
      subject: "Mathematics",
      title: "Calculus Assignment",
      date: "Tomorrow, 10 AM",
      priority: "HIGH",
      color: "border-red-500",
      badge: "bg-red-100 text-red-600",
    },
    {
      id: 2,
      subject: "Biology",
      title: "Lab Report",
      date: "Dec 15, 2 PM",
      priority: "MEDIUM",
      color: "border-yellow-500",
      badge: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 3,
      subject: "Economics",
      title: "Market Analysis",
      date: "Dec 18, 11 AM",
      priority: "LOW",
      color: "border-blue-500",
      badge: "bg-blue-100 text-blue-600",
    },
  ];

  const handleStartNow = (id) => {
    // Navigate to the specific assignment detail page using the ID
    router.push(`/student/dashboard/assignments/${id}`);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Upcoming Deadlines</h2>
        <span className="w-7 h-7 flex items-center justify-center text-sm bg-green-600 text-white rounded-full">
          3
        </span>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {deadlines.map((assignment) => (
          <div
            key={assignment.id}
            className={`flex justify-between items-start p-4 border-l-4 rounded-xl bg-gray-50 ${assignment.color}`}
          >
            <div>
              <p className="text-sm text-gray-500">{assignment.subject}</p>
              <h4 className="font-semibold">{assignment.title}</h4>

              <p className="text-sm text-gray-600 mt-2">{assignment.date}</p>

              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${assignment.badge}`}
              >
                {assignment.priority}
              </span>
            </div>

            <button
              className="relative bg-gradient-to-r from-green-600 to-emerald-500  text-white px-5 py-2 rounded-xl text-sm font-medium shadow-md group overflow-hidden"
              onClick={() => handleStartNow(assignment.id)}
            >
              <span className="relative z-10">Start Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
