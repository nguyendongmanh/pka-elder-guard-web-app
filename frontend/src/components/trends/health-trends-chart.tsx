"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { MOCK_CHART_DATA } from "@/lib/mock-data";
import { CustomChartTooltip } from "./custom-chart-tooltip";
import { useOverlayStore } from "@/stores/overlay-store";

export function HealthTrendsChart() {
  const { medicationOverlay, stableDataOverlay } = useOverlayStore();
  return (
    <div
      className="h-48"
      role="img"
      aria-label="Health trends chart showing heart rate, blood pressure and SpO2 over 24 hours"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={MOCK_CHART_DATA} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="gradHR" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0D9488" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradBP" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F97316" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradSPO2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#94A3B8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10, fill: "#94A3B8" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[40, 140]}
            tick={{ fontSize: 10, fill: "#94A3B8" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomChartTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            formatter={(value) => <span style={{ color: "#64748B" }}>{value}</span>}
          />
          {medicationOverlay && (
            <ReferenceLine
              x="10:00 AM"
              stroke="#EF4444"
              strokeDasharray="4 4"
              label={{ value: "💊", position: "top", fontSize: 12 }}
            />
          )}
          {stableDataOverlay && (
            <ReferenceLine
              x="4:30 PM"
              stroke="#10B981"
              strokeDasharray="4 4"
              label={{
                value: "✓ Stable data point",
                position: "insideTopRight",
                fontSize: 10,
                fill: "#10B981",
              }}
            />
          )}
          <Area
            type="monotone"
            dataKey="heartRate"
            name="Heart Rate"
            stroke="#0D9488"
            strokeWidth={2}
            fill="url(#gradHR)"
          />
          <Area
            type="monotone"
            dataKey="bloodPressure"
            name="BP"
            stroke="#F97316"
            strokeWidth={2}
            fill="url(#gradBP)"
          />
          <Area
            type="monotone"
            dataKey="spo2"
            name="SpO2"
            stroke="#94A3B8"
            strokeWidth={2}
            fill="url(#gradSPO2)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
