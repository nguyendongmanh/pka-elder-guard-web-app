"use client";

import { useState } from "react";
import { X, FileText, Table } from "lucide-react";

interface ExportDataDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ExportDataDialog({ open, onClose }: ExportDataDialogProps) {
  const [format, setFormat] = useState<"pdf" | "csv">("pdf");
  const [dateRange, setDateRange] = useState("24h");
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-label="Export data"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#0F172A]">Export Data</h3>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#64748B] hover:bg-[#F8FAFC]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-[#64748B] block mb-2">Format</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFormat("pdf")}
                className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-colors ${
                  format === "pdf"
                    ? "border-[#0D9488] bg-[#F0FDFA] text-[#0D9488]"
                    : "border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"
                }`}
              >
                <FileText size={18} /> PDF
              </button>
              <button
                onClick={() => setFormat("csv")}
                className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-colors ${
                  format === "csv"
                    ? "border-[#0D9488] bg-[#F0FDFA] text-[#0D9488]"
                    : "border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"
                }`}
              >
                <Table size={18} /> CSV
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-[#64748B] block mb-2">Date Range</label>
            <select
              className="w-full border border-[#E2E8F0] rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
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
              console.log("Export triggered:", { format, dateRange });
              onClose();
            }}
            className="flex-1 py-2 text-sm font-medium bg-[#0D9488] text-white rounded-lg hover:bg-teal-700"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
