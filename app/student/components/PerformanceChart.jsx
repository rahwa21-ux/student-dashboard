"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", score: 65 },
  { day: "Tue", score: 70 },
  { day: "Wed", score: 75 },
  { day: "Thu", score: 80 },
  { day: "Fri", score: 85 },
  { day: "Sat", score: 78 },
  { day: "Sun", score: 90 },
];

export default function PerformanceChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 w-full mt-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-800">
          Performance Overview
        </h3>
        <span className="text-sm text-gray-500">Weekly Progress</span>
      </div>

      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
