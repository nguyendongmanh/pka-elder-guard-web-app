import type { TimelineEvent } from "@/types/patient";
import { Pill, Activity, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  event: TimelineEvent;
}

const iconMap: Record<TimelineEvent["type"], React.ReactNode> = {
  medication: <Pill size={16} className="text-orange-500" />,
  vital: <Activity size={16} className="text-green-500" />,
  checkin: <UserCheck size={16} className="text-blue-500" />,
  note: <Activity size={16} className="text-purple-500" />,
  consultation: <UserCheck size={16} className="text-teal-500" />,
};

const iconBg: Record<TimelineEvent["type"], string> = {
  medication: "bg-orange-50",
  vital: "bg-green-50",
  checkin: "bg-blue-50",
  note: "bg-purple-50",
  consultation: "bg-teal-50",
};

export function TimelineItem({ event }: TimelineItemProps) {
  return (
    <div className="flex gap-3">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5",
          iconBg[event.type]
        )}
      >
        {iconMap[event.type]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#0F172A] leading-tight">{event.title}</p>
        <p className="text-xs text-[#64748B] mt-0.5">{event.description}</p>
        <p className="text-xs text-[#94A3B8] mt-1">{event.timestamp}</p>
      </div>
    </div>
  );
}
