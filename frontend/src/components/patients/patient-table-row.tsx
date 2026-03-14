"use client";

import Link from "next/link";
import { MessageSquare, FileText, Pencil } from "lucide-react";
import type { PatientListItem } from "@/types/patient";
import { PatientStatusBadge } from "./patient-status-badge";
import { PatientAvatar } from "./patient-avatar";

interface PatientTableRowProps {
  patient: PatientListItem;
}

export function PatientTableRow({ patient }: PatientTableRowProps) {
  return (
    <tr className="border-b border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors group">
      {/* Patient Name */}
      <td className="px-4 py-3">
        <Link href={`/patients/${patient.id}`} className="flex items-center gap-3 hover:text-[#0D9488] transition-colors">
          <PatientAvatar initials={patient.avatarInitials} />
          <span className="text-sm font-medium text-[#0F172A] group-hover:text-[#0D9488]">
            {patient.name}
          </span>
        </Link>
      </td>

      {/* Patient ID */}
      <td className="px-4 py-3 text-sm text-[#64748B]">{patient.patientId}</td>

      {/* Age */}
      <td className="px-4 py-3 text-sm text-[#64748B]">{patient.age}</td>

      {/* Status */}
      <td className="px-4 py-3">
        <PatientStatusBadge status={patient.status} />
      </td>

      {/* Physician */}
      <td className="px-4 py-3 text-sm text-[#64748B]">{patient.physician}</td>

      {/* Recent Vitals */}
      <td className="px-4 py-3">
        <div className="text-xs text-[#64748B] leading-relaxed">
          <div>HR {patient.recentVitals.heartRate}</div>
          <div>BP {patient.recentVitals.bloodPressureSystolic}/{patient.recentVitals.bloodPressureDiastolic}</div>
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <button
            className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F0FDFA] hover:text-[#0D9488] transition-colors"
            aria-label={`Message ${patient.name}`}
          >
            <MessageSquare size={15} />
          </button>
          <button
            className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F0FDFA] hover:text-[#0D9488] transition-colors"
            aria-label={`View report for ${patient.name}`}
          >
            <FileText size={15} />
          </button>
          <button
            className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F0FDFA] hover:text-[#0D9488] transition-colors"
            aria-label={`Edit ${patient.name}`}
          >
            <Pencil size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}
