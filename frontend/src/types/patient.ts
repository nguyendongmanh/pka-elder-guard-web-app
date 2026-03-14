export type VitalStatus = "Normal" | "Warning" | "Critical";
export type PatientStatus = "Stable" | "Alert" | "Critical" | "Pending";

export interface Patient {
  id: string;
  name: string;
  age: number;
  status: VitalStatus | "Stable";
}

export interface PatientListItem {
  id: string;
  name: string;
  patientId: string;
  age: number;
  status: PatientStatus;
  physician: string;
  ward: string;
  recentVitals: {
    heartRate: number;
    bloodPressureSystolic: number;
    bloodPressureDiastolic: number;
  };
  avatarInitials: string;
}

export type ActivityEventType = "added" | "message" | "viewed" | "updated";

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  title: string;
  patientName: string;
  timestamp: string;
}

export interface VitalSigns {
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  oxygenSaturation: number;
  respiratoryRate: number;
  timestamp: string;
}

export interface VitalMetric {
  label: string;
  value: string;
  unit: string;
  status: VitalStatus;
  icon?: string;
}

export interface TimelineEvent {
  id: string;
  type: "medication" | "vital" | "checkin" | "note" | "consultation";
  title: string;
  description: string;
  timestamp: string;
}

export interface ChartDataPoint {
  time: string;
  heartRate: number;
  bloodPressure: number;
  spo2: number;
}
