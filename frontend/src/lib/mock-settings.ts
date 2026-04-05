import type { UserProfile, NotificationSettings, VitalThreshold } from "@/types/settings";

export const MOCK_PROFILE: UserProfile = {
  fullName: "Dr. Jonathan Davis",
  role: "Senior Cardiologist",
  email: "j.davis@elderguard.health",
  phone: "+1 (555) 012-3456",
  department: "Cardiology",
  hospitalId: "EG-DOC-0042",
  initials: "JD",
};

export const MOCK_NOTIFICATIONS: NotificationSettings = {
  emailAlerts: true,
  smsAlerts: false,
  pushNotifications: true,
  criticalAlertsSound: true,
  dailySummary: true,
  newPatientAdded: true,
  consultationRequests: true,
  messageNotifications: true,
};

export const VITAL_THRESHOLDS: VitalThreshold[] = [
  { label: "Heart Rate",        key: "heartRate",    min: 60,  max: 100, unit: "BPM"   },
  { label: "Systolic BP",       key: "systolicBP",   min: 90,  max: 140, unit: "mmHg"  },
  { label: "Diastolic BP",      key: "diastolicBP",  min: 60,  max: 90,  unit: "mmHg"  },
  { label: "Oxygen Saturation", key: "spo2",         min: 94,  max: 100, unit: "%"     },
  { label: "Respiratory Rate",  key: "respRate",     min: 12,  max: 20,  unit: "b/min" },
  { label: "Temperature",       key: "temperature",  min: 36,  max: 38,  unit: "°C"    },
];
