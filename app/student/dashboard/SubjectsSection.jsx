"use client";

import { useRouter } from "next/navigation";
import { FaBookOpen } from "react-icons/fa";

export default function SubjectsSection({ grades, subjects, selectedGradeId }) {
  const router = useRouter();

  // Find the currently selected grade
  const selectedGrade = grades.find(
    (g) => Number(g.id) === Number(selectedGradeId),
  ) || {
    name: "Unknown Grade",
  };

  return (
    <section className="p-8 rounded-3xl shadow-lg bg-gray-50">
      {/* Section Header */}
      <h2 className="text-3xl font-bold mb-4 text-indigo-600">
        Subjects for {selectedGrade.name}
      </h2>
      <p className="text-gray-500 mb-6">
        Choose a subject to start learning 🚀
      </p>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => {
          // Gradient backgrounds
          const gradients = [
            "bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600",
            "bg-gradient-to-br from-orange-400 via-pink-500 to-red-500",
            "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600",
          ];
          const gradient = gradients[index % gradients.length];

          return (
            <div
              key={subject.id}
              onClick={() =>
                router.push(`/student/dashboard/subject/${subject.id}`)
              }
              className={`relative ${gradient} p-6 rounded-2xl shadow-xl
                hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
                cursor-pointer text-white overflow-hidden`}
            >
              {/* Soft overlay */}
              <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>

              {/* Subject Title & Arrow */}
              <div className="relative flex items-center justify-between">
                <h3 className="text-xl font-semibold drop-shadow-lg">
                  {subject.name}
                </h3>
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                  →
                </div>
              </div>

              {/* Subject description */}
              <p className="mt-4 text-sm text-white/90 drop-shadow-sm">
                Explore chapters & lessons
              </p>

              {/* React Icon for decoration */}
              <div className="absolute -bottom-6 -right-6 opacity-20">
                <FaBookOpen size={80} className="text-white" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
