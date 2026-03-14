import { create } from "zustand";

interface OverlayStore {
  medicationOverlay: boolean;
  stableDataOverlay: boolean;
  toggleMedication: () => void;
  toggleStableData: () => void;
}

export const useOverlayStore = create<OverlayStore>((set) => ({
  medicationOverlay: true,
  stableDataOverlay: true,
  toggleMedication: () => set((s) => ({ medicationOverlay: !s.medicationOverlay })),
  toggleStableData: () => set((s) => ({ stableDataOverlay: !s.stableDataOverlay })),
}));
