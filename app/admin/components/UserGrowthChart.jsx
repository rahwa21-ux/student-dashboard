"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", total: 4000, newUsers: 2400 },
  { month: "Feb", total: 5200, newUsers: 1800 },
  { month: "Mar", total: 6800, newUsers: 2200 },
  { month: "Apr", total: 8200, newUsers: 2600 },
  { month: "May", total: 10500, newUsers: 3000 },
  { month: "Jun", total: 13000, newUsers: 3500 },
  { month: "Jul", total: 15500, newUsers: 4200 },
];

export default function UserGrowthChart() {
  return (
    <div className="w-full ">
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            className="text-xs"
          />

          <YAxis
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            className="text-xs"
          />

          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              fontSize: 12,
            }}
          />

          {/* New Users – Volatility (Bars) */}
          <Bar
            yAxisId="left"
            dataKey="newUsers"
            barSize={28}
            radius={[6, 6, 0, 0]}
            fill="#3b82f6"
          />

          {/* Total Users – Growth Trend (Line) */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="total"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
