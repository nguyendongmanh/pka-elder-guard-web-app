import { cn } from "@/lib/utils";

interface PatientAvatarProps {
  initials: string;
  size?: "sm" | "md";
  className?: string;
}

const COLORS = [
  "bg-teal-100 text-teal-700",
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
];

function pickColor(initials: string): string {
  const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) ?? 0)) % COLORS.length;
  return COLORS[idx];
}

export function PatientAvatar({ initials, size = "md", className }: PatientAvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold shrink-0",
        size === "md" ? "w-8 h-8 text-sm" : "w-7 h-7 text-xs",
        pickColor(initials),
        className
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
