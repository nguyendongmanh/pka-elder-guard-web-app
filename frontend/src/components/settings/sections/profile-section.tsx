"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import type { UserProfile } from "@/types/settings";
import { SettingsField, SettingsSectionBlock, INPUT_CLASS, SELECT_CLASS } from "@/components/settings/settings-field";
import { cn } from "@/lib/utils";

const AVATAR_COLORS = [
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-orange-100", text: "text-orange-700" },
];

interface ProfileSectionProps {
  profile: UserProfile;
}

export function ProfileSection({ profile: initial }: ProfileSectionProps) {
  const [profile, setProfile] = useState(initial);
  const [saved, setSaved] = useState(false);
  const color = AVATAR_COLORS[0];

  function update(key: keyof UserProfile, value: string) {
    setProfile((p) => ({ ...p, [key]: value }));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Avatar */}
      <SettingsSectionBlock title="Profile Photo" description="Your avatar displayed across the system.">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className={cn("w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold", color.bg, color.text)}>
              {profile.initials}
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#0D9488] text-white rounded-full flex items-center justify-center shadow-sm hover:bg-teal-700 transition-colors"
              aria-label="Change avatar"
            >
              <Camera size={12} />
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#0F172A]">{profile.fullName}</p>
            <p className="text-xs text-[#64748B]">{profile.role}</p>
            <p className="text-xs text-[#94A3B8] mt-0.5">ID: {profile.hospitalId}</p>
          </div>
        </div>
      </SettingsSectionBlock>

      {/* Personal info */}
      <SettingsSectionBlock title="Personal Information" description="Update your name, contact details, and department.">
        <div className="grid grid-cols-2 gap-4">
          <SettingsField label="Full Name">
            <input className={INPUT_CLASS} value={profile.fullName} onChange={(e) => update("fullName", e.target.value)} />
          </SettingsField>
          <SettingsField label="Role / Title">
            <input className={INPUT_CLASS} value={profile.role} onChange={(e) => update("role", e.target.value)} />
          </SettingsField>
          <SettingsField label="Email Address">
            <input type="email" className={INPUT_CLASS} value={profile.email} onChange={(e) => update("email", e.target.value)} />
          </SettingsField>
          <SettingsField label="Phone Number">
            <input type="tel" className={INPUT_CLASS} value={profile.phone} onChange={(e) => update("phone", e.target.value)} />
          </SettingsField>
          <SettingsField label="Department">
            <select className={SELECT_CLASS} value={profile.department} onChange={(e) => update("department", e.target.value)}>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Oncology</option>
              <option>Geriatrics</option>
              <option>Internal Medicine</option>
            </select>
          </SettingsField>
          <SettingsField label="Hospital ID" hint="Assigned by your institution — read only.">
            <input className={cn(INPUT_CLASS, "bg-[#F8FAFC] text-[#94A3B8] cursor-not-allowed")} value={profile.hospitalId} readOnly />
          </SettingsField>
        </div>
      </SettingsSectionBlock>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className={cn(
            "px-6 py-2 rounded-xl text-sm font-semibold text-white transition-colors",
            saved ? "bg-green-500" : "bg-[#0D9488] hover:bg-teal-700"
          )}
        >
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
