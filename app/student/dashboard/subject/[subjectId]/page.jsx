"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/app/student/components/DashboardLayout";
import ChapterCard from "@/app/student/components/ChapterCard";

export default function SubjectChaptersPage() {
  const { subjectId } = useParams();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const res = await fetch("/api/chapters");
      const data = await res.json();

      const filtered = data.filter(
        (c) => Number(c.subject_id) === Number(subjectId),
      );

      setChapters(filtered);
    };

    fetchChapters();
  }, [subjectId]);

  return (
    <DashboardLayout>
      <div className="p-8 bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">📚 Chapters</h2>
            <p className="text-gray-500 mt-1">
              Select a chapter to explore lessons
            </p>
          </div>

          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-sm transition"
          >
            ← Back
          </button>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, index) => {
            const gradients = [
              "from-blue-500 to-indigo-600",
              "from-orange-400 to-pink-500",
              "from-green-400 to-emerald-600",
            ];

            const gradient = gradients[index % gradients.length];

            return (
              <div
                key={chapter.id}
                onClick={() =>
                  (window.location.href = `/student/dashboard/chapter/${chapter.id}`)
                }
                className={`
                group relative
                bg-gradient-to-br ${gradient}
                p-6 rounded-2xl
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-1
                transition-all duration-300
                cursor-pointer
                text-white
              `}
              >
                <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>

                <div className="relative">
                  <h3 className="text-lg font-semibold">{chapter.title}</h3>

                  {chapter.order_number && (
                    <p className="text-sm text-white/80 mt-1">
                      Chapter {chapter.order_number}
                    </p>
                  )}

                  <p className="text-sm text-white/80 mt-4">View lessons →</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
