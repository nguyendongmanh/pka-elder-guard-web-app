import { HeartRateMonitor } from "./heart-rate-monitor";
import { VitalMiniCard } from "./vital-mini-card";
import { MoreHorizontal } from "lucide-react";
import type { VitalMetric } from "@/types/patient";
import { MOCK_VITALS } from "@/lib/mock-data";

const VITAL_METRICS: VitalMetric[] = [
  { label: "Blood Pressure", value: "118/78", unit: "mmHg", status: "Normal", icon: "bp" },
  { label: "Oxygen Saturation (SpO2)", value: "98%", unit: "", status: "Normal", icon: "spo2" },
  { label: "SpO2", value: "98%", unit: "", status: "Normal", icon: "spo2" },
  { label: "Respiratory Rate", value: "16", unit: "b/m", status: "Normal", icon: "rr" },
];

export function VitalSignsHub() {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col gap-4">
      {/* Card header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#0F172A]">Vital Signs Hub</h2>
        <button className="p-1 rounded text-[#64748B] hover:bg-[#F8FAFC]" aria-label="More options">
          <MoreHorizontal size={18} />
        </button>
      </div>
      {/* Heart rate monitor */}
      <HeartRateMonitor bpm={MOCK_VITALS.heartRate} />
      {/* Mini vital cards 2x2 grid */}
      <div className="grid grid-cols-2 gap-3">
        {VITAL_METRICS.map((m) => (
          <VitalMiniCard key={m.label} metric={m} />
        ))}
      </div>
    </div>
  );
}
