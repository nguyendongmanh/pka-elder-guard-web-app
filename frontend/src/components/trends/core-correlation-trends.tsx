import { MoreHorizontal } from "lucide-react";
import { StatusBadge } from "@/components/vitals/status-badge";
import { AnalysisOverlaysDropdown } from "./analysis-overlays-dropdown";
import { HealthTrendsChart } from "./health-trends-chart";

export function CoreCorrelationTrends() {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#0F172A]">Core Correlation Trends</h2>
        <div className="flex items-center gap-2">
          <AnalysisOverlaysDropdown />
          <button className="p-1 rounded text-[#64748B] hover:bg-[#F8FAFC]" aria-label="More options">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
      {/* Summary row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#F0FDFA] rounded-xl p-3">
          <p className="text-xs text-[#64748B]">Blood Pressure (SpO2)</p>
          <p className="text-lg font-bold text-[#0F172A] mt-1">118/78 mmHg</p>
        </div>
        <div className="bg-[#F0FDFA] rounded-xl p-3">
          <p className="text-xs text-[#64748B]">Oxygen Saturation</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-lg font-bold text-[#0F172A]">98%</p>
            <StatusBadge status="Normal" />
          </div>
        </div>
        <div className="bg-[#F0FDFA] rounded-xl p-3">
          <p className="text-xs text-[#64748B]">Respiratory Rate</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-lg font-bold text-[#0F172A]">16 breaths/min</p>
          </div>
          <StatusBadge status="Normal" className="mt-1" />
        </div>
      </div>
      {/* Chart */}
      <div>
        <p className="text-sm font-semibold text-[#0F172A] mb-2">Health Trends (Last 24 Hours)</p>
        <HealthTrendsChart />
      </div>
    </div>
  );
}
