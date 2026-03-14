"use client";

import { useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { SettingsSectionBlock, SettingsField, SELECT_CLASS } from "@/components/settings/settings-field";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

const THEMES: { value: Theme; label: string; icon: React.ElementType }[] = [
  { value: "light",  label: "Light",  icon: Sun     },
  { value: "dark",   label: "Dark",   icon: Moon    },
  { value: "system", label: "System", icon: Monitor },
];

export function AppearanceSection() {
  const [theme, setTheme]       = useState<Theme>("light");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Asia/Ho_Chi_Minh");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [saved, setSaved]       = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Theme */}
      <SettingsSectionBlock title="Theme" description="Choose your preferred color scheme.">
        <div className="grid grid-cols-3 gap-3">
          {THEMES.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors",
                theme === value
                  ? "border-[#0D9488] bg-[#F0FDFA]"
                  : "border-[#E2E8F0] hover:border-[#0D9488]/30 hover:bg-[#F8FAFC]"
              )}
              aria-pressed={theme === value}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                theme === value ? "bg-[#0D9488]/10" : "bg-[#F1F5F9]"
              )}>
                <Icon size={20} className={theme === value ? "text-[#0D9488]" : "text-[#64748B]"} />
              </div>
              <span className={cn("text-sm font-semibold", theme === value ? "text-[#0D9488]" : "text-[#64748B]")}>
                {label}
              </span>
              {theme === value && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
              )}
            </button>
          ))}
        </div>
      </SettingsSectionBlock>

      {/* Locale */}
      <SettingsSectionBlock title="Language & Region" description="Set your preferred language, timezone and date format.">
        <div className="grid grid-cols-2 gap-4">
          <SettingsField label="Language">
            <select className={SELECT_CLASS} value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="vi">Tiếng Việt</option>
              <option value="fr">Français</option>
              <option value="ja">日本語</option>
            </select>
          </SettingsField>

          <SettingsField label="Timezone">
            <select className={SELECT_CLASS} value={timezone} onChange={(e) => setTimezone(e.target.value)}>
              <option value="Asia/Ho_Chi_Minh">Asia/Ho Chi Minh (GMT+7)</option>
              <option value="Asia/Bangkok">Asia/Bangkok (GMT+7)</option>
              <option value="Asia/Singapore">Asia/Singapore (GMT+8)</option>
              <option value="America/New_York">America/New York (GMT-5)</option>
              <option value="Europe/London">Europe/London (GMT+0)</option>
            </select>
          </SettingsField>

          <SettingsField label="Date Format">
            <select className={SELECT_CLASS} value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </SettingsField>

          <SettingsField label="Time Format">
            <select className={SELECT_CLASS} defaultValue="12h">
              <option value="12h">12-hour (AM/PM)</option>
              <option value="24h">24-hour</option>
            </select>
          </SettingsField>
        </div>
      </SettingsSectionBlock>

      <div className="flex justify-end">
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
          className={cn("px-6 py-2 rounded-xl text-sm font-semibold text-white transition-colors", saved ? "bg-green-500" : "bg-[#0D9488] hover:bg-teal-700")}
        >
          {saved ? "Saved!" : "Save Preferences"}
        </button>
      </div>
    </div>
  );
}
