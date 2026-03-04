"use client";
import { useRouter } from "next/navigation";

export default function SubjectCard({ subject }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/student/dashboard/subject/${subject.id}`)}
      className="p-5 rounded-xl border cursor-pointer bg-white hover:shadow-md"
    >
      <h3 className="font-semibold">{subject.name}</h3>
    </div>
  );
}
