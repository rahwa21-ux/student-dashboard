"use client";

import { useRouter } from "next/navigation";

export default function PaymentPage({ params }) {
  const router = useRouter();
  const { planName } = params;

  const handlePayment = () => {
    const subscriptionData = {
      name: planName,
      status: "Active",
      startDate: new Date().toISOString(),
      expiry: new Date(
        new Date().setMonth(new Date().getMonth() + 1),
      ).toISOString(), // 1 month subscription
    };

    // Save subscription
    localStorage.setItem("subscription", JSON.stringify(subscriptionData));

    // Save payment history
    const existingPayments = JSON.parse(localStorage.getItem("payments")) || [];

    const newPayment = {
      id: Date.now(),
      date: new Date().toISOString(),
      amount: "$19.99",
      status: "Completed",
    };

    localStorage.setItem(
      "payments",
      JSON.stringify([...existingPayments, newPayment]),
    );

    router.push(`/student/dashboard/checkout/${planName}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl text-center">
        <h1 className="text-2xl mb-4">Fake Payment Gateway</h1>
        <p className="mb-4">
          You're purchasing: <strong>{planName}</strong>
        </p>

        <button
          onClick={handlePayment}
          className="mt-4 bg-green-500 hover:bg-green-600 px-6 py-2 rounded transition"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
