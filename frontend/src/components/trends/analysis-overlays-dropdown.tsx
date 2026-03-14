"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useOverlayStore } from "@/stores/overlay-store";
import { cn } from "@/lib/utils";

export function AnalysisOverlaysDropdown() {
  const [open, setOpen] = useState(false);
  const { medicationOverlay, stableDataOverlay, toggleMedication, toggleStableData } =
    useOverlayStore();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm border border-[#E2E8F0] rounded-lg px-3 py-1.5 bg-white hover:bg-[#F8FAFC] transition-colors"
        aria-label="Analysis Overlays"
        aria-expanded={open}
      >
        Analysis Overlays
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-[#E2E8F0] rounded-xl shadow-lg z-10 p-2">
          <p className="text-xs font-semibold text-[#64748B] px-2 py-1">Select Overlays</p>
          <button
            onClick={toggleMedication}
            className={cn(
              "flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm hover:bg-[#F0FDFA] transition-colors",
              medicationOverlay ? "text-red-500" : "text-[#64748B]"
            )}
          >
            <span
              className={cn(
                "w-4 h-4 rounded border flex items-center justify-center",
                medicationOverlay ? "bg-red-100 border-red-300" : "border-[#E2E8F0]"
              )}
            >
              {medicationOverlay && <span className="w-2 h-2 bg-red-500 rounded-sm" />}
            </span>
            Medication cross-threshold
          </button>
          <button
            onClick={toggleStableData}
            className={cn(
              "flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm hover:bg-[#F0FDFA] transition-colors",
              stableDataOverlay ? "text-blue-500" : "text-[#64748B]"
            )}
          >
            <span
              className={cn(
                "w-4 h-4 rounded border flex items-center justify-center",
                stableDataOverlay ? "bg-blue-100 border-blue-300" : "border-[#E2E8F0]"
              )}
            >
              {stableDataOverlay && <span className="w-2 h-2 bg-blue-500 rounded-sm" />}
            </span>
            Stable data point
          </button>
        </div>
      )}
    </div>
  );
}
