"use client";

import { useState } from "react";
import type { NotificationSettings } from "@/types/settings";
import { SettingsSectionBlock, Toggle } from "@/components/settings/settings-field";
import { cn } from "@/lib/utils";

interface NotificationsSectionProps {
  initial: NotificationSettings;
}

export function NotificationsSection({ initial }: NotificationsSectionProps) {
  const [settings, setSettings] = useState(initial);
  const [saved, setSaved] = useState(false);

  function toggle(key: keyof NotificationSettings) {
    setSettings((s) => ({ ...s, [key]: !s[key] }));
    setSaved(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <SettingsSectionBlock
        title="Delivery Channels"
        description="Choose how you receive alerts and notifications."
      >
        <Toggle checked={settings.pushNotifications}   onChange={() => toggle("pushNotifications")}   label="Push Notifications"    description="In-app browser & desktop alerts" />
        <div className="border-t border-[#F1F5F9]" />
        <Toggle checked={settings.emailAlerts}         onChange={() => toggle("emailAlerts")}         label="Email Alerts"           description="Sent to your registered email" />
        <div className="border-t border-[#F1F5F9]" />
        <Toggle checked={settings.smsAlerts}           onChange={() => toggle("smsAlerts")}           label="SMS Alerts"             description="Text messages to your phone number" />
        <div className="border-t border-[#F1F5F9]" />
        <Toggle checked={settings.criticalAlertsSound} onChange={() => toggle("criticalAlertsSound")} label="Critical Alert Sound"   description="Play audio for critical vital breaches" />
      </SettingsSectionBlock>

      <SettingsSectionBlock
        title="Event Triggers"
        description="Select which events generate a notification."
      >
        <Toggle checked={settings.newPatientAdded}      onChange={() => toggle("newPatientAdded")}      label="New Patient Added"         description="Notify when a patient is assigned to you" />
        <div className="border-t border-[#F1F5F9]" />
        <Toggle checked={settings.consultationRequests} onChange={() => toggle("consultationRequests")} label="Consultation Requests"     description="Notify on incoming consult requests" />
        <div className="border-t border-[#F1F5F9]" />
        <Toggle checked={settings.messageNotifications} onChange={() => toggle("messageNotifications")} label="New Messages"              description="Notify when you receive a message" />
        <div className="border-t border-[#F1F5F9]" />
        <Toggle checked={settings.dailySummary}         onChange={() => toggle("dailySummary")}         label="Daily Summary Report"     description="Receive a morning digest at 7:00 AM" />
      </SettingsSectionBlock>

      <div className="flex justify-end">
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
          className={cn(
            "px-6 py-2 rounded-xl text-sm font-semibold text-white transition-colors",
            saved ? "bg-green-500" : "bg-[#0D9488] hover:bg-teal-700"
          )}
        >
          {saved ? "Saved!" : "Save Preferences"}
        </button>
      </div>
    </div>
  );
}
