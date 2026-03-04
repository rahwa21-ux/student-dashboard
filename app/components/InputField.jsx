// components/InputField.jsx
export default function InputField({ label, type, placeholder, ...props }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        {...props}
      />
    </div>
  );
}
