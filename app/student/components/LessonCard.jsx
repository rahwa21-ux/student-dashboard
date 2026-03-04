// app/student/components/LessonCard.jsx
import { PlayCircle, Clock } from "lucide-react";

export default function LessonCard({ lesson }) {
  return (
    <div className="group p-5 rounded-xl bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform">
            <PlayCircle
              size={32}
              className="text-indigo-600 group-hover:text-indigo-700"
            />
          </div>
          {lesson.video_path && (
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
            {lesson.title}
          </h3>
          {lesson.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {lesson.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            {lesson.duration && (
              <span className="flex items-center gap-1">
                <Clock size={12} /> {lesson.duration} min
              </span>
            )}
            {lesson.video_path && (
              <a
                href={lesson.video_path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                Watch now <span className="text-lg">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
