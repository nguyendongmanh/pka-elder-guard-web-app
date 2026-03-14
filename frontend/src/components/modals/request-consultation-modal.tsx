"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface RequestConsultationModalProps {
  open: boolean;
  onClose: () => void;
}

const DOCTORS = [
  "Dr. Emily Chen",
  "Dr. Michael Park",
  "Dr. Sarah Williams",
  "Dr. James Rodriguez",
];
const PRIORITIES = ["Low", "Medium", "High", "Urgent"];

export function RequestConsultationModal({ open, onClose }: RequestConsultationModalProps) {
  const [doctor, setDoctor] = useState("");
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState("Medium");
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-label="Request consultation"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#0F172A]">Request Consultation</h3>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#64748B] hover:bg-[#F8FAFC]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-[#64748B] block mb-1">Doctor</label>
            <select
              className="w-full border border-[#E2E8F0] rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option value="">Select a doctor</option>
              {DOCTORS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-[#64748B] block mb-1">Reason</label>
            <textarea
              className="w-full border border-[#E2E8F0] rounded-xl p-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 min-h-[80px]"
              placeholder="Describe the reason for consultation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#64748B] block mb-1">Priority</label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    priority === p
                      ? "bg-[#0D9488] text-white border-[#0D9488]"
                      : "border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Consultation requested:", { doctor, reason, priority });
              onClose();
            }}
            className="flex-1 py-2 text-sm font-medium bg-[#0D9488] text-white rounded-lg hover:bg-teal-700"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}
