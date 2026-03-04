// app/student/dashboard/components/SubjectsGridSkeleton.jsx
export default function SubjectsGridSkeleton() {
  return (
    <section className="p-8 rounded-3xl shadow-lg bg-gray-50">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
      <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    </section>
  );
}
