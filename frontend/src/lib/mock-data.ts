import type { Patient, VitalSigns, TimelineEvent, ChartDataPoint, PatientListItem, ActivityEvent } from "@/types/patient";

export const MOCK_PATIENT: Patient = {
  id: "123456",
  name: "Jonathan Davis",
  age: 58,
  status: "Stable",
};

export const MOCK_VITALS: VitalSigns = {
  heartRate: 72,
  bloodPressureSystolic: 118,
  bloodPressureDiastolic: 78,
  oxygenSaturation: 98,
  respiratoryRate: 16,
  timestamp: new Date().toISOString(),
};

export const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: "1",
    type: "medication",
    title: "Medication Administered",
    description: "Historical crossit threshold cross.",
    timestamp: "8:00 AM",
  },
  {
    id: "2",
    type: "vital",
    title: "Stable Vital Signs Recorded",
    description: "All vitals within normal range.",
    timestamp: "7:30 AM",
  },
  {
    id: "3",
    type: "checkin",
    title: "Routine Check-in by Nurse Sarah",
    description: "Patient alert and comfortable.",
    timestamp: "7:00 AM",
  },
];

function generateChartData(): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const hours = ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:30 PM", "6:00 PM", "8:00 PM"];
  const hrBase = [72, 75, 68, 80, 74, 71, 73];
  const bpBase = [118, 122, 115, 125, 119, 116, 120];
  const spo2Base = [98, 97, 98, 96, 98, 99, 98];
  hours.forEach((time, i) => {
    data.push({
      time,
      heartRate: hrBase[i],
      bloodPressure: bpBase[i],
      spo2: spo2Base[i],
    });
  });
  return data;
}

export const MOCK_CHART_DATA = generateChartData();

export function generateSparklineData() {
  return Array.from({ length: 30 }, (_, i) => ({
    index: i,
    value: 65 + Math.round(Math.sin(i * 0.4) * 8 + Math.random() * 6),
  }));
}

export const MOCK_PATIENT_LIST: PatientListItem[] = [
  { id: "1", name: "Jonathan Davis",  patientId: "123456", age: 58, status: "Stable",   physician: "Dr. Sarah Chen", ward: "Ward A", recentVitals: { heartRate: 72, bloodPressureSystolic: 118, bloodPressureDiastolic: 78 }, avatarInitials: "JD" },
  { id: "2", name: "Amelia Green",    patientId: "123458", age: 53, status: "Alert",    physician: "Dr. Mark Lee",   ward: "Ward B", recentVitals: { heartRate: 72, bloodPressureSystolic: 118, bloodPressureDiastolic: 78 }, avatarInitials: "AG" },
  { id: "3", name: "Robert Brown",    patientId: "123450", age: 59, status: "Alert",    physician: "Dr. Mark Lee",   ward: "Ward A", recentVitals: { heartRate: 72, bloodPressureSystolic: 118, bloodPressureDiastolic: 78 }, avatarInitials: "RB" },
  { id: "4", name: "Emily Wilson",    patientId: "123451", age: 60, status: "Critical", physician: "Dr. Chen",       ward: "Ward C", recentVitals: { heartRate: 72, bloodPressureSystolic: 118, bloodPressureDiastolic: 78 }, avatarInitials: "EW" },
  { id: "5", name: "Joran Town",      patientId: "123452", age: 53, status: "Stable",   physician: "Dr. Mark Chen",  ward: "Ward B", recentVitals: { heartRate: 72, bloodPressureSystolic: 118, bloodPressureDiastolic: 78 }, avatarInitials: "JT" },
  { id: "6", name: "Joran Green",     patientId: "123453", age: 53, status: "Stable",   physician: "Dr. Mark Chen",  ward: "Ward A", recentVitals: { heartRate: 72, bloodPressureSystolic: 118, bloodPressureDiastolic: 78 }, avatarInitials: "JG" },
  { id: "7", name: "Robert Brown",    patientId: "123454", age: 50, status: "Critical", physician: "Dr. Mark Lee",   ward: "Ward C", recentVitals: { heartRate: 72, bloodPressureSystolic: 118, bloodPressureDiastolic: 78 }, avatarInitials: "RB" },
  { id: "8", name: "Emily Wilson",    patientId: "123456", age: 58, status: "Stable",   physician: "Dr. Mark Lee",   ward: "Ward B", recentVitals: { heartRate: 72, bloodPressureSystolic: 118, bloodPressureDiastolic: 78 }, avatarInitials: "EW" },
  { id: "9", name: "Sarah Johnson",   patientId: "123457", age: 45, status: "Pending",  physician: "Dr. Sarah Chen", ward: "Ward A", recentVitals: { heartRate: 88, bloodPressureSystolic: 130, bloodPressureDiastolic: 85 }, avatarInitials: "SJ" },
  { id: "10", name: "Michael Clark",  patientId: "123459", age: 67, status: "Stable",   physician: "Dr. Mark Lee",   ward: "Ward C", recentVitals: { heartRate: 68, bloodPressureSystolic: 115, bloodPressureDiastolic: 75 }, avatarInitials: "MC" },
];

export const MOCK_PATIENT_STATS = {
  total: 120,
  stable: 95,
  critical: 10,
  pending: 15,
};

export const MOCK_ACTIVITY_EVENTS: ActivityEvent[] = [
  { id: "1", type: "added",   title: "New Patient Added",        patientName: "Emily Wilson",  timestamp: "9:00 AM"  },
  { id: "2", type: "added",   title: "New Patient Added",        patientName: "Emily Green",   timestamp: "8:30 AM"  },
  { id: "3", type: "message", title: "Message sent to",          patientName: "Jonthan Davis", timestamp: "10:00 AM" },
  { id: "4", type: "viewed",  title: "Dashboard viewed for",     patientName: "Amelia Green",  timestamp: "10:15 AM" },
  { id: "5", type: "updated", title: "Patient Amilia Green updated", patientName: "",           timestamp: "11:45 AM" },
  { id: "6", type: "added",   title: "New Patient Added",        patientName: "Joran Town",    timestamp: "1:00 PM"  },
];
