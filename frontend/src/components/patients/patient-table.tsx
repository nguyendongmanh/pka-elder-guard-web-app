import type { PatientListItem } from "@/types/patient";
import { PatientTableRow } from "./patient-table-row";

interface PatientTableProps {
  patients: PatientListItem[];
}

const COLUMNS = [
  { key: "name",      label: "Patient Name"      },
  { key: "id",        label: "Patient ID"         },
  { key: "age",       label: "Age"                },
  { key: "status",    label: "Current Status"     },
  { key: "physician", label: "Primary Physician"  },
  { key: "vitals",    label: "Recent Vital Signs" },
  { key: "actions",   label: "Actions"            },
];

export function PatientTable({ patients }: PatientTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
      <table className="w-full text-left" role="table" aria-label="Patient list">
        <thead>
          <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#F1F5F9]">
          {patients.length === 0 ? (
            <tr>
              <td colSpan={COLUMNS.length} className="px-4 py-10 text-center text-sm text-[#64748B]">
                No patients found matching the selected filters.
              </td>
            </tr>
          ) : (
            patients.map((patient) => (
              <PatientTableRow key={patient.id} patient={patient} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
