"use client";

import { SlidersHorizontal } from "lucide-react";

interface PatientFiltersProps {
  statusFilter: string;
  physicianFilter: string;
  wardFilter: string;
  onStatusChange: (v: string) => void;
  onPhysicianChange: (v: string) => void;
  onWardChange: (v: string) => void;
}

const SELECT_CLASS =
  "border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-sm bg-white text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 cursor-pointer";

export function PatientFilters({
  statusFilter,
  physicianFilter,
  wardFilter,
  onStatusChange,
  onPhysicianChange,
  onWardChange,
}: PatientFiltersProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)} className={SELECT_CLASS} aria-label="Filter by status">
        <option value="">Status</option>
        <option value="Stable">Stable</option>
        <option value="Alert">Alert</option>
        <option value="Critical">Critical</option>
        <option value="Pending">Pending</option>
      </select>

      <select value={physicianFilter} onChange={(e) => onPhysicianChange(e.target.value)} className={SELECT_CLASS} aria-label="Filter by physician">
        <option value="">Physician</option>
        <option value="Dr. Sarah Chen">Dr. Sarah Chen</option>
        <option value="Dr. Mark Lee">Dr. Mark Lee</option>
        <option value="Dr. Mark Chen">Dr. Mark Chen</option>
        <option value="Dr. Chen">Dr. Chen</option>
      </select>

      <select value={wardFilter} onChange={(e) => onWardChange(e.target.value)} className={SELECT_CLASS} aria-label="Filter by ward">
        <option value="">Ward</option>
        <option value="Ward A">Ward A</option>
        <option value="Ward B">Ward B</option>
        <option value="Ward C">Ward C</option>
      </select>

      <button
        className="ml-auto p-2 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F0FDFA] hover:text-[#0D9488] transition-colors"
        aria-label="Advanced filters"
      >
        <SlidersHorizontal size={16} />
      </button>
    </div>
  );
}
