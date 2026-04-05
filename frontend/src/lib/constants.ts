export const VITAL_REFRESH_INTERVAL = 10000;
export const TRENDS_REFRESH_INTERVAL = 60000;
export const TIMELINE_REFRESH_INTERVAL = 30000;

export const VITAL_RANGES = {
  heartRate: { min: 60, max: 100, critical_low: 40, critical_high: 130 },
  bloodPressureSystolic: { min: 90, max: 120, critical_low: 70, critical_high: 180 },
  oxygenSaturation: { min: 95, max: 100, critical_low: 90, critical_high: 100 },
  respiratoryRate: { min: 12, max: 20, critical_low: 8, critical_high: 30 },
} as const;

export const STATUS_COLORS = {
  Normal: "bg-green-100 text-green-700",
  Warning: "bg-amber-100 text-amber-700",
  Critical: "bg-red-100 text-red-700",
} as const;
