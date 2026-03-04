// app/student/dashboard/components/DashboardInteractive.jsx
"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout"; // your existing layout
import DashboardHero from "../components/DashboardHero";
import SubjectsGrid from "./SubjectsGridSkeleton.jsx"; // we'll create this next

export default function DashboardInteractive({
  initialGrades,
  initialSubjects,
}) {
  const [selectedGradeId, setSelectedGradeId] = useState("");
  const [allGrades] = useState(initialGrades);
  const [allSubjects] = useState(initialSubjects);

  // Set initial grade when grades are available
  useEffect(() => {
    if (allGrades.length > 0 && !selectedGradeId) {
      setSelectedGradeId(allGrades[0].id);
    }
  }, [allGrades, selectedGradeId]);

  // Filter subjects based on selected grade
  const subjects = allSubjects.filter(
    (s) => Number(s.grade_id) === Number(selectedGradeId),
  );

  return (
    <DashboardLayout
      topbarProps={{
        grades: allGrades,
        selectedGradeId,
        setSelectedGradeId,
      }}
    >
      <div className="p-6 space-y-6 min-h-screen bg-gray-50">
        <DashboardHero />
        <SubjectsGrid
          subjects={subjects}
          allGrades={allGrades}
          selectedGradeId={selectedGradeId}
        />
      </div>
    </DashboardLayout>
  );
}
