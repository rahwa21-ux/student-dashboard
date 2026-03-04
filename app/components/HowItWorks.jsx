export default function HowItWorks() {
  const steps = [
    "Create an Account",
    "Select Your Grade",
    "Start Learning",
    "Track Progress",
  ];

  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h3 className="text-3xl font-bold mb-12">How It Works</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="p-6 border rounded-xl">
              <div className="text-indigo-600 font-bold text-xl mb-3">
                {index + 1}
              </div>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
