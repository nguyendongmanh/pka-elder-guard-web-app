"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AddNoteModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddNoteModal({ open, onClose }: AddNoteModalProps) {
  const [note, setNote] = useState("");
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      role="dialog"
      aria-modal="true"
      aria-label="Add note"
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-[#0F172A]">Add Note</h3>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#64748B] hover:bg-[#F8FAFC]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <textarea
          className="w-full border border-[#E2E8F0] rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 min-h-[100px]"
          placeholder="Enter your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Note submitted:", note);
              setNote("");
              onClose();
            }}
            className="flex-1 py-2 text-sm font-medium bg-[#0D9488] text-white rounded-lg hover:bg-teal-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
