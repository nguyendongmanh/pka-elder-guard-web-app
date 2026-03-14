import { AppShell } from "@/components/layout/app-shell";
import { PatientListStats } from "@/components/patients/patient-list-stats";
import { PatientListContainer } from "@/components/patients/patient-list-container";
import { ActivityPanel } from "@/components/patients/activity-panel";
import { MOCK_PATIENT_LIST, MOCK_PATIENT_STATS, MOCK_ACTIVITY_EVENTS } from "@/lib/mock-data";

export default function PatientsPage() {
  return (
    <AppShell>
      <div className="flex gap-4 h-full min-h-0">
        {/* Main content */}
        <div className="flex-1 flex flex-col gap-4 min-w-0">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-[#0F172A]">All Patients List</h1>
          </div>

          <PatientListStats
            total={MOCK_PATIENT_STATS.total}
            stable={MOCK_PATIENT_STATS.stable}
            critical={MOCK_PATIENT_STATS.critical}
            pending={MOCK_PATIENT_STATS.pending}
          />

          <PatientListContainer patients={MOCK_PATIENT_LIST} />
        </div>

        {/* Right activity panel */}
        <aside className="w-64 shrink-0 hidden xl:block">
          <ActivityPanel events={MOCK_ACTIVITY_EVENTS} />
        </aside>
      </div>
    </AppShell>
  );
}
