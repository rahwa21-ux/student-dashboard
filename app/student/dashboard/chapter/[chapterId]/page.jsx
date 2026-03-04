"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardLayout from "@/app/student/components/DashboardLayout";
import LessonCard from "@/app/student/components/LessonCard";

export default function ChapterLessonsPage() {
  const { chapterId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [chapterTitle, setChapterTitle] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      const resLessons = await fetch("/api/lessons");
      const dataLessons = await resLessons.json();

      const filteredLessons = dataLessons.filter(
        (l) => Number(l.chapter_id) === Number(chapterId),
      );

      setLessons(filteredLessons);

      // Optionally get chapter title
      const resChapters = await fetch("/api/chapters");
      const dataChapters = await resChapters.json();
      const chapter = dataChapters.find(
        (c) => Number(c.id) === Number(chapterId),
      );
      setChapterTitle(chapter?.title || "Lessons");
    };

    fetchLessons();
  }, [chapterId]);

  return (
    <DashboardLayout>
      <div className="p-8 bg-gradient-to-br from-gray-50 via-white to-indigo-50 min-h-screen space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              📖 {chapterTitle}
            </h2>
            <p className="text-gray-500 mt-1">
              Select a lesson to continue learning
            </p>
          </div>

          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-sm transition"
          >
            ← Back
          </button>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => {
            const gradients = [
              "from-blue-500 to-indigo-600",
              "from-orange-400 to-pink-500",
              "from-green-400 to-emerald-600",
            ];
            const gradient = gradients[index % gradients.length];

            return (
              <div
                key={lesson.id}
                className={`
                  group relative
                  bg-gradient-to-br ${gradient}
                  rounded-2xl
                  shadow-lg
                  hover:shadow-2xl
                  hover:-translate-y-1
                  transition-all duration-300
                  cursor-pointer
                  text-white
                  overflow-hidden
                `}
              >
                <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>

                <div className="relative p-6 flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">{lesson.title}</h3>
                  {lesson.description && (
                    <p className="text-sm text-white/80 line-clamp-2">
                      {lesson.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-4 text-sm text-white/80">
                    {lesson.duration && <span>{lesson.duration} min</span>}
                    {lesson.video_path && (
                      <a
                        href={lesson.video_path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Watch
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
