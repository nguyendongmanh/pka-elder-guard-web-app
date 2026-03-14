import { AppShell } from "@/components/layout/app-shell";
import { SettingsContainer } from "@/components/settings/settings-container";
import { MOCK_PROFILE, MOCK_NOTIFICATIONS, VITAL_THRESHOLDS } from "@/lib/mock-settings";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5 h-full min-h-0">
        <h1 className="text-xl font-bold text-[#0F172A] shrink-0">Settings</h1>
        <SettingsContainer
          profile={MOCK_PROFILE}
          notifications={MOCK_NOTIFICATIONS}
          thresholds={VITAL_THRESHOLDS}
        />
      </div>
    </AppShell>
  );
}
