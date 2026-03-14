import type { ActivityEvent, ActivityEventType } from "@/types/patient";
import { cn } from "@/lib/utils";

interface ActivityPanelProps {
  events: ActivityEvent[];
}

const dotColor: Record<ActivityEventType, string> = {
  added:   "bg-green-500",
  message: "bg-blue-500",
  viewed:  "bg-blue-400",
  updated: "bg-orange-500",
};

const lineColor: Record<ActivityEventType, string> = {
  added:   "border-green-200",
  message: "border-blue-200",
  viewed:  "border-blue-100",
  updated: "border-orange-200",
};

export function ActivityPanel({ events }: ActivityPanelProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col gap-4 h-full">
      <h2 className="text-base font-bold text-[#0F172A]">Patient Activity & Timeline</h2>

      <div className="flex flex-col gap-0">
        {events.map((event, idx) => (
          <div key={event.id} className="flex gap-3">
            {/* Timeline dot + line */}
            <div className="flex flex-col items-center">
              <div className={cn("w-2.5 h-2.5 rounded-full shrink-0 mt-1.5", dotColor[event.type])} />
              {idx < events.length - 1 && (
                <div className={cn("w-px flex-1 border-l-2 border-dashed my-1", lineColor[event.type])} />
              )}
            </div>

            {/* Content */}
            <div className="pb-4 flex-1 min-w-0">
              <p className="text-sm font-medium text-[#0F172A] leading-snug">
                {event.title}
                {event.patientName && (
                  <span className="font-semibold text-[#0D9488]"> ({event.patientName})</span>
                )}
              </p>
              <p className="text-xs text-[#94A3B8] mt-0.5">{event.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
