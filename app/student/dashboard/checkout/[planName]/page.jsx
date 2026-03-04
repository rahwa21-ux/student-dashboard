"use client";

import { useRouter, useParams } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const params = useParams(); // safe in client component
  const planName = params.planName;

  const handleConfirmPayment = () => {
    // Save subscription
    const subscriptionData = {
      name: planName,
      status: "Active",
      startDate: new Date().toISOString(),
      expiry: new Date(
        new Date().setMonth(new Date().getMonth() + 1),
      ).toISOString(),
    };
    localStorage.setItem("subscription", JSON.stringify(subscriptionData));

    // Save payment history
    const existingPayments = JSON.parse(localStorage.getItem("payments")) || [];
    const newPayment = {
      id: Date.now(),
      date: new Date().toISOString(),
      amount: "$19.99",
      status: "Completed",
      method: "Fake Payment",
    };
    localStorage.setItem(
      "payments",
      JSON.stringify([...existingPayments, newPayment]),
    );

    // Redirect to subscriptions page
    router.push("/student/dashboard/subscriptions");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl text-center">
        <h1 className="text-2xl mb-4">Checkout Page</h1>
        <p className="mb-4">
          You are purchasing: <strong>{planName}</strong>
        </p>

        <p className="mb-4">Choose a payment method (simulated)</p>
        <div className="flex flex-col gap-4 mb-4">
          <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded transition">
            Credit Card
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded transition">
            PayPal
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded transition">
            Mobile Payment
          </button>
        </div>

        <button
          onClick={handleConfirmPayment}
          className="mt-4 bg-green-500 hover:bg-green-600 px-6 py-2 rounded transition"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
}
