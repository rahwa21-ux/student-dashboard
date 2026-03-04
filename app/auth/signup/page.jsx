"use client";
import { useState } from "react";
import InputField from "@/app/components/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

export default function SignupPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleBack = () => router.back();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match!", { variant: "error" });
      return;
    }

    const user = { fullName, email, password, role: "student" };
    localStorage.setItem("user", JSON.stringify(user));

    enqueueSnackbar("Account created! You can now login.", {
      variant: "success",
    });
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="mb-4 text-gray-600 hover:text-indigo-600 font-semibold"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">Get Started</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            type="text"
            placeholder="Your Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
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
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
