import { PatientInfoBanner } from "@/components/layout/patient-info-banner";
import { Search, Bell, Plus } from "lucide-react";
import { MOCK_PATIENT } from "@/lib/mock-data";

export function TopBar() {
  return (
    <header className="bg-white border-b border-[#E2E8F0] px-4 py-3 flex items-center gap-4 shrink-0">
      <PatientInfoBanner patient={MOCK_PATIENT} />
      <div className="flex items-center gap-3 ml-auto">
        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-3 py-1.5 text-sm border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 w-44"
          />
        </div>
        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-lg text-[#64748B] hover:bg-[#F0FDFA] transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        {/* Add Patient Button */}
        <button className="flex items-center gap-1.5 bg-[#0D9488] hover:bg-teal-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors">
          <Plus size={16} />
          Iniam patient
        </button>
      </div>
    </header>
  );
}
