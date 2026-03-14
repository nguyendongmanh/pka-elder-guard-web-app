import { AppShell } from "@/components/layout/app-shell";
import { VitalSignsHub } from "@/components/vitals/vital-signs-hub";
import { CoreCorrelationTrends } from "@/components/trends/core-correlation-trends";
import { PatientActivityTimeline } from "@/components/timeline/patient-activity-timeline";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-full">
        <VitalSignsHub />
        <CoreCorrelationTrends />
        <PatientActivityTimeline />
      </div>
    </AppShell>
  );
}
