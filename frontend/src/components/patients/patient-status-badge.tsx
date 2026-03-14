import type { PatientStatus } from "@/types/patient";
import { cn } from "@/lib/utils";

interface PatientStatusBadgeProps {
  status: PatientStatus;
}

const variants: Record<PatientStatus, string> = {
  Stable:   "bg-green-100 text-green-700",
  Alert:    "bg-amber-100 text-amber-700",
  Critical: "bg-red-100 text-red-600",
  Pending:  "bg-slate-100 text-slate-600",
};

export function PatientStatusBadge({ status }: PatientStatusBadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full", variants[status])}
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  );
}
