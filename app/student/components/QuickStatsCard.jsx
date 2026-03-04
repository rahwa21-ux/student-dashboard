import { IconType } from "react-icons";

export default function QuickStatsCard({ icon, title, value, text, bgClass }) {
  return (
    <div
      className={`rounded-xl p-5 shadow-md bg-gradient-to-br ${bgClass} text-white`}
    >
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-lg bg-white/20">{icon}</div>
        <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
          {title}
        </span>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">{value}</h2>
        <p className="text-sm text-white/80 mt-1">{text}</p>
      </div>
    </div>
  );
}
