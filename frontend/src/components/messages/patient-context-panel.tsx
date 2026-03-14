"use client";

import Link from "next/link";
import { Heart, MoreHorizontal } from "lucide-react";
import { ConversationAvatar } from "./conversation-avatar";
import { MiniSparkline } from "@/components/vitals/mini-sparkline";
import { HealthTrendsChart } from "@/components/trends/health-trends-chart";

export function PatientContextPanel() {
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0] shrink-0">
        <h2 className="text-base font-bold text-[#0F172A]">Patient Context</h2>
        <button className="p-1 rounded text-[#64748B] hover:bg-[#F8FAFC]" aria-label="More options">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5">
        {/* Patient card */}
        <div className="flex flex-col items-center gap-2 text-center">
          <ConversationAvatar initials="JD" size="lg" />
          <p className="text-sm font-bold text-[#0F172A]">Jonathan Davis</p>
          <span className="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-0.5 rounded-full">
            Stable
          </span>
        </div>

        {/* Heart rate */}
        <div className="bg-[#F0FDFA] rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-[#0F172A]">Heart Rate Monitor</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <Heart size={14} className="text-[#0D9488]" fill="currentColor" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-[#0D9488]">72</span>
            <span className="text-sm text-[#64748B]">BPM</span>
          </div>
          <MiniSparkline />
        </div>

        {/* View Dashboard button */}
        <Link
          href="/dashboard"
          className="w-full text-center text-sm font-medium text-[#0D9488] border border-[#0D9488] rounded-xl py-2 hover:bg-[#F0FDFA] transition-colors"
        >
          View Dashboard
        </Link>

        {/* Heart rate trend */}
        <div>
          <p className="text-xs font-semibold text-[#0F172A] mb-2">Heart Rate Trend</p>
          <HealthTrendsChart />
        </div>
      </div>
    </div>
  );
}
