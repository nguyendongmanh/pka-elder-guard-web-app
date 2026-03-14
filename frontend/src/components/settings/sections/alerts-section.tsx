"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import type { VitalThreshold } from "@/types/settings";
import { SettingsSectionBlock } from "@/components/settings/settings-field";
import { cn } from "@/lib/utils";

interface AlertsSectionProps {
  thresholds: VitalThreshold[];
}

export function AlertsSection({ thresholds: initial }: AlertsSectionProps) {
  const [thresholds, setThresholds] = useState(initial);
  const [saved, setSaved] = useState(false);

  function update(key: string, field: "min" | "max", raw: string) {
    const value = parseInt(raw, 10);
    if (isNaN(value)) return;
    setThresholds((prev) =>
      prev.map((t) => (t.key === key ? { ...t, [field]: value } : t))
    );
    setSaved(false);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Info banner */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-700">
          Alerts will trigger when a patient's vital sign falls outside the configured range.
          Critical deviations will immediately notify all assigned staff.
        </p>
      </div>

      <SettingsSectionBlock
        title="Vital Sign Thresholds"
        description="Set the normal operating range for each vital sign."
      >
        {/* Table header */}
        <div className="grid grid-cols-[1fr_100px_100px_80px] gap-3 px-1 pb-1 border-b border-[#F1F5F9]">
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Vital Sign</span>
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide text-center">Min</span>
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide text-center">Max</span>
          <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide text-center">Unit</span>
        </div>

        {/* Rows */}
        {thresholds.map((t) => (
          <div key={t.key} className="grid grid-cols-[1fr_100px_100px_80px] gap-3 items-center">
            <span className="text-sm font-medium text-[#0F172A]">{t.label}</span>

            <input
              type="number"
              value={t.min}
              onChange={(e) => update(t.key, "min", e.target.value)}
              className="border border-[#E2E8F0] rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#0D9488]/25"
              aria-label={`${t.label} minimum`}
            />

            <input
              type="number"
              value={t.max}
              onChange={(e) => update(t.key, "max", e.target.value)}
              className="border border-[#E2E8F0] rounded-lg px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#0D9488]/25"
              aria-label={`${t.label} maximum`}
            />

            <span className="text-xs text-[#94A3B8] text-center">{t.unit}</span>
          </div>
        ))}
      </SettingsSectionBlock>

      {/* Alert escalation */}
      <SettingsSectionBlock
        title="Alert Escalation Policy"
        description="Define how quickly unacknowledged critical alerts are escalated."
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-[#0F172A] block mb-1.5">
              Escalate after (minutes)
            </label>
            <input
              type="number"
              defaultValue={5}
              min={1}
              className="border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#0D9488]/25"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[#0F172A] block mb-1.5">
              Escalate to
            </label>
            <select className="border border-[#E2E8F0] rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#0D9488]/25 bg-white cursor-pointer">
              <option>Head Nurse on Duty</option>
              <option>Attending Physician</option>
              <option>Department Head</option>
              <option>Emergency Response Team</option>
            </select>
          </div>
        </div>
      </SettingsSectionBlock>

      <div className="flex justify-end">
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
          className={cn("px-6 py-2 rounded-xl text-sm font-semibold text-white transition-colors", saved ? "bg-green-500" : "bg-[#0D9488] hover:bg-teal-700")}
        >
          {saved ? "Saved!" : "Save Alert Settings"}
        </button>
      </div>
    </div>
  );
}
