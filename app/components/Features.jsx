export default function Features() {
  const features = [
    {
      title: "Structured Curriculum",
      desc: "Organized by grade and subject for easy navigation.",
    },
    {
      title: "Video Lessons",
      desc: "High-quality lessons accessible anytime.",
    },
    {
      title: "Progress Tracking",
      desc: "Monitor completed lessons and performance.",
    },
    {
      title: "Interactive Quizzes",
      desc: "Test knowledge with instant feedback.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-3xl font-bold mb-12">Features</h3>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h4 className="font-semibold text-lg mb-3">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
