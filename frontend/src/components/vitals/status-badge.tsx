import type { VitalStatus } from "@/types/patient";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: VitalStatus;
  className?: string;
}

const variants: Record<VitalStatus, string> = {
  Normal: "bg-green-100 text-green-700",
  Warning: "bg-amber-100 text-amber-700",
  Critical: "bg-red-100 text-red-700",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full",
        variants[status],
        className
      )}
      aria-live="polite"
    >
      {status}
    </span>
  );
}
