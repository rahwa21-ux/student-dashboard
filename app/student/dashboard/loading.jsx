// app/student/dashboard/loading.js
export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Topbar skeleton */}
      <div className="h-16 bg-white shadow-sm px-6 flex items-center">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="ml-auto h-8 w-48 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="p-6 space-y-6">
        {/* DashboardHero skeleton */}
        <div className="h-32 bg-gray-200 rounded-3xl animate-pulse" />

        {/* Subjects grid skeleton */}
        <section className="p-8 rounded-3xl shadow-lg bg-gray-50">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-gray-200 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
