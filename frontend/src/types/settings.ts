export type SettingsSection =
  | "profile"
  | "notifications"
  | "security"
  | "appearance"
  | "alerts";

export interface UserProfile {
  fullName: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  hospitalId: string;
  initials: string;
}

export interface NotificationSettings {
  emailAlerts: boolean;
  smsAlerts: boolean;
  pushNotifications: boolean;
  criticalAlertsSound: boolean;
  dailySummary: boolean;
  newPatientAdded: boolean;
  consultationRequests: boolean;
  messageNotifications: boolean;
}

export interface VitalThreshold {
  label: string;
  key: string;
  min: number;
  max: number;
  unit: string;
}
