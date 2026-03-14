import { create } from "zustand";

interface DashboardStore {
  sidebarOpen: boolean;
  activeModal: "addNote" | "requestConsultation" | "exportData" | null;
  toggleSidebar: () => void;
  openModal: (modal: DashboardStore["activeModal"]) => void;
  closeModal: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  sidebarOpen: true,
  activeModal: null,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}));
