import { User, Bell, Shield, Palette, Activity } from "lucide-react";
import type { SettingsSection } from "@/types/settings";
import { cn } from "@/lib/utils";

interface NavItem {
  key: SettingsSection;
  label: string;
  description: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { key: "profile",       label: "Profile",          description: "Personal info & role",        icon: User      },
  { key: "notifications", label: "Notifications",    description: "Alerts & communication",      icon: Bell      },
  { key: "security",      label: "Security",         description: "Password & access control",   icon: Shield    },
  { key: "appearance",    label: "Appearance",       description: "Theme, language & timezone",  icon: Palette   },
  { key: "alerts",        label: "Patient Alerts",   description: "Vital sign thresholds",       icon: Activity  },
];

interface SettingsNavProps {
  active: SettingsSection;
  onChange: (section: SettingsSection) => void;
}

export function SettingsNav({ active, onChange }: SettingsNavProps) {
  return (
    <nav className="flex flex-col gap-1" aria-label="Settings sections">
      {NAV_ITEMS.map(({ key, label, description, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors w-full",
            active === key
              ? "bg-[#CCFBF1] text-[#0D9488]"
              : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
          )}
          aria-current={active === key ? "page" : undefined}
        >
          <div className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
            active === key ? "bg-[#0D9488]/10" : "bg-[#F1F5F9]"
          )}>
            <Icon size={16} className={active === key ? "text-[#0D9488]" : "text-[#64748B]"} />
          </div>
          <div className="min-w-0">
            <p className={cn("text-sm font-semibold leading-tight", active === key ? "text-[#0D9488]" : "text-[#0F172A]")}>
              {label}
            </p>
            <p className="text-xs text-[#94A3B8] truncate">{description}</p>
          </div>
        </button>
      ))}
    </nav>
  );
}
