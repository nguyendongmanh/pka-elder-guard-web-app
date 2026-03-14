"use client";

import { MoreHorizontal, FilePlus, UserPlus, Download } from "lucide-react";
import { TimelineItem } from "./timeline-item";
import { MOCK_TIMELINE } from "@/lib/mock-data";
import { useDashboardStore } from "@/stores/dashboard-store";
import { AddNoteModal } from "@/components/modals/add-note-modal";
import { RequestConsultationModal } from "@/components/modals/request-consultation-modal";
import { ExportDataDialog } from "@/components/modals/export-data-dialog";

export function PatientActivityTimeline() {
  const { openModal, activeModal, closeModal } = useDashboardStore();
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[#0F172A]">Patient Activity & Timeline</h2>
        <button className="p-1 rounded text-[#64748B] hover:bg-[#F8FAFC]" aria-label="More options">
          <MoreHorizontal size={18} />
        </button>
      </div>
      {/* Timeline events */}
      <div className="flex flex-col gap-4 flex-1">
        {MOCK_TIMELINE.map((event) => (
          <TimelineItem key={event.id} event={event} />
        ))}
      </div>
      {/* Action buttons */}
      <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-[#E2E8F0]">
        <button
          onClick={() => openModal("addNote")}
          className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-[#0D9488] border border-[#0D9488] rounded-lg hover:bg-[#F0FDFA] transition-colors"
          aria-label="Add note"
        >
          <FilePlus size={16} />
          Add Note
        </button>
        <button
          onClick={() => openModal("requestConsultation")}
          className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-[#0D9488] border border-[#0D9488] rounded-lg hover:bg-[#F0FDFA] transition-colors"
          aria-label="Request consultation"
        >
          <UserPlus size={16} />
          Request Consultation
        </button>
        <button
          onClick={() => openModal("exportData")}
          className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium bg-[#0D9488] text-white rounded-lg hover:bg-teal-700 transition-colors"
          aria-label="Export data"
        >
          <Download size={16} />
          Export Data
        </button>
      </div>
      {/* Modals */}
      <AddNoteModal open={activeModal === "addNote"} onClose={closeModal} />
      <RequestConsultationModal
        open={activeModal === "requestConsultation"}
        onClose={closeModal}
      />
      <ExportDataDialog open={activeModal === "exportData"} onClose={closeModal} />
    </div>
  );
}
