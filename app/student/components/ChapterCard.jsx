"use client";
import { Layers } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChapterCard({ chapter }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/student/dashboard/chapter/${chapter.id}`)}
      className="
        p-5 rounded-xl border cursor-pointer transition-all duration-200
        border-gray-200 bg-white hover:border-indigo-300 hover:shadow-md hover:bg-gray-50
      "
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
          <Layers size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{chapter.title}</h3>
          {chapter.order_number && (
            <p className="text-xs text-gray-400">
              Chapter {chapter.order_number}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
