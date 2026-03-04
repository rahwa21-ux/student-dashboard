"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-indigo-600">KurazLMS</h1>

        <div className="hidden md:flex space-x-8">
          <Link href="#features">Features</Link>
          <Link href="#courses">Courses</Link>
          <Link href="#about">About</Link>
          <Link href="auth/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
          <Link
            href="auth/signup"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
