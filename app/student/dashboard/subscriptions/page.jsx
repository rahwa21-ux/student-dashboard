"use client";
import { useState, useEffect } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import { CreditCard, User as UserIcon, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubscriptionsPage() {
  const router = useRouter();
  const [selectedGradeId, setSelectedGradeId] = useState(null);
  const [user, setUser] = useState(null);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [plans, setPlans] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    // Mock user
    setUser({
      name: "Rahwa Gebreyesus",
      email: "rahwa@example.com",
      role: "Student",
    });

    // Available plans
    const availablePlans = [
      {
        name: "Basic Plan",
        slug: "basic",
        price: "$9.99/mo",
        features: ["Limited courses", "PDF resources"],
      },
      {
        name: "Pro Plan",
        slug: "pro",
        price: "$19.99/mo",
        features: ["All courses", "Videos", "PDFs"],
      },
      {
        name: "Premium Plan",
        slug: "premium",
        price: "$29.99/mo",
        features: ["All Pro + Mentorship", "Certificate"],
      },
    ];

    setPlans(availablePlans);

    // Load subscription from localStorage
    const storedSubscription = localStorage.getItem("subscription");
    if (storedSubscription) {
      setCurrentPlan(JSON.parse(storedSubscription));
    }

    // Load payment history
    const storedPayments = localStorage.getItem("payments");
    if (storedPayments) {
      setPaymentHistory(JSON.parse(storedPayments));
    }
  }, []);

  useEffect(() => {
    if (currentPlan?.expiry) {
      const today = new Date();
      const expiryDate = new Date(currentPlan.expiry);

      if (expiryDate < today) {
        const expiredPlan = { ...currentPlan, status: "Expired" };
        setCurrentPlan(expiredPlan);
        localStorage.setItem("subscription", JSON.stringify(expiredPlan));
      }
    }
  }, [currentPlan]);

  const handleUpgrade = (plan) => {
    router.push(`/student/dashboard/payment/${plan.slug}`);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      <Sidebar />
      <Topbar
        selectedGradeId={selectedGradeId}
        setSelectedGradeId={setSelectedGradeId}
      />

      <div className="md:ml-64 p-6 space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Manage Subscriptions
        </h1>

        {/* User Details Card */}
        {user && (
          <div className="bg-gray-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4 cursor-pointer hover:bg-gray-700 transition">
            <div className="flex items-center gap-4">
              <UserIcon size={32} className="text-blue-400" />
              <div>
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
                <p className="text-gray-400 text-sm">{user.role}</p>
              </div>
            </div>
            {currentPlan && (
              <div className="bg-gray-700 p-4 rounded-xl">
                <p className="text-gray-300 text-sm">Current Plan</p>
                <h2 className="font-semibold text-lg">{currentPlan.name}</h2>
                <p className="text-gray-400 text-sm">
                  Status:{" "}
                  <span
                    className={
                      currentPlan.status === "Active"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {currentPlan.status}
                  </span>
                </p>
                <p className="text-gray-400 text-sm">
                  Start: {currentPlan.startDate}
                </p>
                <p className="text-gray-400 text-sm">
                  Expiry: {currentPlan.expiry}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Available Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <CreditCard size={20} className="text-blue-400" />
              </div>
              <p className="text-gray-300 mb-3 font-semibold">{plan.price}</p>
              <ul className="list-disc ml-5 text-gray-400 mb-4">
                {plan.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
              <button
                onClick={() => handleUpgrade(plan)}
                disabled={currentPlan?.name === plan.name}
                className={`w-full px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition ${
                  currentPlan?.name === plan.name
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                <ArrowUp size={16} />
                {currentPlan?.name === plan.name ? "Current Plan" : "Upgrade"}
              </button>
            </div>
          ))}
        </div>

        {/* Payment History */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((p) => (
                  <tr key={p.id} className="border-t border-gray-700">
                    <td className="px-4 py-2">{p.date}</td>
                    <td className="px-4 py-2">{p.amount}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${p.status === "Completed" ? "text-green-400" : "text-red-400"}`}
                    >
                      {p.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
