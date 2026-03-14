"use client";

import { useState } from "react";
import { Eye, EyeOff, ShieldCheck, LogOut, MonitorSmartphone } from "lucide-react";
import { SettingsField, SettingsSectionBlock, INPUT_CLASS, Toggle } from "@/components/settings/settings-field";
import { cn } from "@/lib/utils";

const ACTIVE_SESSIONS = [
  { id: "1", device: "Chrome — macOS",       location: "Ho Chi Minh City, VN", time: "Active now",    current: true  },
  { id: "2", device: "Safari — iPhone 15",   location: "Ho Chi Minh City, VN", time: "2 hours ago",   current: false },
  { id: "3", device: "Chrome — Windows 11",  location: "Hanoi, VN",            time: "Yesterday",     current: false },
];

export function SecuritySection() {
  const [showCurrent, setShowCurrent]   = useState(false);
  const [showNew, setShowNew]           = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [twoFactor, setTwoFactor]       = useState(true);
  const [saved, setSaved]               = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Change password */}
      <SettingsSectionBlock title="Change Password" description="Use a strong password of at least 12 characters.">
        <SettingsField label="Current Password">
          <div className="relative">
            <input type={showCurrent ? "text" : "password"} className={INPUT_CLASS} placeholder="Enter current password" />
            <button type="button" onClick={() => setShowCurrent((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]" aria-label="Toggle visibility">
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </SettingsField>
        <SettingsField label="New Password" hint="Min. 12 characters, including uppercase, number & symbol.">
          <div className="relative">
            <input type={showNew ? "text" : "password"} className={INPUT_CLASS} placeholder="Enter new password" />
            <button type="button" onClick={() => setShowNew((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]" aria-label="Toggle visibility">
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </SettingsField>
        <SettingsField label="Confirm New Password">
          <div className="relative">
            <input type={showConfirm ? "text" : "password"} className={INPUT_CLASS} placeholder="Repeat new password" />
            <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]" aria-label="Toggle visibility">
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </SettingsField>
        <div className="flex justify-end">
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
            className={cn("px-5 py-2 rounded-xl text-sm font-semibold text-white transition-colors", saved ? "bg-green-500" : "bg-[#0D9488] hover:bg-teal-700")}
          >
            {saved ? "Updated!" : "Update Password"}
          </button>
        </div>
      </SettingsSectionBlock>

      {/* 2FA */}
      <SettingsSectionBlock title="Two-Factor Authentication" description="Add an extra layer of security to your account.">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] flex items-center justify-center shrink-0">
            <ShieldCheck size={20} className="text-[#0D9488]" />
          </div>
          <div className="flex-1">
            <Toggle
              checked={twoFactor}
              onChange={setTwoFactor}
              label="Enable Two-Factor Authentication"
              description="You'll be asked for a verification code on each login."
            />
          </div>
        </div>
        {twoFactor && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700 flex items-center gap-2">
            <ShieldCheck size={16} />
            2FA is active. Codes are sent to your registered email.
          </div>
        )}
      </SettingsSectionBlock>

      {/* Active sessions */}
      <SettingsSectionBlock title="Active Sessions" description="Devices currently logged into your account.">
        <div className="flex flex-col gap-3">
          {ACTIVE_SESSIONS.map((session) => (
            <div key={session.id} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F1F5F9] flex items-center justify-center shrink-0">
                  <MonitorSmartphone size={16} className="text-[#64748B]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">
                    {session.device}
                    {session.current && (
                      <span className="ml-2 text-[10px] bg-green-100 text-green-700 font-semibold px-1.5 py-0.5 rounded-full">
                        This device
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-[#94A3B8]">{session.location} · {session.time}</p>
                </div>
              </div>
              {!session.current && (
                <button className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium transition-colors" aria-label={`Sign out ${session.device}`}>
                  <LogOut size={13} />
                  Sign out
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-[#F1F5F9] pt-3">
          <button className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors">
            Sign out all other sessions
          </button>
        </div>
      </SettingsSectionBlock>
    </div>
  );
}
