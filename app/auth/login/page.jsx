"use client";
import { useState } from "react";
import InputField from "@/app/components/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

export default function LoginPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      enqueueSnackbar("No account found. Please sign up first.", {
        variant: "error",
      });
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      if (storedUser.role === "student") {
        enqueueSnackbar("Login successful!", { variant: "success" });
        router.push("/student/dashboard");
      } else {
        enqueueSnackbar("Your role is not authorized.", { variant: "error" });
      }
    } else {
      enqueueSnackbar("Invalid email or password.", { variant: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-4 text-gray-600 hover:text-indigo-600 font-semibold"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-indigo-600 font-semibold">
            Get Started
          </Link>
        </p>
      </div>
    </div>
  );
}
