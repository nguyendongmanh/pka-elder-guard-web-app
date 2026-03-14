"use client";

import { LineChart, Line, ResponsiveContainer, ReferenceLine } from "recharts";
import { generateSparklineData } from "@/lib/mock-data";
import { useMemo } from "react";

export function MiniSparkline() {
  const data = useMemo(() => generateSparklineData(), []);
  return (
    <div className="mt-2">
      <div className="h-14 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
            <ReferenceLine y={60} stroke="#FCD34D" strokeDasharray="3 3" />
            <ReferenceLine y={100} stroke="#FCA5A5" strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0D9488"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-[#64748B]">Last 30 minutes</span>
        <div className="flex gap-2 text-xs">
          <span className="text-green-500 font-medium">60–100 BPM</span>
        </div>
      </div>
    </div>
  );
}
