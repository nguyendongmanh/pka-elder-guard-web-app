"use client";

import { useState } from "react";
import type { SettingsSection, UserProfile, NotificationSettings, VitalThreshold } from "@/types/settings";
import { SettingsNav } from "./settings-nav";
import { ProfileSection } from "./sections/profile-section";
import { NotificationsSection } from "./sections/notifications-section";
import { SecuritySection } from "./sections/security-section";
import { AppearanceSection } from "./sections/appearance-section";
import { AlertsSection } from "./sections/alerts-section";

const SECTION_TITLES: Record<SettingsSection, string> = {
  profile:       "Profile",
  notifications: "Notifications",
  security:      "Security",
  appearance:    "Appearance",
  alerts:        "Patient Alerts",
};

const SECTION_DESCRIPTIONS: Record<SettingsSection, string> = {
  profile:       "Manage your personal information and credentials.",
  notifications: "Control when and how you receive alerts.",
  security:      "Keep your account secure.",
  appearance:    "Personalise the look and feel of the interface.",
  alerts:        "Configure vital sign thresholds and escalation rules.",
};

interface SettingsContainerProps {
  profile: UserProfile;
  notifications: NotificationSettings;
  thresholds: VitalThreshold[];
}

export function SettingsContainer({ profile, notifications, thresholds }: SettingsContainerProps) {
  const [active, setActive] = useState<SettingsSection>("profile");

  return (
    <div className="grid grid-cols-[240px_1fr] gap-6 h-full min-h-0 items-start">
      {/* Left nav */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-3">
        <SettingsNav active={active} onChange={setActive} />
      </div>

      {/* Right content */}
      <div className="flex flex-col gap-5 min-w-0 pb-6">
        {/* Section heading */}
        <div>
          <h2 className="text-lg font-bold text-[#0F172A]">{SECTION_TITLES[active]}</h2>
          <p className="text-sm text-[#64748B] mt-0.5">{SECTION_DESCRIPTIONS[active]}</p>
        </div>

        {/* Active section */}
        {active === "profile"       && <ProfileSection profile={profile} />}
        {active === "notifications" && <NotificationsSection initial={notifications} />}
        {active === "security"      && <SecuritySection />}
        {active === "appearance"    && <AppearanceSection />}
        {active === "alerts"        && <AlertsSection thresholds={thresholds} />}
      </div>
    </div>
  );
}
