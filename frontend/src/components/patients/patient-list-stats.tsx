import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: number;
  colorClass: string;
  badgeClass: string;
}

interface PatientListStatsProps {
  total: number;
  stable: number;
  critical: number;
  pending: number;
}

export function PatientListStats({ total, stable, critical, pending }: PatientListStatsProps) {
  const stats: Stat[] = [
    { label: "Total:",    value: total,    colorClass: "text-[#0F172A]", badgeClass: "bg-slate-100 text-slate-600"   },
    { label: "Stable:",   value: stable,   colorClass: "text-[#0F172A]", badgeClass: "bg-green-100 text-green-700"  },
    { label: "Critical:", value: critical, colorClass: "text-[#0F172A]", badgeClass: "bg-red-100 text-red-600"      },
    { label: "Pending",   value: pending,  colorClass: "text-[#0F172A]", badgeClass: "bg-amber-100 text-amber-600"  },
  ];

  return (
    <div className="flex items-center gap-6 flex-wrap">
      {stats.map(({ label, value, colorClass, badgeClass }) => (
        <div key={label} className="flex items-center gap-2">
          <span className={cn("text-sm font-medium", colorClass)}>{label}</span>
          <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full min-w-[28px] text-center", badgeClass)}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
