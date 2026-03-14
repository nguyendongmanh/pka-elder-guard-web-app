import type { VitalMetric } from "@/types/patient";
import { StatusBadge } from "./status-badge";
import { Droplets, Wind, Activity } from "lucide-react";

interface VitalMiniCardProps {
  metric: VitalMetric;
}

const iconMap: Record<string, React.ReactNode> = {
  bp: <Activity size={20} className="text-orange-400" />,
  spo2: <Droplets size={20} className="text-blue-400" />,
  rr: <Wind size={20} className="text-teal-400" />,
};

export function VitalMiniCard({ metric }: VitalMiniCardProps) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[#64748B] leading-tight">{metric.label}</p>
          <p className="text-xl font-bold text-[#0F172A] mt-0.5">{metric.value}</p>
          <p className="text-xs text-[#64748B]">{metric.unit}</p>
        </div>
        {metric.icon && iconMap[metric.icon]}
      </div>
      <StatusBadge status={metric.status} />
    </div>
  );
}
