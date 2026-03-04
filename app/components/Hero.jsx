import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Empowering Students Through Digital Learning
          </h2>
          <p className="text-gray-600 mb-8">
            Structured grade-based learning platform with videos, quizzes, and
            real-time progress tracking.
          </p>
          <div className="flex gap-4">
            <a
              href="auth/signup"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Get Started
            </a>
            <a
              href="auth/login"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition"
            >
              Login
            </a>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8">
          <Image
            src="/dashboard-preview.png"
            alt="Student Dashboard Preview"
            width={1200}
            height={700}
            className="rounded-xl w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
