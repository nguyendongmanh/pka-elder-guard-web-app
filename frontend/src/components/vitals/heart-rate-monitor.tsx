"use client";

import { Heart } from "lucide-react";
import { MiniSparkline } from "./mini-sparkline";

interface HeartRateMonitorProps {
  bpm: number;
}

export function HeartRateMonitor({ bpm }: HeartRateMonitorProps) {
  return (
    <div className="p-4 bg-[#F0FDFA] rounded-xl">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-semibold text-[#0F172A]">Heart Rate Monitor</p>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
          <span className="text-xs text-green-600 font-medium">Live</span>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <div>
          <span className="text-5xl font-bold text-[#0D9488]">{bpm}</span>
          <span className="text-lg font-semibold text-[#64748B] ml-1">BPM</span>
        </div>
        <Heart
          size={36}
          className="text-[#0D9488] animate-pulse ml-auto"
          fill="currentColor"
          aria-hidden="true"
        />
      </div>
      <MiniSparkline />
    </div>
  );
}
