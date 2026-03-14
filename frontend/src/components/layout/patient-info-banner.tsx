import type { Patient } from "@/types/patient";
import { cn } from "@/lib/utils";

interface PatientInfoBannerProps {
  patient: Patient;
}

const statusClass: Record<string, string> = {
  Stable: "bg-green-100 text-green-700",
  Normal: "bg-green-100 text-green-700",
  Warning: "bg-amber-100 text-amber-700",
  Critical: "bg-red-100 text-red-700",
};

export function PatientInfoBanner({ patient }: PatientInfoBannerProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="font-semibold text-[#0F172A]">Patient: {patient.name}</span>
      <span className="text-[#64748B]">(ID: {patient.id})</span>
      <span className="text-[#64748B]">| Age: {patient.age}</span>
      <span className="text-[#64748B]">| Status:</span>
      <span
        className={cn(
          "text-xs font-semibold px-2 py-0.5 rounded-full",
          statusClass[patient.status] ?? "bg-gray-100 text-gray-700"
        )}
        aria-live="polite"
      >
        {patient.status}
      </span>
    </div>
  );
}
