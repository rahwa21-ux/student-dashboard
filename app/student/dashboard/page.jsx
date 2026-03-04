"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/app/student/components/DashboardLayout";
import SubjectCard from "@/app/student/components/SubjectCard";
import DashboardHero from "../components/DashboardHero";
import { Suspense } from "react";
import { DashboardLayoutSkeleton } from "@/app/ui/skeletons";
import SubscriptionsPage from "./subscriptions/page";

export default function DashboardPage() {
  const [allGrades, setAllGrades] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGradeId, setSelectedGradeId] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [gradesRes, subjectsRes] = await Promise.all([
          fetch("/api/grades"),
          fetch("/api/subjects"),
        ]);

        if (!gradesRes.ok) throw new Error("Failed to fetch grades");
        if (!subjectsRes.ok) throw new Error("Failed to fetch subjects");

        setAllGrades(await gradesRes.json());
        setAllSubjects(await subjectsRes.json());
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    if (allGrades.length > 0 && !selectedGradeId) {
      setSelectedGradeId(allGrades[0].id);
    }
  }, [allGrades, selectedGradeId]);

  const subjects = allSubjects.filter(
    (s) => Number(s.grade_id) === Number(selectedGradeId),
  );

  if (loading)
    return (
      <DashboardLayout
        topbarProps={{ grades: allGrades, selectedGradeId, setSelectedGradeId }}
      >
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
        </div>
      </DashboardLayout>
    );

  if (error)
    return (
      <DashboardLayout
        topbarProps={{ grades: allGrades, selectedGradeId, setSelectedGradeId }}
      >
        <div className="text-center text-red-600">
          <p>Error loading data: {error}</p>
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout
      topbarProps={{ grades: allGrades, selectedGradeId, setSelectedGradeId }}
    >
      <div className="p-6 space-y-6 min-h-screen bg-gray-50">
        <DashboardHero />
        <section className="p-8 rounded-3xl shadow-lg bg-gray-50">
          <h2 className="text-3xl font-bold mb-4 text-indigo-600">
            Subjects for{" "}
            {
              allGrades.find((g) => Number(g.id) === Number(selectedGradeId))
                ?.name
            }
          </h2>
          <p className="text-gray-500 mb-6">
            Choose a subject to start learning 🚀
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => {
              // Animated gradient classes
              const gradients = [
                "bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 animate-gradient-x",
                "bg-gradient-to-br from-orange-400 via-pink-500 to-red-500 animate-gradient-y",
                "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 animate-gradient-x",
              ];
              const gradient = gradients[index % gradients.length];

              return (
                <div
                  key={subject.id}
                  onClick={() =>
                    (window.location.href = `/student/dashboard/subject/${subject.id}`)
                  }
                  className={`
            relative ${gradient} p-6 rounded-2xl shadow-xl
            hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
            cursor-pointer text-white overflow-hidden
          `}
                >
                  {/* Soft overlay */}
                  <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>

                  <div className="relative flex items-center justify-between">
                    <h3 className="text-xl font-semibold drop-shadow-lg">
                      {subject.name}
                    </h3>
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition">
                      →
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-white/90 drop-shadow-sm">
                    Explore chapters & lessons
                  </p>

                  {/* Optional subtle icon */}
                  <div className="absolute -bottom-5 -right-5 opacity-20 text-6xl">
                    📚
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
