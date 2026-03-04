export default function CoursesPreview() {
  const grades = [6, 8, 12];

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold mb-12">Explore Grades</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {grades.map((grade) => (
            <div
              key={grade}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h4 className="text-xl font-semibold mb-4">Grade {grade}</h4>
              <p className="text-gray-600 mb-6">
                Access all subjects and lessons.
              </p>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                View Courses
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
