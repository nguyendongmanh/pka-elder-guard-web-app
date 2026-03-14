import { cn } from "@/lib/utils";

interface ConversationAvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const COLORS = [
  "bg-teal-100 text-teal-700",
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
];

function pickColor(initials: string): string {
  const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) ?? 0)) % COLORS.length;
  return COLORS[idx];
}

const sizeClass = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
};

export function ConversationAvatar({ initials, size = "md", className }: ConversationAvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-semibold shrink-0",
        sizeClass[size],
        pickColor(initials),
        className
      )}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
