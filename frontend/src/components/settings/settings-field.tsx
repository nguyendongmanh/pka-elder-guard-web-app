import { cn } from "@/lib/utils";

interface SettingsFieldProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsField({ label, hint, children, className }: SettingsFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label className="text-sm font-medium text-[#0F172A]">{label}</label>
      {children}
      {hint && <p className="text-xs text-[#94A3B8]">{hint}</p>}
    </div>
  );
}

// ---------- shared input style ----------
export const INPUT_CLASS =
  "w-full border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/25 placeholder:text-[#94A3B8] transition";

export const SELECT_CLASS =
  "w-full border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm text-[#0F172A] bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/25 cursor-pointer transition";

// ---------- section wrapper ----------
interface SettingsSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SettingsSectionBlock({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-bold text-[#0F172A]">{title}</h3>
        {description && <p className="text-xs text-[#64748B] mt-0.5">{description}</p>}
      </div>
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}

// ---------- toggle switch ----------
interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}

export function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-0.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#0F172A]">{label}</p>
        {description && <p className="text-xs text-[#94A3B8] mt-0.5">{description}</p>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-10 h-5 rounded-full transition-colors shrink-0",
          checked ? "bg-[#0D9488]" : "bg-[#CBD5E1]"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}
